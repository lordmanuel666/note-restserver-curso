//puerto
process.env.PORT = process.env.PORT || 3000;

//entorno
process.env.NODE_ENV = process.env.NODE_ENV || 'dev';

//base
let urlDB;

//vencimiento token
// 60 segundos, 60 minutos, 24 horas, 30 dias
process.env.CADUCIDAD_TOKEN = 60 * 60 * 24 * 30;

//SEED de autenticacion
process.env.SEED = process.env.SEED || 'secret';


if (process.env.NODE_ENV === 'dev') {
    urlDB = 'mongodb://localhost:27017/Cafe';
} else {
    urlDB = 'mongodb+srv://batusay:doj7gi37G96hLpMl@cluster0-bztdu.mongodb.net/cafe';
}

process.env.URLDB = urlDB;