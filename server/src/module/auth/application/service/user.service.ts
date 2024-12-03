import UserDTO from '../dto/user.dto';
import Name from 'src/module/shared/domain/value-object/name.value-object';
import Password from '../../domain/value-object/password.value-object';
import IUserRepository from '../../domain/repository/user.repository';
import UUID from 'src/module/shared/domain/value-object/uuid.value-object';
import User from '../../domain/model/user.model';

export default class UserService {
  constructor(
    private readonly _repository: IUserRepository
  ) {}

  async findUserById(id: UUID): Promise<UserDTO> {
    throw new Error("Method not implemented.");
  }

  async authenticateUser(username: Name, password: Password): Promise<UUID> {
    throw new Error("Method not implemented.");
  }

  async saveUser(user: User): Promise<void> {
    throw new Error("Method not implemented.");
  }

  async updateUser(user: User): Promise<void> {
    throw new Error("Method not implemented.");
  }

  async deleteUser(id: UUID): Promise<void> {
    throw new Error("Method not implemented.");
  }
}