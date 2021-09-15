const express = require('express');
const router = express.Router();


//retorna todos os produtos
router.get('/', (req, res, next) => {
    res.status(200).send ({
        mensagem: 'Usando o GET dentro da rota de produtos'
    })
});


//insere um novo produto
router.post('/', (req, res, next) => {
    const produto = {
        nome: req.body.nome,
        preco: req.body.preco
    }
    res.status(201).send({
        mensagem: 'Produto criado com sucesso',
        produtoCriado: produto
    })
});


//retorna um produto específico
router.get('/:id_produto', (req, res, next) => {
    const id = req.params.id_produto

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

//Usando o patch para um produto
router.patch('/', (req, res, next) => {
    res.status(201).send({
        mensagem: 'Usando PATCH dentro da rota de produtos'
    })
});


//Usando DELETE para todos os pedidos
router.delete('/', (req, res, next) => {
    res.status(201).send({
        mensagem: 'Usando o DELETE para todos os pedidos'
    })
})

module.exports = router;