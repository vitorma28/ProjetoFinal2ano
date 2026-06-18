import fs from 'fs/promises';
import path from 'path'


const __dirname = import.meta.dirname;


export async function config(dbconnection) {
        const schema = await fs.readFile(path.join(__dirname, 'schema.sql'), 'utf-8');

        const conn = await dbconnection.open();

        await conn.exec(schema);

        await dbconnection.close();
}

export async function seeddb(dbconnection, debugging = false) {
        if (!debugging) return;

        const seed = await fs.readFile(path.join(__dirname, 'seed.sql'), 'utf-8');

        const conn = await dbconnection.open();

        await conn.exec(seed);

        await dbconnection.close();
}