import express from 'express'; 
import router from './routes/index.js';
import db from './config/db.js';


const app = express();

//Conectar la BD
db.authenticate()
    .then( () => console.log('Base de Datos conectada'))
    .catch( error => console.log(error));


// Definir puerto
const port = process.env.PORT || 4000; // Variables de entorno

//Habilitar Pug
app.set('view engine', 'pug');

// Obtener el año actual
app.use( (req, res, next) => {
    const year = new Date();

    res.locals.ActualYear = year.getFullYear();
    res.locals.nombresitio = "Agencia de Viajes"
    next()
})

//Agregar body parser para leer los mensajes del formulario
app.use(express.urlencoded({extended: true}))


//Definir la carpeta publica
app.use(express.static('public'));

//Agregar router
app.use('/', router);


app.listen(port, () => {
    console.log(`El servidor esta funcionando en el puerto ${port}`);
})