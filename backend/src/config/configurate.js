import path from 'path';
import fs from 'fs/promises';
import { config, seeddb } from '#db/init.js';
import { DBConnection } from './DBConnection.js';


const __dirname = import.meta.dirname;

async function fileExists(path) {
  try {
    await fs.access(path);
    return true;
  } catch {
    return false;
  }
}

export async function configurate(dbfilename, debugging = '0') {
        const filename = path.join(__dirname, '..', dbfilename);

        if (!(await fileExists(filename))) {
                await fs.writeFile(filename, '', 'utf-8');
        }

        const conn = new DBConnection(filename);

        if ((await fs.readFile(filename, 'utf-8')).length == 0) {
                await config(conn);
                await seeddb(conn, debugging != '0');
        }

        return conn;
}
