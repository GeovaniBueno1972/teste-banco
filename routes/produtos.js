const express = require('express');
const router = express.Router();
const login = require('../middleware/login');
const produtoController = require('../controllers/produtos-controller');


//retorna todos os produtos
router.get('/', produtoController.getProduto);

//insere um novo produto
router.post('/', login, produtoController.postProduto);

//retorna um produto específico
router.get('/:id_produto', produtoController.getUmProduto);

//Usando o patch para um produto
router.patch('/', login, produtoController.patchProduto);

//Usando DELETE para todos os pedidos
router.delete('/:id_produto', login, produtoController.deleteUmProduto)

module.exports = router;