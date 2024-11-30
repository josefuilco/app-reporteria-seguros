import BaseMigration from "../base/migration.base";

export default class UserMigration extends BaseMigration{
    constructor(){
    super();  
    }
    async up(): Promise<void>{
        await this.createTable('User',[
        'user_id VARCHAR(36) PRIMARY KEY',
        'user_name VARCHAR(30) NOT NULL',
        'user_password VARCHAR(64) NOT NULL',
        'user_active TINYINT DEFAULT 1 NOT NULL',
        'userdata_id SMALLINT NOT NULL',
        'office_id SMALLINT NOT NULL',
        'role_id SMALLINT NOT NULL',
        'FOREIGN KEY (userdata_id) REFERENCES UserData(userdata_id) ON DELETE CASCADE',
        'FOREIGN KEY (office_id) REFERENCES Office(office_id) ON DELETE CASCADE',
        'FOREIGN KEY (role_id) REFERENCES Roles(role_id) ON DELETE CASCADE'
        ]);
    }
    async down(): Promise<void> {}
}