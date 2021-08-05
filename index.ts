import express, { Application, json, urlencoded } from 'express';
import cors from 'cors';
import morgan from 'morgan';

// DB
import sequelize from './DB/conexion';
// Rutas
import ruta  from './rutas/usuario';

const app: Application = express();

// DB
sequelize

app.use(morgan('dev'))
app.use(cors());
app.use(json());
app.use(urlencoded({extended:false, limit: 100000000}));
app.use('/', ruta);

try {
    app.listen(3000, () => console.log('⚡️server on port 3000⚡️'));
} catch (err) {
    console.log('ocurrio un error', err);
}