import BaseMigration from '../base/migration.base';

export default class CostumerTypeMigration extends BaseMigration {
  constructor() {
    super();
  }
  async up(): Promise<void> {
    await this.createTable('Costumer_Type', [
      'costumertype_id SMALLINT PRIMARY KEY AUTO_INCREMENT',
      'costumertype_name VARCHAR(30) NOT NULL'
    ]);
    await this.insertData('Costumer_Type', ['costumertype_name'], [
      ['\'Natural\''],
      ['\'Natural Extranjero\''],
      ['\'Empresa\''],
    ]);
  }
  async down(): Promise<void> {}
}