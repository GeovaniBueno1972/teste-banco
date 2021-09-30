const mysql = require('../mysql').pool;

exports.getProduto = (req, res, next) => {
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
};

exports.postProduto = (req, res, next) => {
    
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
};

exports.getUmProduto = (req, res, next) => {
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
};

exports.patchProduto = (req, res, next) => {
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
};

exports.deleteUmProduto = (req, res, next) => {
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
};