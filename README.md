#  Inventário de Produtos com Supabase

Este projeto implementa um sistema simples de gerenciamento de inventário utilizando **Supabase** como banco de dados e **JavaScript (Fetch API)** para comunicação com a API REST.

##  Funcionalidades

O código fornece funções assíncronas para manipulação de produtos no inventário:

- **Adicionar Produto**  
  `adicionarProduto(nome, categoria, quantidade, preco)`  
  Insere um novo produto no inventário.

- **Listar Inventário**  
  `listarInventario()`  
  Retorna todos os produtos cadastrados.

- **Atualizar Itens**  
  `atualizarItens(id, quantidadeVendida)`  
  Atualiza a quantidade em estoque após uma venda.

- **Remover Produto**  
  `removerProduto(id)`  
  Exclui um produto do inventário.

- **Alerta de Estoque**  
  `alertaEstoque()`  
  Lista produtos com menos de 5 unidades em estoque.

- **Calcular Patrimônio**  
  `calcularPatrimonio()`  
  Calcula o valor total do inventário (quantidade × preço).

- **Ordenar por Categoria**  
  `ordenarCategoria(categoria)`  
  Lista produtos de uma categoria específica ordenados por preço (decrescente).

##  Tecnologias Utilizadas

- [Supabase](https://supabase.com/) - Banco de dados e API REST
- JavaScript (ES6+)
- Fetch API

##  Estrutura

- **Configuração da API**  
  ```js
  const SUPABASE_URL = 'https://<sua-instancia>.supabase.co';
  const SUPABASE_KEY = '<sua-chave>';
  const URL = `${SUPABASE_URL}/rest/v1/inventario`;


- **Cabeçalho de Autentificação**
```js
  const HEADERS = {
    'apikey': SUPABASE_KEY,
    'Authorization': `Bearer ${SUPABASE_KEY}`,
    'Content-Type': 'application/json'
  };

