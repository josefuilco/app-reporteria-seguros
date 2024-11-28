export default class MysqlConnectionError extends Error {
  constructor() {
    super('Error al momento de intentar conectar');
  }
}