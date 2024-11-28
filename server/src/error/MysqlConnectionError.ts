export default class MysqlConnectionError extends Error {
  constructor() {
    super('Mysql Connection Error');
  }
}