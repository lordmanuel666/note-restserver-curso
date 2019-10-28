require('./config/config');

const express = require('express');
const mongoose = require('mongoose');
const app = express();
const bodyParser = require('body-parser')

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(require('./routes/usuario'));

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


// mongoose.connect('mongodb://localhost:27017/Cafe', (err, res) => {

//     useNewUrlParser: true,
//     useUnifiedTopology: true

//     // if (err) throw err;
//     // console.log('BD online');

// });

mongoose.connect(process.env.URLDB, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useUnifiedTopology: true
    },
    (err, res) => {

        if (err) throw err;
        console.log('base de datos online');

    });


app.listen(process.env.PORT, () => {
    //console.log('ecuchando puerto', process.env.PORT);
});