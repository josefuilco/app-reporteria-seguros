import { Body, Controller, Delete, Get, Logger, Post, Req, Res, UseGuards } from '@nestjs/common';
import { Response } from 'express';
import { verify } from 'jsonwebtoken';
import UserService from '../../../application/service/user.service';
import CreateUserDto from '../dto/create-user.dto';
import User from '../../../domain/model/user.model';
import UserData from '../../../domain/model/user-data.model';
import UUID from 'src/core/domain/value-object/uuid.value-object';
import { DefaultUserValue } from '../../../domain/enums/default-user-value.enum';
import { AuthGuard } from '../../../../core/infrastructure/web/guard/auth.guard';
import { UserRequest } from '../../../../core/infrastructure/web/request/user.request';
import { AuthUserDTO } from '../dto/auth-user.dto';
import Name from 'src/core/domain/value-object/name.value-object';
import Password from 'src/authentication/domain/value-object/password.value-object';
import { Office } from 'src/authentication/domain/constant/office.constants';
import { Role } from 'src/authentication/domain/constant/role.constants';
import { createAccessToken, createRefreshToken } from '../../util/create-token.util';

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

  @Post('/sign-in')
  async signIn(@Body() body: AuthUserDTO, @Res() res: Response): Promise<void> {
    try {
      // Metodos de autenticacion
      const { username, password } = body;
      const auth = await this._service.authenticateUser(
        new Name(username),
        new Password(password)
      );
      // Registro de tokens JWT
      const accessToken = createAccessToken(auth);
      const refreshToken = createRefreshToken(auth.id);
      // Envio de los tokens
      res.setHeader('Authorization', `Bearer ${ accessToken }`);
      res.cookie('refresh-token', refreshToken, {
        httpOnly: true,
        expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
        // sameSite: 'none', -- Descomentar en produccion
        // secure: true -- Descomentar en produccion
      });
      // Respuesta HTTP
      this._logger.log(`Usuario logeado: ${ username }`);
      res.status(200).json({ message: 'Inicio de sesión exitoso' });
    } catch (error) {
      res.status(400).json({
        message: 'Inicio de sesión fallido',
        error: error.message
      });
    }
  }

  @Delete('/sign-out')
  @UseGuards(AuthGuard)
  async signOut(@Req() req: UserRequest, @Res() res: Response): Promise<void> {
    try {
      res.clearCookie('refresh-token');
      res.status(200).json({ message: 'Sesión cerrada correctamente' });
    } catch (error) {
      res.status(500).json({
        message: 'Sesión no existente',
        error: error.message
      });
    }
  }
  

  @Get('/use-refresh-token')
  async useRefreshToken(@Req() req: UserRequest, @Res() res: Response): Promise<void> {
    try {
      const refreshToken = req.cookies['refresh-token'];
      const uuid = verify(refreshToken, process.env.REFRESH_TOKEN_SECRET)['id'];

      const user = await this._service.findUserById(new UUID(uuid));

      const officeId = Office.findIndex(o => o === user.office) + 1;
      const roleId = Role.findIndex(r => r === user.role) + 1;

      const accessToken = createAccessToken({ id: uuid, office: officeId, role: roleId });

      res.setHeader('Authorization', `Bearer ${ accessToken }`);
      
      res.status(200).json({ message: 'Token de acceso renovado' });
    } catch (error) {
      res.status(500).json({
        message: 'Refresh token invalido',
        error: error.message
      });
    }
  }

}