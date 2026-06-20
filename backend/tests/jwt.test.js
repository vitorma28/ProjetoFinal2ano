const BASE_URL = 'http://localhost:3000';

function assertEqual(recebido, esperado, descricao) {
    if (recebido === esperado) {
        console.log(`✓ FUNCIONOU | ${descricao} | recebido=${recebido} | esperado=${esperado}`);
    } else {
        console.log(`✗ FALHOU    | ${descricao} | recebido=${recebido} | esperado=${esperado}`);
    }
}

async function main() {
    const username = `teste_${Date.now()}`;

    console.log('\n=== CRIANDO USUÁRIO ===');

    const createUser = await fetch(`${BASE_URL}/usuarios`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name: username,
            senha: '123456',
            tipo: 'default'
        })
    });

    assertEqual(createUser.status, 201, 'POST /usuarios');

    console.log('\n=== LOGIN ===');

    const login = await fetch(`${BASE_URL}/usuarios/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name: username,
            senha: '123456'
        })
    });

    assertEqual(login.status, 200, 'POST /usuarios/login');

    let token = null;

    if (login.ok) {
        const data = await login.json();

        token = data.token;

        console.log(
            token
                ? '✓ TOKEN RECEBIDO'
                : '✗ TOKEN NÃO RECEBIDO'
        );
    }

    console.log('\n=== ROTA PROTEGIDA SEM TOKEN ===');

    const noToken = await fetch(`${BASE_URL}/posts`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            titulo: 'Teste',
            conteudo: 'Conteúdo',
            categoriaId: 1
        })
    });

    assertEqual(noToken.status, 401, 'POST /posts sem token');

    console.log('\n=== ROTA PROTEGIDA COM TOKEN ===');

    const withToken = await fetch(`${BASE_URL}/posts`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
            titulo: 'Teste JWT',
            conteudo: 'Conteúdo JWT',
            categoriaId: 1
        })
    });

    assertEqual(withToken.status, 201, 'POST /posts com token');

    console.log('\n=== TOKEN INVÁLIDO ===');

    const invalidToken = await fetch(`${BASE_URL}/posts`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer token_invalido'
        },
        body: JSON.stringify({
            titulo: 'Teste',
            conteudo: 'Teste',
            categoriaId: 1
        })
    });

    assertEqual(invalidToken.status, 401, 'POST /posts token inválido');

    console.log('\n=== TOKEN AUSENTE EM PATCH ===');

    const patchWithoutToken = await fetch(`${BASE_URL}/usuarios/1`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name: 'novoNome'
        })
    });

    assertEqual(
        patchWithoutToken.status,
        401,
        'PATCH /usuarios/:id sem token'
    );
}

main().catch(console.error);