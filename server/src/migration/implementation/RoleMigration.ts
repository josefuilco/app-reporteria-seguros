import BaseMigration from '../base/BaseMigration';

export default class RoleMigration extends BaseMigration {
  constructor() {
    super();
  }
  async up(): Promise<void> {
    await this.createTable('Roles', [
      'role_id SMALLINT PRIMARY KEY AUTO_INCREMENT',
      'role_name VARCHAR(25) NOT NULL'
    ]);
    await this.insertData('Roles', ['role_name'], [
      ['\'Administrador\''],
      ['\'Usuario\'']
    ]);
  }
  async down(): Promise<void> {}
}