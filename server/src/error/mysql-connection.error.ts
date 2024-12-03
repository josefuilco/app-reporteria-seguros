export default class MysqlConnectionError extends Error {
  constructor(msg: string) {
    super(msg);
  }
}