import { Body, Controller, Delete, Logger, Post, Req, Res, UseGuards } from '@nestjs/common';
import { Response } from 'express';
import { AuthGuard } from 'src/core/infrastructure/web/guard/auth.guard';
import { UserRequest } from 'src/core/infrastructure/web/request/user.request';
import { AuthUserDTO } from '../dto/auth-user.dto';
import Name from 'src/core/domain/value-object/name.value-object';
import Password from 'src/authentication/domain/value-object/password.value-object';
import UserService from 'src/authentication/application/service/user.service';
import { createAccessToken, createRefreshToken } from '../../util/create-token.util';

@Controller('/api/auth')
export class AuthController {
  constructor(private readonly _service: UserService, private readonly _logger: Logger) {}

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
}