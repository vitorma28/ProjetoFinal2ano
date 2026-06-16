import { DBConnection } from "#config/DBConnection.js";
import { config, seeddb } from "#db/init.js"

(async () => {
    const conn = new DBConnection('./data.db');
    await seeddb(conn);
})();