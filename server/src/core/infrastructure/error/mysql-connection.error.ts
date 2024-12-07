export default class MysqlConnectionError extends Error {
  constructor(msg: string) {
    super('Error de Conexion: ' + msg);
  }
}