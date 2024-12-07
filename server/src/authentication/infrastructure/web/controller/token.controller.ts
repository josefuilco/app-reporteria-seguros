import { Controller, Get, Logger, Req, Res } from '@nestjs/common';
import { Response } from 'express';
import { verify } from 'jsonwebtoken';
import UserService from 'src/authentication/application/service/user.service';
import { Office } from 'src/authentication/domain/constant/office.constants';
import { Role } from 'src/authentication/domain/constant/role.constants';
import UUID from 'src/core/domain/value-object/uuid.value-object';
import { UserRequest } from 'src/core/infrastructure/web/request/user.request';
import { createAccessToken } from '../../util/create-token.util';

@Controller('/api/token')
export class TokenController {
  constructor(private readonly _service: UserService, private readonly _logger: Logger) {}

  @Get('/refresh')
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