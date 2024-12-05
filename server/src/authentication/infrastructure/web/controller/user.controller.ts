import { Body, Controller, Get, Post, Req, Res, UseGuards } from '@nestjs/common';
import { Response } from 'express';
import UserService from '../../../application/service/user.service';
import CreateUserDto from '../dto/create-user.dto';
import User from '../../../domain/model/user.model';
import UserData from '../../../domain/model/user-data.model';
import UUID from 'src/core/domain/value-object/uuid.value-object';
import { DefaultUserValue } from '../../../domain/enums/default-user-value.enum';
import { AuthGuard } from '../guard/auth.guard';
import { UserRequest } from '../request/user.request';

@Controller('/api/user')
export class UserController {
  constructor(private readonly _service: UserService) {}

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
      res.status(200).json({
        message: 'Usuario creado'
      });
    } catch (error) {
      res.status(400).json({
        message: 'Usuario no registrado',
        error: error.message
      });
    }
  }

  @Get('/personal-data')
  @UseGuards(AuthGuard)
  async findUserById(@Req() req: UserRequest, @Res() res: Response): Promise<void> {
    try {
      const uuid = new UUID(req.user_id);
      const user = await this._service.findUserById(uuid);
      res.status(200).json({
        message: 'Busqueda de usuario exitosa',
        data: user
      });
    } catch (error) {
      res.status(500).json({
        message: 'Busqueda de usuario fallida',
        error: error.message
      });
    }
  }


}