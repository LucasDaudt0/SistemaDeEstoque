const SUPABASE_URL = 'SUA_URL_AQUI';
const SUPABASE_KEY = 'SUA_CHAVE_AQUI';

const URL = `${SUPABASE_URL}/rest/v1/inventario`;

const HEADERS = {
    'apikey': SUPABASE_KEY,
    'Authorization': `Bearer ${SUPABASE_KEY}`,
    'Content-Type': 'application/json'
};

async function adicionarProduto(nome, categoria, quantidade, preco) {
    try {
        if (preco <= 0) {
            console.log('Preço Inválido.')
        } else {
            const response = await fetch(`${URL}`, {
                method: 'POST',
                headers: { ...HEADERS, 'Prefer': 'return=representation' },
                body: JSON.stringify({
                    nome: nome,
                    categoria: categoria,
                    quantidade: quantidade,
                    preco: preco
                })
            })
            const data = await response.json();
            console.log("Produto adicionado com Sucesso:", data)
        }
    } catch (error) {
        console.error('Não foi possível realizar esta ação:', error)
    }
}

async function listarInventario() {
    try {
        const response = await fetch(`${URL}?select=*`, { headers: HEADERS })
        const data = await response.json();
        console.log('Lista de Produtos', data)
    } catch (error) {
        console.error('Não foi possível realizar esta ação:', error)
    }
}

async function atualizarItens(id, quantidadeVendida) {
    try {
        const response = await fetch(`${URL}?id=eq.${id}&select=*`, {headers: HEADERS})
        const data = await response.json();
        const produto = data[0];
        const emEstoque = produto.quantidade - quantidadeVendida;

        if (emEstoque < 0) {
            throw new Error('Estoque insuficiente');
        }

        const response2 = await fetch(`${URL}?id=eq.${id}`, {
            method: 'PATCH',
            headers: { ...HEADERS, 'Prefer': 'return=representation' },
            body: JSON.stringify({
                quantidade: emEstoque
            })
        });

        const data2 = await response2.json();

        console.log('Produto atualizado:', data2);

    } catch (error) {
        console.error('Não foi possível realizar esta ação:', error);
    }
}

async function removerProduto(id) {
    try {
        const response = await fetch(`${URL}?id=eq.${id}`, {
            method: 'DELETE',
            headers: { ...HEADERS, 'Prefer': 'return=representation' },
        })
        const data = await response.json();
        console.log('Produto removido com sucesso:', data)
    } catch (error) {
        console.error('Não foi possível realizar esta ação:', error)
    }
}

async function alertaEstoque() {
    try {
        const response = await fetch(`${URL}?quantidade=lt.5`, { headers: HEADERS })
        const data = await response.json()
        console.log('Produtos com menos de 5 unidades em estoque:', data)
    } catch (error) {
        console.error('Não foi possível realizar esta ação:', error)
    }
}

async function calcularPatrimonio() {
    let patrimonio = 0;
    try {
        const response = await fetch(`${URL}?select=*`, { headers: HEADERS })
        const data = await response.json();

        data.forEach(produto => {
            patrimonio += produto.quantidade * produto.preco
        });

        console.log(`Patrimônio Total: R$${patrimonio}.`)
    } catch (error) {
        console.error('Não foi possível realizar esta ação:', error)
    }
}

async function ordenarCategoria(categoria) {
    try {
        const response = await fetch(`${URL}?categoria=eq.${categoria}&order=preco.desc`, { headers: HEADERS })
        const data = await response.json();

        console.log(data)
    } catch (error) {
        
    }
}
