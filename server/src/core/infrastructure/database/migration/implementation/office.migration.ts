import BaseMigration from '../base/migration.base';

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
      ['\'Lima\''],
      ['\'Ica\''],
      ['\'Pisco\''],
      ['\'Chiclayo\''],
      ['\'Piura\''],
      ['\'Cusco\'']
    ]);
  }
  async down(): Promise<void> {}
}