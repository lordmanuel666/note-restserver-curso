const express = require('express');
const bcrypt = require('bcrypt');
const _ = require('underscore');
const app = express();

const Usuario = require('../models/usuarios');
const { verificaToken, verificaAdmin_Role } = require('../middlewares/authentication');


app.get('/usuarios', verificaToken, function(req, res) {

    let desde = req.query.desde || 0;
    desde = Number(desde);

    let limite = req.query.limite || 5;
    limite = Number(limite);

    Usuario.find({ estado: true })
        .skip(desde) //salto de datos a partir del registro 5
        .limit(limite) //limite de muestra de datos
        .exec((err, Usuarios) => {
            if (err) {
                return res.status(400).json({
                    ok: false.password,
                    err
                });
            }

            Usuario.count({ estado: true }, (err, conteo) => {
                    res.json({
                        ok: true,
                        cantidad: conteo,
                        Usuarios
                    })

                })
                //let conteo = Usuario.length({});

            // Usuario.length({}, (err, conteo) => {

            //     res.json({
            //         ok: true,
            //         cantidad: conteo,
            //         Usuario
            //     })

            // });
            //let conteno = Usuario.count({});

            // res.json({
            //     ok: true,

            //     Usuarios
            // })

        })


})

app.post('/usuarios', [verificaToken, verificaAdmin_Role], function(req, res) {
    let body = req.body;

    let usuario = new Usuario({
        nombre: body.nombre,
        email: body.email,
        password: bcrypt.hashSync(body.password, 10),
        role: body.role
    });

    usuario.save((err, usuarioDB) => {
        if (err) {
            return res.status(400).json({
                ok: false.password,
                err
            });
        }

        res.json({
            ok: true,
            usuario: usuarioDB
        })

    });

    // if (body.nombre === undefined) {
    //     res.status(400).json({
    //         ok: false,
    //         mensaje: 'el nombre es necesario'
    //     })
    // } else {
    //     res.json({
    //         body
    //     })
    // }

})

app.put('/usuarios/:id', [verificaToken, verificaAdmin_Role], function(req, res) {
    let id = req.params.id;
    let body = _.pick(req.body, ['nombre', 'email', 'role', 'estado']);

    Usuario.findByIdAndUpdate(id, body, { new: true, runValidators: true }, (err, usuarioDB) => {

        if (err) {
            return res.status(400).json({
                ok: false.password,
                err
            });
        }



        res.json({
            ok: true,
            usuario: usuarioDB
        });

    });


})

app.delete('/usuarios/:id', [verificaToken, verificaAdmin_Role], function(req, res) {

    let id = req.params.id;
    // Usuario.findByIdAndRemove(id, (err, usuarioBorrado) => {

    //     if (err) {
    //         return res.status(400).json({
    //             ok: false,
    //             err
    //         });
    //     }

    //     if (usuarioBorrado == null) {
    //         return res.status(400).json({
    //             ok: false,
    //             error: {
    //                 message: 'Usuario no encontrado'
    //             }
    //         });
    //     }

    //     res.json({
    //         ok: true,
    //         usuario: usuarioBorrado
    //     });

    // })



    let cambioEstado = {
        estado: false
    };
    //let body = _.pick(req.body, ['nombre', 'email', 'role', 'estado']);

    Usuario.findByIdAndUpdate(id, cambioEstado, { new: true }, (err, usuarioBorrado) => {

        if (Usuario.estado === false) {
            return res.status(200).json({
                ok: false,
                err: 'Usuario borrado'
            })
        }


        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        if (usuarioBorrado === null) {
            return res.status(400).json({
                ok: false,
                error: {
                    message: 'Usuario no encontrado'
                }
            });
        }

        res.json({
            ok: true,
            usuario: usuarioBorrado.nombre,
            message: 'Usuario borrado'
        });

    });


})

module.exports = app;