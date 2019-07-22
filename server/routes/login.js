const express = require('express');

const bcrypt = require('bcrypt');

const jwt = require('jsonwebtoken');

const Usuario = require('../models/usuario');

const { verificaToken } = require('../middlewares/autenticacion');

const app = express();


app.post('/login', (req, res) => {


    let body = req.body;

    Usuario.findOne({ email: body.email }, (err, usuarioDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }
        if (!usuarioDB) {

            return res.status(400).json({
                ok: false,
                err: {
                    message: 'Usuario o password incorrecto'
                }
            });

        }

        if (!bcrypt.compareSync(body.password, usuarioDB.password)) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'password incorrecto'
                }
            });
        }

        let token = jwt.sign({
            usuario: usuarioDB
        }, process.env.SEED, { expiresIn: process.env.CADUCIDAD_TOKEN });

        res.json({
            ok: true,
            usuario: usuarioDB,
            token
        });
    })

});

app.get('/get', (req, res) => {

    res.json({
        ok: true
    });


})



module.exports = app;