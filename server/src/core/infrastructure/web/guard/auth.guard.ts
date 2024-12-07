import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { UserRequest } from '../request/user.request';
import { Response } from 'express';
import { verify } from 'jsonwebtoken';

@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest() as UserRequest;
    const response = context.switchToHttp().getResponse() as Response;

    const refreshToken = request.cookies['refresh-token'];
    const accessToken = request.headers.authorization.split(' ')[1];

    if (!refreshToken) {
      response.status(401).json({
        message: 'Autenticación fallida',
        error: 'Refresh token caducado',
        redirect: '/'
      });
      return false;
    }

    try {
      const accessTokenData = verify(accessToken, process.env.ACCESS_TOKEN_SECRET);
      
      request.user_id = accessTokenData['id'];
      request.user_office = accessTokenData['office'];
      request.user_role = accessTokenData['role'];
    } catch (error) {
      if (error.name === 'TokenExpiredError') {
        response.status(302).redirect('/api/user/use-refresh-token');
        return;
      }

      response.status(401).json({
        message: 'Token invalido',
        error: error.message
      });

      return false;
    }
    
    return true;
  }
}