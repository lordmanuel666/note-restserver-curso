require('./config/config');
const express = require('express');
const app = express();
const bodyParser = require('body-parser')

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.get('/', function(req, res) {
    res.json('Hello World!')
})

app.post('/usuarios', function(req, res) {
    let body = req.body;

    if (body.nombre === undefined) {
        res.status(400).json({
            ok: false,
            mensaje: 'el nombre es necesario'
        })
    } else {
        res.json({
            body
        })
    }

})

app.put('/usuarios/:id', function(req, res) {
    let id = req.params.id;
    res.json({
        id
    });
})

app.delete('/usuarios', function(req, res) {
    res.json('Hello delete!')
})

app.listen(process.env.PORT, () => {
    console.log('ecuchando puerto', process.env.PORT);
});