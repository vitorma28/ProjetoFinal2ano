import express from 'express';
import dotenv from 'dotenv';
import { UsuarioDAO } from '#daos';
import { UsuarioService } from '#services';
import { UsuarioController } from '#controllers';
import { usuarioRoutes } from '#routes';
import { configurate } from '#config/configurate.js';


dotenv.config();

const { PORT, DBFILENAME } = process.env;


async function main() {
        console.log(DBFILENAME)
        const conn = await configurate(DBFILENAME);

        const usuarioDAO = new UsuarioDAO(conn);
        const usuarioService = new UsuarioService(usuarioDAO);
        const usuarioController = new UsuarioController(usuarioService);

        const app = express();

        app.get('/', (req, res) => {
                res.json({message: "Servidor executando"});
        });
        
        app.use('/usuarios', usuarioRoutes(usuarioController));

        app.listen(PORT, () => {
                console.log(`Servidor sendo executado na porta ${PORT}.`);
        })
}

main();
