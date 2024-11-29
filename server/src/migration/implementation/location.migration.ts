import BaseMigration from '../base/migration.base';

export default class LocationMigration extends BaseMigration {
  constructor() {
    super();
  }
  async up(): Promise<void> {
    await this.createTable('Location', [
      'location_id SMALLINT PRIMARY KEY',
      'loc_departament VARCHAR(20) NOT NULL',
      'loc_distrit VARCHAR(20) NOT NULL',
      'loc_province VARCHAR(20) NOT NULL',
      'loc_adress VARCHAR(20) NOT NULL' 
    ]);
  }
  async down(): Promise<void> {}
}