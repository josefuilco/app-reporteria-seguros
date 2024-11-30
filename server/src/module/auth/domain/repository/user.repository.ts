import User from "../model/user.model";

export default interface IUserRepository {
  findUserById(): Promise<User>;
}