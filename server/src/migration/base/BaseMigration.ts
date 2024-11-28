import MysqlConnection from 'src/connection/MysqlConnection';

export default abstract class BaseMigration {
  //#region Atributtes
  protected connection: MysqlConnection;
  //#endregion
  constructor() {
    this.connection = MysqlConnection.getInstance();
  }
  //#region Protected Methods
  protected async createTable(name: string, columns: string[]): Promise<void> {
    let baseQuery = `CREATE TABLE IF NOT EXISTS ${ name } (`;
    columns.forEach((column, index) => {
      if (index === columns.length - 1) {
        baseQuery += `${ column })`;
        return;
      }
      baseQuery += `${ column }, `;
    });
    await this.connection.execNonQuery(baseQuery);
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
    await this.connection.execNonQuery(baseQuery);
  }
  //#endregion
  //#region Override Methods
  abstract up(): Promise<void>;
  abstract down(): Promise<void>;
  //#endregion
}