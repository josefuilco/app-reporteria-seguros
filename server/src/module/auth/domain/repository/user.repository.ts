import UUID from "src/module/shared/domain/value-object/uuid.value-object";
import User from "../model/user.model";
import Name from "src/module/shared/domain/value-object/name.value-object";
import Password from "../value-object/password.value-object";

export default interface IUserRepository {
  findUserById(id: UUID): Promise<User>;
  findUserIdByAuthentication(username: Name, password: Password): Promise<UUID>;
  saveUser(user: User): Promise<void>;
  updateUser(id: UUID): Promise<void>;
  deleteUser(id: UUID): Promise<void>;
}