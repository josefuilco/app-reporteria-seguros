import Name from 'src/module/shared/domain/value-object/name.value-object';
import UUID from 'src/module/shared/domain/value-object/uuid.value-object';
import User from '../../domain/model/user.model';
import IUserRepository from '../../domain/repository/user.repository';
import Password from '../../domain/value-object/password.value-object';
import MysqlConnection from 'src/connection/mysql.connection';

export default class MysqlUserRepository implements IUserRepository {
  private readonly _connection: MysqlConnection;

  constructor() {
    this._connection = MysqlConnection.getInstance();
  }

  findUserById(id: UUID): Promise<User> {
    throw new Error("Method not implemented.");
  }
  
  findUserIdByAuthentication(username: Name, password: Password): Promise<UUID> {
    throw new Error("Method not implemented.");
  }

  async saveUser(user: User): Promise<void> {
    this._connection.execNonQuery('CALL SaveUser (?)', [
      
    ]);
  }

  updateUser(user: User): Promise<void> {
    throw new Error("Method not implemented.");
  }

  deleteUser(id: UUID): Promise<void> {
    throw new Error("Method not implemented.");
  }
}