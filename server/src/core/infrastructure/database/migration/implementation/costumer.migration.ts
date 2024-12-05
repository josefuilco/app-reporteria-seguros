import BaseMigration from "../base/migration.base";

export default class CostumerMigration extends BaseMigration{
    constructor(){
    super();  
    }
    async up(): Promise<void>{
        await this.createTable('Costumer',[
        'costumer_id VARCHAR(32) PRIMARY KEY',
        'costumer_vigency DATE NOT NULL',
        'costumer_phone VARCHAR(6)',
        'costumer_cell VARCHAR(9) NOT NULL',
        'costumer_doc VARCHAR(15) NOT NULL',
        'location_id INT NOT NULL',
        'costumertype_id SMALLINT NOT NULL',
        'FOREIGN KEY (location_id) REFERENCES Location(location_id) ON DELETE CASCADE',
        'FOREIGN KEY (costumertype_id) REFERENCES Costumer_Type(costumertype_id) ON DELETE CASCADE'
        ]);
    }
    async down(): Promise<void> {}
}