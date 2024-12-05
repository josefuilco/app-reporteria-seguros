import { join } from "path";
import BaseMigration from "./base/migration.base";
import loadModules from "src/core/infrastructure/util/load-modules.util";

export default class Migration {
  //#region Methods
  static execute() {
    // Saving migrations
    const migrations: BaseMigration[] = loadModules(join(__dirname, 'implementation'));
    // Up migrations
    migrations.forEach(async migration => await migration.up());
    // Down migrations
    migrations.forEach(async migration => await migration.down());
  }
  //#endregion
}