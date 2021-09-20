const express = require('express');
const router = express.Router();
const mysql = require('../mysql').pool;
const bcrypt = require('bcrypt');

router.post('/cadastro', (req, res, next) => {
    mysql.getConnection((error, conn) => {
        if(error) { return res.status(500).send({error: error})}
        conn.query('SELECT * FROM usuarios WHERE nome = ?', [req.body.nome], (error, results) => {
            if(error){return res.status(500).send({error: error}) }
            if(results.length > 0){
                res.status(409).send({
                    mensagem: 'Usuário já cadastrado'
                })
            } else{
                bcrypt.hash(req.body.senha, 10, (errBecrypt, hash) => {
                    if (errBecrypt) {return res.status(500).send({error: errBecrypt})}
                    conn.query('INSERT INTO usuarios (nome, senha) VALUES (?, ?)', 
                    [req.body.nome, hash],
                    (error, results) => {
                        conn.release();
                        if(error){return res.status(500).send({error: error}) }
                        response = {mensagem: 'Usuario criado com sucesso',
                                    usuarioCriado: {
                                            id_usuario: results.insertId,
                                            nome: req.body.nome
                                            }
                                    }
                        return res.status(201).send({ response})
                    })
                })
            }
        })   
           
    })
        
})

router.post('/login', (req, res, next) => {
    mysql.getConnection((error, conn) => {
        if(error) {return res.status(500).send({error: error}) }
        const query = 'SELECT * FROM usuarios WHERE nome = ?';
        conn.query(query, [req.body.nome], (error, results, fields) => {
            conn.release();
            if(error){return res.status(500).send({error: error}) }
            if(results.length < 1) {
                return res.status(401).send({ mensagem: 'Falha na autenticação'})
            }
            bcrypt.compare(req.body.senha, results[0].senha, (err, result) => {
                if(err){
                    return res.status(401).send({ mensagem: 'Falha na autenticação'})
                }
                if(result){
                    return res.status(200).send({ mensagem: 'Autenticado com sucesso'})
                }
                return res.status(401).send({ mensagem: 'Falha na autenticação'})
            })
        });
    });
})

module.exports = router;