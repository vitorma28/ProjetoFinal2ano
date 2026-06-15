import fs from 'fs/promises';


export async function config(dbconnection) {
        const squema = await fs.readFile('./schema.sql');

        const conn = await dbconnection.open();

        await conn.exec(squema);

        await dbconnection.close();
}

export async function seeddb(dbconnection) {
        const seed = await fs.readFile('./seed.sql');

        const conn = await dbconnection.open();

        await conn.exec(seed);

        await conn.exec(seed);
}