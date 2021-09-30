const express = require('express');
const router = express.Router();
const login = require('../middleware/login');

const pedidosController = require('../controllers/pedidos-controller');

//retorna todos os pedidos
router.get('/', pedidosController.getPedidos);

//insere um novo pedido
router.post('/', login , pedidosController.postPedidos);

//retorna um pedido específico
router.get('/:id_pedido', pedidosController.getUmPedido);

//Usando o patch para um pedido
router.patch('/', login, pedidosController.patchPedido);

//Usando DELETE para todos os pedidos
router.delete('/:id_pedidos', login, pedidosController.deletePedido)

module.exports = router;