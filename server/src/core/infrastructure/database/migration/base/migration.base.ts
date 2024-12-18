import MysqlConnection from 'src/core/infrastructure/database/connection/mysql.connection';

export default abstract class BaseMigration {
  //#region Atributtes
  private connection: MysqlConnection;
  //#endregion
  constructor() {
    this.connection = MysqlConnection.getInstance();
  }
  //#region Protected Methods
  protected async executeQuery(query: string): Promise<void> {
    try {
      await this.connection.execRawQuery(query);
    } catch (err) {
      console.error(err);
    }
  }

  protected async createTable(name: string, columns: string[]): Promise<void> {
    let baseQuery = `CREATE TABLE IF NOT EXISTS ${ name } (`;
    columns.forEach((column, index) => {
      if (index === columns.length - 1) {
        baseQuery += `${ column })`;
        return;
      }
      baseQuery += `${ column }, `;
    });
    try {
      await this.connection.execNonQuery(baseQuery);
    } catch (err) {
      console.error(err);
    }
  }

  protected async insertData(table: string, columns: string[], values: any[]): Promise<void> {
    let baseQuery = `INSERT INTO ${ table } (`;
    columns.forEach((column, index) => {
      if (index === columns.length - 1) {
        baseQuery += `${ column }) `;
        return;
      }
      baseQuery += `${ column }, `;
    });
    values.forEach((value, index) => {
      if (index === 0) {
        baseQuery += `SELECT `;
        value.forEach((data: string, index: number) => {
          if (index === value.length - 1) {
            baseQuery += `${ data } `;
            return;
          }
          baseQuery += `${ data }, `;
        });
        value.forEach((data: string, index: number) => {
          if (index === 0) {
            baseQuery += `FROM DUAL WHERE NOT EXISTS (SELECT 1 FROM ${ table } WHERE `;
          }
          if (index === value.length - 1) {
            baseQuery += `${ columns[index] } = ${ data }) `;
            return;
          }
          baseQuery += `${ columns[index] } = ${ data }, `;
        });
        return;
      }
      baseQuery += `UNION ALL SELECT `;
      value.forEach((data: string, index: number) => {
        if (index === value.length - 1) {
          baseQuery += `${ data } `;
          return;
        }
        baseQuery += `${ data }, `;
      });
      value.forEach((data: string, index: number) => {
        if (index === 0) {
          baseQuery += `FROM DUAL WHERE NOT EXISTS (SELECT 1 FROM ${ table } WHERE `;
        }
        if (index === value.length - 1) {
          baseQuery += `${ columns[index] } = ${ data }) `;
          return;
        }
        baseQuery += `${ columns[index] } = ${ data }, `;
      });
    });
    try {
      await this.connection.execNonQuery(baseQuery);
    } catch (err) {
      console.error(err);
    }
  }
  //#endregion
  //#region Override Methods
  abstract up(): Promise<void>;
  abstract down(): Promise<void>;
  //#endregion
}