const jwt = require('jsonwebtoken');


// verificar token

let verificaToken = (req, res, next) => {

    let token = req.get('token');

    jwt.verify(token, process.env.SEED, (err, decoded) => {

        if (err) {
            return res.status(401).json({
                ok: false,
                err: {
                    message: 'token no valido'
                }
            })
        }


        req.usuario = decoded.usuario;
        next();

    })

};


let verificaAdmin_Role = (req, res, next) => {
    let user = req.usuario;
    if (user.role === 'ADMIN_ROLE') {
        next();
    } else {
        return res.status(401).json({
            ok: false,
            err: {
                message: 'usuario no valido'
            }
        })
    }



};


module.exports = {
    verificaToken,
    verificaAdmin_Role
}