import BaseMigration from '../base/migration.base';

export default class LocationMigration extends BaseMigration {
  constructor() {
    super();
  }
  async up(): Promise<void> {
    await this.createTable('Location', [
      'location_id INT PRIMARY KEY AUTO_INCREMENT',
      'location_departament VARCHAR(20) NOT NULL',
      'location_distrit VARCHAR(20) NOT NULL',
      'location_province VARCHAR(20) NOT NULL',
      'location_adress VARCHAR(20) NOT NULL' 
    ]);
  }
  async down(): Promise<void> {}
}