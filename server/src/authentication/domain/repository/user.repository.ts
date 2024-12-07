import UUID from "src/core/domain/value-object/uuid.value-object";
import User from "../model/user.model";
import Name from "src/core/domain/value-object/name.value-object";
import Password from "../value-object/password.value-object";

export const USER_REPOSITORY = Symbol('USER_REPOSITORY');

export default interface IUserRepository {
  findUserById(id: UUID): Promise<User>;
  findUserByAuthentication(username: Name, password: Password): Promise<User>;
  saveUser(user: User): Promise<void>;
  deleteUser(id: UUID): Promise<void>;
}