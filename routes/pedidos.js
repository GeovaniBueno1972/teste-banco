const express = require('express');
const router = express.Router();


//retorna todos os pedidos
router.get('/', (req, res, next) => {
    res.status(200).send ({
        mensagem: 'Usando o GET dentro da rota de pedidos'
    })
});


//insere um novo pedido
router.post('/', (req, res, next) => {
    res.status(201).send({
        mensagem: 'Usando POST dentro da rota de pedidos'
    })
});


//retorna um pedido específico
router.get('/:id_pedido', (req, res, next) => {
    const id = req.params.id_pedido

    if(id === 'especial'){
        res.status(200).send({
        mensagem: 'Você descobriu um ID secreto',
        id: id
        })
    }else{
        res.status(200).send({
            mensagem: 'Você passou um ID'
        })
    }
    
});

//Usando o patch para um pedido
router.patch('/', (req, res, next) => {
    res.status(201).send({
        mensagem: 'Usando PATCH dentro da rota de pedidos'
    })
});


//Usando DELETE para todos os pedidos
router.delete('/', (req, res, next) => {
    res.status(201).send({
        mensagem: 'Pedido excluido'
    })
})

module.exports = router;