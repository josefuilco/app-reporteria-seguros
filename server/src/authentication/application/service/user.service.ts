import UserDTO from '../dto/user.dto';
import Name from 'src/core/domain/value-object/name.value-object';
import Password from '../../domain/value-object/password.value-object';
import IUserRepository, { USER_REPOSITORY } from '../../domain/repository/user.repository';
import UUID from 'src/core/domain/value-object/uuid.value-object';
import User from '../../domain/model/user.model';
import { Inject, Injectable } from '@nestjs/common';
import { Office } from '../../domain/constant/office.constants';
import { Role } from '../../domain/constant/role.constants';
import { AuthDTO } from '../dto/auth.dto';

@Injectable()
export default class UserService {
  constructor(@Inject(USER_REPOSITORY) private readonly _repository: IUserRepository) {}

  async findUserById(id: UUID): Promise<UserDTO> {
    const user = await this._repository.findUserById(id);
    const data = user.getUserData();
    return new UserDTO(
      data.getNames(),
      data.getSurnames(),
      data.getEmail(),
      data.getCellphone(),
      Office[user.getOfficeId() - 1],
      Role[user.getRoleId() - 1]
    );
  }

  async authenticateUser(username: Name, password: Password): Promise<AuthDTO> {
    const user = await this._repository.findUserByAuthentication(username, password);
    return new AuthDTO(user.getId(), user.getOfficeId(), user.getRoleId());
  }

  async saveUser(user: User): Promise<void> {
    const data = user.getUserData();
    user.setName(
      data.getNames()[0].toLowerCase().concat(
        data.getSurnames().split(' ')[0].toLowerCase()
      )
    );
    user.setPassword(
      data.getNames()[0].toLowerCase().concat(
        data.getSurnames()[0].toLowerCase()
      ).concat(
        process.env.CONCAT_PASSWORD_SECRET
      )
    );
    await this._repository.saveUser(user);
  }

  async deleteUser(id: UUID): Promise<void> {
    await this._repository.deleteUser(id);
  }
}