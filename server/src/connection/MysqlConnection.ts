import { Pool, PoolOptions, QueryResult, createPool } from 'mysql2/promise';
import MysqlConnectionError from 'src/error/MySQLConnectionError';

export default class MysqlConnection {
  //#region Atributtes
  static #instance: MysqlConnection;
  #access: PoolOptions;
  #pool: Pool;
  //#endregion
  private constructor() {
    this.#access = {
      user: process.env.MYSQL_USER,
      password: process.env.MYSQL_PASSWORD,
      host: process.env.MYSQL_HOST,
      database: process.env.MYSQL_DATABASE,
      connectionLimit: 20,
      maxIdle: 5
    }
    this.#pool = createPool(this.#access);
  }
  //#region Methods
  static getInstance(): MysqlConnection {
    this.#instance ??= new MysqlConnection();
    return this.#instance;
  }

  async execQuery(query: string, parameters: any[] = []): Promise<QueryResult> {
    const connection = await this.#pool.getConnection();
    try {
      const [ result, _field ] = await connection.execute(query, parameters);
      return result;
    } catch {
      throw new MysqlConnectionError();
    } finally {
      connection.release();
    }
  }

  async execNonQuery(query: string, parameters: any[] = []): Promise<void> {
    const connection = await this.#pool.getConnection();
    try {
      await connection.execute(query, parameters);
    } catch {
      throw new MysqlConnectionError();
    } finally {
      connection.release();
    }
  }
  //#endregion
}