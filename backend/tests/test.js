const BASE_URL = 'http://localhost:3000';

function assertStatus(recebido, esperado) {
    const ok = recebido === esperado;

    console.log(
        ok
            ? `✓ FUNCIONOU | recebido=${recebido} | esperado=${esperado}`
            : `✗ FALHOU    | recebido=${recebido} | esperado=${esperado}`
    );

    return ok;
}

function assertEqual(recebido, esperado) {
    const ok = recebido === esperado;

    console.log(
        ok
            ? `✓ FUNCIONOU | recebido=${recebido} | esperado=${esperado}`
            : `✗ FALHOU    | recebido=${recebido} | esperado=${esperado}`
    );

    return ok;
}

async function runTest(nome, callback) {
    console.log(`\n=== ${nome} ===`);

    try {
        await callback();
    }
    catch (err) {
        console.log(`✗ EXCEÇÃO | ${err.message}`);
    }
}

async function main() {
    await runTest('POST /usuarios', async () => {
        const res = await fetch(`${BASE_URL}/usuarios`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                nome: 'vitor',
                senha: '123456',
                tipo: 'default'
            })
        });

        assertStatus(res.status, 201);
    });

    await runTest('GET /usuarios', async () => {
        const res = await fetch(`${BASE_URL}/usuarios`);

        assertStatus(res.status, 200);
    });

    await runTest('GET /usuarios/1', async () => {
        const res = await fetch(`${BASE_URL}/usuarios/1`);

        assertStatus(res.status, 200);
    });

    await runTest('GET /usuarios/999999 (inexistente)', async () => {
        const res = await fetch(`${BASE_URL}/usuarios/999999`);

        assertStatus(res.status, 404);
    });

    await runTest('POST /categorias', async () => {
        const res = await fetch(`${BASE_URL}/categorias`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                nome: 'Tecnologia'
            })
        });

        assertStatus(res.status, 201);
    });

    await runTest('GET /categorias', async () => {
        const res = await fetch(`${BASE_URL}/categorias`);

        assertStatus(res.status, 200);
    });

    await runTest('POST /posts', async () => {
        const res = await fetch(`${BASE_URL}/posts`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                titulo: 'Primeiro Post',
                conteudo: 'Conteúdo de teste',
                fotoApresentacao: '/none.png',
                categoriaId: 1,
                usuarioId: 1
            })
        });

        assertStatus(res.status, 201);
    });

    await runTest('GET /posts', async () => {
        const res = await fetch(`${BASE_URL}/posts`);

        assertStatus(res.status, 200);
    });

    await runTest('GET /posts/1', async () => {
        const res = await fetch(`${BASE_URL}/posts/1`);

        assertStatus(res.status, 200);
    });

    await runTest('PATCH /posts/1', async () => {
        const res = await fetch(`${BASE_URL}/posts/1`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                titulo: 'Título atualizado'
            })
        });

        assertStatus(res.status, 204);
    });

    await runTest('DELETE /posts/1', async () => {
        const res = await fetch(`${BASE_URL}/posts/1`, {
            method: 'DELETE'
        });

        assertStatus(res.status, 204);
    });
}

main();