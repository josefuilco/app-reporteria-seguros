import { Injectable } from '@nestjs/common';
import { compare, hash } from 'bcrypt';
import Name from 'src/core/domain/value-object/name.value-object';
import UUID from 'src/core/domain/value-object/uuid.value-object';
import Password from 'src/authentication/domain/value-object/password.value-object';
import IUserRepository from 'src/authentication/domain/repository/user.repository';
import MysqlConnection from 'src/core/infrastructure/database/connection/mysql.connection';
import User from 'src/authentication/domain/model/user.model';
import UserData from 'src/authentication/domain/model/user-data.model';
import { DefaultUserValue } from 'src/authentication/domain/enums/default-user-value.enum';

@Injectable()
export default class MysqlUserRepository implements IUserRepository {
  private readonly _connection: MysqlConnection;

  constructor() {
    this._connection = MysqlConnection.getInstance();
  }

  async findUserById(id: UUID): Promise<User> {
    const [ row ] = await this._connection.execQuery('CALL FindUserById (?)', [ id.getValue() ]);
    if (!row) throw new Error('Usuario no encontrado');
    const currentUser = new User(
      id.getValue(),
      DefaultUserValue.Nickname,
      DefaultUserValue.Password
    );
    currentUser.setUserData(new UserData(
      DefaultUserValue.Id,
      row.names,
      row.surnames,
      DefaultUserValue.Dni,
      row.cellphone,
      row.email
    ));
    currentUser.setOfficeId(row.office);
    currentUser.setRoleId(row.role);
    return currentUser;
  }
  
  async findUserByAuthentication(username: Name, password: Password): Promise<User> {
    const [ row ] = await this._connection.execQuery('CALL UserAuthentication (?)', [ username.getValue() ]);
    if (!row) throw new Error('Cuenta inexistente');
    const isEqual = await compare(password.getValue(), row.password);
    if (!isEqual) throw new Error('Dato(s) incorrecto(s)');
    const user = new User(
      row.id,
      DefaultUserValue.Nickname,
      DefaultUserValue.Password
    );
    user.setOfficeId(row.office);
    user.setRoleId(row.role);
    return user;
  }

  async saveUser(user: User): Promise<void> {
    const data = user.getUserData();
    const hashedPassword = await hash(user.getPassword(), 10);
    await this._connection.execNonQuery('CALL SaveUser (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', [
      user.getId(),
      user.getName(),
      hashedPassword,
      data.getNames(),
      data.getSurnames(),
      data.getDni(),
      data.getCellphone(),
      data.getEmail(),
      user.getOfficeId(),
      user.getRoleId()
    ]);
  }

  async deleteUser(id: UUID): Promise<void> {
    await this._connection.execNonQuery('UPDATE User SET user_active=0 WHERE user_id=?', [ id.getValue() ]);
  }
}