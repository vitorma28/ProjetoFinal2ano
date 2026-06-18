export class GenericDAO {
        #connection = null;
        #tablename = '';
        #modelClass = null;

        constructor(tablename = '', connection = null, modelClass = null) {
                if (new.target == GenericDAO) {
                        throw new TypeError('GenericDAO é uma classe abstrata.');
                }

                this.#connection = connection;
                this.#modelClass = modelClass;
                this.#tablename = tablename;
        }
        
        async insert(model) {
                if (!(model instanceof this.#modelClass)) {
                        throw new SyntaxError('Modelo a ser inserido deve ser do modelo registrado.');
                }

                const columns = this.#modelClass.columnsToInsert().join(', ')
                const data = model.dataToInsert();
                const questionmarks = data.map(() => '?').join(', ');

                try {
                        const conn = await this.#connection.open();

                        await conn.run(`INSERT INTO ${this.#tablename} (${columns}) VALUES (${questionmarks})`, ...data);
                }
                catch (err) {
                        console.error('Erro ao executar \'insert\'.\n' + err);
                }
                finally {
                        await this.#connection.close();
                }
        }

        async remove(id) {
                try {
                        const conn = await this.#connection.open();

                        await conn.run(`DELETE FROM ${this.#tablename} WHERE id = ?`, id);
                }
                catch (err) {
                        console.error('Erro ao executar \'remove\'.\n' + err);
                }
                finally {
                        await this.#connection.close();
                }
        }
        
        async getAll() {
                try {
                        const conn = await this.#connection.open();

                        const rows = await conn.all(`SELECT * FROM ${this.#tablename}`);

                        return rows.map(r => this.#modelClass.build(r));
                }
                catch (err) {
                        console.error('Erro ao executar \'getAll\'.\n' + err);

                        return [];
                }
        }
        
        async getById(id) {
                try {
                        const conn = await this.#connection.open();

                        const model = await conn.get(`SELECT * FROM ${this.#tablename} WHERE id = ?`, id);

                        if (!model) return null;

                        return this.#modelClass.build(model);
                }
                catch (err) {
                        console.error('Erro ao executar \'getById\'.\n' + err);

                        return null;
                }
        }

        async update(id, changes) {
                const keys = Object.keys(changes);

                if (keys.length == 0 || 'id' in changes) return;

                const values = Object.values(changes);
                const setStringArr = keys.map(k => `${k} = ?`);
                const setString = setStringArr.join(', ');


                try {
                        const conn = await this.#connection.open();

                        await conn.run(`UPDATE ${this.#tablename} SET ${setString} WHERE id = ?`, ...values, id);
                }
                catch (err) {
                        console.error('Erro ao executar \'update\'.\n' + err);
                }
                finally {
                        await this.#connection.close();
                }

        }
}