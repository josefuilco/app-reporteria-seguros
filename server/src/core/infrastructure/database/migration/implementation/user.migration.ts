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
    
    await this.executeQuery(`
      CREATE PROCEDURE IF NOT EXISTS SaveUser (
        userId VARCHAR(36),
        userName VARCHAR(30),
        userPassword VARCHAR(64),
        dataNames VARCHAR(30),
        dataSurnames VARCHAR(30),
        dataDni VARCHAR(8),
        dataCellphone VARCHAR(9),
        dataEmail VARCHAR(60),
        officeId SMALLINT,
        roleId SMALLINT
      )
      BEGIN
        DECLARE userdataId SMALLINT;

        INSERT INTO UserData (userdata_names, userdata_surnames, userdata_dni, userdata_cellphone, userdata_email)
        VALUES
        (dataNames, dataSurnames, dataDni, dataCellphone, dataEmail);

        SET userdataId = LAST_INSERT_ID();

        INSERT INTO User (user_id, user_name, user_password, userdata_id, office_id, role_id)
        VALUES
        (userId, userName, userPassword, userdataId, officeId, roleId);
      END
    `);

    await this.executeQuery(`
      CREATE PROCEDURE IF NOT EXISTS FindUserById (
        userId VARCHAR(36)
      )
      BEGIN
        SELECT
          d.userdata_names AS names,
          d.userdata_surnames AS surnames,
          d.userdata_cellphone AS cellphone,
          d.userdata_email AS email,
          office_id AS office,
          role_id AS role
        FROM User u
        INNER JOIN UserData d
        ON u.userdata_id = d.userdata_id
        WHERE u.user_id = userId;
      END
    `);

    await this.executeQuery(`
      CREATE PROCEDURE IF NOT EXISTS UserAuthentication (
        username VARCHAR(36)
      )
      BEGIN
        SELECT
          u.user_id AS id,
          u.user_password AS password,
          u.office_id AS office,
          u.role_id AS role
        FROM User u
        WHERE u.user_name = username AND u.user_active = 1;
      END
    `);
  }
  async down(): Promise<void> {}
}