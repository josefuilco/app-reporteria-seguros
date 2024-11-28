import { join } from "path";
import BaseMigration from "./base/BaseMigration";
import loadModules from "src/util/loadModules";

export default class Migrations {
  //#region Methods
  static exec() {
    // Saving migrations
    const migrations: BaseMigration[] = loadModules(join(__dirname, 'implementation'));
    // Up migrations
    migrations.forEach(async migration => await migration.up());
    // Down migrations
    migrations.forEach(async migration => await migration.down());
  }
  //#endregion
}