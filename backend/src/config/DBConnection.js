import sqlite3 from 'sqlite3';
import { open } from 'sqlite';


export class DBConnection {
        #dbfilename = '';
        #connection = null;

        constructor(dbfilename = '') {
                this.#dbfilename = dbfilename;
        }

        async open() {
                if (this.#connection) return this.#connection;

                const connection = await open({
                        driver: sqlite3.Database,
                        filename: this.#dbfilename
                });

                this.#connection = connection;

                return connection;
        }

        getConnection() {
                return this.#connection;
        }

        async close() {
                if (!this.#connection) return;
                
                await this.#connection.close();
                this.#connection = null;
        }
}