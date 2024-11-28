import BaseMigration from '../base/BaseMigration';

export default class OfficeMigration extends BaseMigration {
  constructor() {
    super();
  }
  async up(): Promise<void> {
    await this.createTable('Office', [
      'office_id SMALLINT PRIMARY KEY AUTO_INCREMENT',
      'office_name VARCHAR(25) NOT NULL'
    ]);
    await this.insertData('Office', ['office_name'], [
      ['\'Administrador\''],
      ['\'Usuario\'']
    ]);
  }
  async down(): Promise<void> {}
}