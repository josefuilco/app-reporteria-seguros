import { Logger, Module } from "@nestjs/common";
import { UserController } from "./infrastructure/web/controller/user.controller";
import { AuthController } from "./infrastructure/web/controller/auth.controller";
import { TokenController } from "./infrastructure/web/controller/token.controller";
import { USER_REPOSITORY } from "./domain/repository/user.repository";
import UserService from "./application/service/user.service";
import MysqlUserRepository from "./infrastructure/repository/mysql-user.repository";

@Module({
  controllers: [UserController, AuthController, TokenController],
  providers: [
    UserService,
    {
      provide: USER_REPOSITORY,
      useClass: MysqlUserRepository
    },
    Logger
  ]
})
export class AuthModule {}