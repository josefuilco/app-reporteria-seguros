import { Module } from "@nestjs/common";
import { UserController } from "./infrastructure/web/controller/user.controller";
import { USER_REPOSITORY } from "./domain/repository/user.repository";
import UserService from "./application/service/user.service";
import MysqlUserRepository from "./infrastructure/repository/mysql-user.repository";

@Module({
  controllers: [UserController],
  providers: [
    UserService,
    {
      provide: USER_REPOSITORY,
      useClass: MysqlUserRepository
    }
  ]
})
export class AuthModule {}