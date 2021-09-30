const express = require('express');
const router = express.Router();
const mysql = require('../mysql').pool;

//retorna todos os pedidos
router.get('/', (req, res, next) => {
    mysql.getConnection((error, conn) => {
        if (error){return res.status(500).send({error: error})}
        conn.query(`SELECT  pedidos.id_pedidos,
                            pedidos.quantidade,
                            produtos.nome,
                            produtos.preco
                      FROM  pedidos 
                INNER JOIN  produtos 
                        ON  produtos.id_produtos = pedidos.id_produtos`,
            (error, resultado, fields) => {
                conn.release();
                if (error){return res.status(500).send({error: error})}
                return res.status(200).send({response: resultado})
            }
        )
    })
});


//insere um novo pedido
router.post('/', (req, res, next) => {
    mysql.getConnection((error, conn) => {
        if (error){return res.status(500).send({error: error})}
            conn.query('SELECT * FROM produtos WHERE id_produtos = ?', [req.body.id_produtos],
            (error, result, fields) => {
                if (error){return res.status(500).send({error: error})}
                if (result.length === 0){ 
                    return res.status(404).send({ mensagem: 'Produto não encontrado'})
                }
            conn.query('INSERT INTO pedidos (id_produtos, quantidade) VALUES (?,?)',
                        [req.body.id_produtos, req.body.quantidade],
            (error, resultado, field) => {
                    conn.release();
                    if (error){return res.status(500).send({error: error})}
                        res.status(201).send({
                            mensagem: 'Pedido inserido com sucesso',
                            id_produto: resultado.insertId
                        })
                    }
            )      
        })
    });
});


//retorna um pedido específico
router.get('/:id_pedido', (req, res, next) => {
    const id = req.params.id_pedido

    mysql.getConnection((error, conn) => {
        if (error){return res.status(500).send({error: error})}
        conn.query(
            'SELECT * FROM pedidos WHERE id_pedidos = ?;',
            [req.params.id_pedido],
            (error, resultado, fields) => {
                conn.release();
                if (error){return res.status(500).send({error: error})}
                return res.status(200).send({response: resultado})
            }
        )
    })
});

//Usando o patch para um pedido
router.patch('/', (req, res, next) => {
    mysql.getConnection((error, conn) => {
        if(error){return res.status(500).send({error: error})}
        conn.query(
            `UPDATE pedidos
                SET id_produtos = ?,
                    quantidade  = ?
            WHERE id_pedidos    = ?`,
            [
                req.body.id_produtos,
                req.body.quantidade,
                req.body.id_pedidos
            ],
            (error, resultado, fields) => {
                conn.release();
                if(error){return res.status(500).send({error: error})}
                res.status(202).send({
                    mensagem: 'Pedido alterado com sucesso'
                })
            }
        )
    })
});


//Usando DELETE para todos os pedidos
router.delete('/:id_pedidos', (req, res, next) => {
    const id = req.params.id_pedidos

    mysql.getConnection((error, conn) => {
        if (error){return res.status(500).send({error: error})}
        conn.query(
            'DELETE FROM pedidos WHERE id_pedidos = ?;',
            [req.params.id_pedidos],
            (error, resultado, fields) => {
                conn.release();
                if (error){return res.status(500).send({error: error})}
                return res.status(202).send({
                    mensagem: 'Pedido excluido com sucesso'
                })
            }
        )
    })
})

module.exports = router;