import BaseMigration from '../base/BaseMigration';

export default class UserDataMigration extends BaseMigration {
  constructor() {
    super();
  }
  async up(): Promise<void> {
    await this.createTable('UserData', [
      'userdata_id SMALLINT PRIMARY KEY AUTO_INCREMENT',
      'userdata_names VARCHAR(30) NOT NULL',
      'userdata_surnames VARCHAR(30) NOT NULL',
      'userdata_dni VARCHAR(8) NOT NULL UNIQUE',
      'userdata_cellphone VARCHAR(9) NOT NULL UNIQUE',
      'userdata_email VARCHAR(60) NOT NULL UNIQUE' 
    ]);
  }
  async down(): Promise<void> {}
}