import { Body, Controller, Delete, Get, Logger, Post, Req, Res, UseGuards } from '@nestjs/common';
import { Response } from 'express';
import UserService from '../../../application/service/user.service';
import CreateUserDto from '../dto/create-user.dto';
import User from '../../../domain/model/user.model';
import UserData from '../../../domain/model/user-data.model';
import UUID from 'src/core/domain/value-object/uuid.value-object';
import { DefaultUserValue } from '../../../domain/enums/default-user-value.enum';
import { AuthGuard } from '../../../../core/infrastructure/web/guard/auth.guard';
import { UserRequest } from '../../../../core/infrastructure/web/request/user.request';

@Controller('/api/user')
export class UserController {
  constructor(private readonly _service: UserService, private readonly _logger: Logger) {}

  @Post('/')
  async createUser(@Body() body: CreateUserDto, @Res() res: Response): Promise<void> {
    try {
      const user = new User(
        body.id,
        body.names,
        body.surnames,
      );
      const data = new UserData(
        DefaultUserValue.Id,
        body.names,
        body.surnames,
        body.dni,
        body.cellphone,
        body.email
      );
      user.setUserData(data);
      user.setOfficeId(body.office);
      user.setRoleId(body.role);
      await this._service.saveUser(user);
      this._logger.log(`Register: ${ data.getNames() }`);
      res.status(201).json({
        message: 'Usuario creado'
      });
    } catch (error) {
      this._logger.error(error.message);
      res.status(400).json({
        message: 'Usuario no registrado',
        error: error.message
      });
    }
  }

  @Get('/')
  @UseGuards(AuthGuard)
  async findUserById(@Req() req: UserRequest, @Res() res: Response): Promise<void> {
    try {
      const uuid = new UUID(req.user_id);
      const user = await this._service.findUserById(uuid);
      this._logger.log(`Logged: ${ user.names }`);
      res.status(200).json({
        message: 'Busqueda de usuario exitosa',
        data: user
      });
    } catch (error) {
      this._logger.error(error.message);
      res.status(404).json({
        message: 'Busqueda de usuario fallida',
        error: error.message
      });
    }
  }

  @Delete('/')
  @UseGuards(AuthGuard)
  async deleteAccount(@Req() req: UserRequest, @Res() res: Response): Promise<void> {
    try {
      await this._service.deleteUser(new UUID(req.user_id));
      this._logger.log(`Id del usuario borrado: ${ req.user_id }`);
      res.status(200).json({ message: 'Borrado de cuenta exitoso' });
    } catch (error) {
      res.status(500).json({
        message: 'Borrado de cuenta fallido',
        error: error.message
      });
    }
  }
}