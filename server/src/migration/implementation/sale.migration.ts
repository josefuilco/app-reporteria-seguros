import BaseMigration from '../base/migration.base';

export default class SaleMigration extends BaseMigration{
    constructor(){
        super();  
    }
    async up(): Promise<void>{
        await this.createTable('Sale', [
        'sale_id VARCHAR(32) PRIMARY KEY',
        'date_sale DATETIME NOT NULL',
        'number_polize VARCHAR(32) NOT NULL',
        'sale_branch VARCHAR(32) NOT NULL',
        'sale_condition VARCHAR(32) NOT NULL',
        'user_id VARCHAR(36) NOT NULL',
        'costumer_id VARCHAR(32) NOT NULL',
        'FOREIGN KEY (user_id) REFERENCES User(user_id) ON DELETE CASCADE',
        'FOREIGN KEY (costumer_id) REFERENCES Costumer(costumer_id) ON DELETE CASCADE'
        ]);
    }
    async down(): Promise<void> {}
}