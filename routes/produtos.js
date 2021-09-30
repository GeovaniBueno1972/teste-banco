const express = require('express');
const router = express.Router();
const mysql = require('../mysql').pool;
const login = request('../middleware/login');


//retorna todos os produtos
router.get('/', (req, res, next) => {
    mysql.getConnection((error, conn) => {
        if (error){return res.status(500).send({error: error})}
        conn.query(
            'SELECT * FROM produtos;',
            (error, resultado, fields) => {
                if (error){return res.status(500).send({error: error})}
                return res.status(200).send({response: resultado})
            }
        )
    })
});


//insere um novo produto
router.post('/', login, (req, res, next) => {
    
    mysql.getConnection((error, conn) => {
        if (error){return res.status(500).send({error: error})}
        conn.query(
            'INSERT INTO produtos (nome, preco) VALUES (?,?)',
            [req.body.nome, req.body.preco],
            (error, resultado, field) => {
                conn.release();
                if (error){return res.status(500).send({error: error})}
                res.status(201).send({
                    mensagem: 'Produto inserido com sucesso',
                    id_produto: resultado.insertId
                })

            }
        )
    })

    
});


//retorna um produto específico
router.get('/:id_produto', (req, res, next) => {
    const id = req.params.id_produto

    mysql.getConnection((error, conn) => {
        if (error){return res.status(500).send({error: error})}
        conn.query(
            'SELECT * FROM produtos WHERE id_produtos = ?;',
            [req.params.id_produto],
            (error, resultado, fields) => {
                conn.release();
                if (error){return res.status(500).send({error: error})}
                return res.status(200).send({response: resultado})
            }
        )
    })
    
});

//Usando o patch para um produto
router.patch('/', (req, res, next) => {
    mysql.getConnection((error, conn) => {
        if(error){return res.status(500).send({error: error})}
        conn.query(
            `UPDATE produtos
                SET nome        = ?,
                    preco       = ?
            WHERE id_produtos   = ?`,
            [
                req.body.nome,
                req.body.preco,
                req.body.id_produtos
            ],
            (error, resultado, fields) => {
                conn.release();
                if(error){return res.status(500).send({error: error})}
                res.status(202).send({
                    mensagem: 'Produto alterado com sucesso'
                })
            }
        )
    })
});


//Usando DELETE para todos os pedidos
router.delete('/:id_produto', (req, res, next) => {
    const id = req.params.id_produto

    mysql.getConnection((error, conn) => {
        if (error){return res.status(500).send({error: error})}
        conn.query(
            'DELETE FROM produtos WHERE id_produtos = ?;',
            [req.params.id_produto],
            (error, resultado, fields) => {
                conn.release();
                if (error){return res.status(500).send({error: error})}
                return res.status(202).send({
                    mensagem: 'Produto excluido com sucesso'
                })
            }
        )
    })
})

module.exports = router;