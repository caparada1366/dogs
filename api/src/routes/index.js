const { Router } = require('express');
const {getDogs, getDogById, createDog, getTemperaments} = require('./routers');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const {Dog, Temperaments} = require("../db")
require('dotenv').config();
const { API_KEY } = process.env; //trae la KEY para hacer el request a la API

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

//Obtiene detalle de una raza especifica pedida por nombre en caso de no recibir nombre por query 
//obtiene un arreglo de objetos, donde cada objeto es la raza de un perro GET | /dogs
//En caso de recibir nombre por Query devuelve la raza buscada
router.get('/dogs',getDogs);

//Obtiene detalle de una raza especifica pedida por ID GET | /dogs/:idRaza
router.get('/dogs/:idRaza', getDogById)

// Crea un nuevo perro en la base de datos
router.post('/dogs', createDog)

//Obtiene todos los temperamentos de la base de datos
router.get('/temperaments', getTemperaments)




module.exports = router;
