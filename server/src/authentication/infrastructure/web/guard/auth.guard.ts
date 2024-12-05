import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { UserRequest } from '../request/user.request';
import { Response } from 'express';

@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    const { getRequest, getResponse } = context.switchToHttp();
    const request = getRequest() as UserRequest;
    const response = getResponse() as Response;
    request.user_id = request.headers.authorization;
    if (request.user_id.length < 1) response.status(401).json({
      message: 'Autenticación fallida',
      error: 'Token de autenticación invalida'
    });
    return true;
  }
}