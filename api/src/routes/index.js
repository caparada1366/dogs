const { Router } = require('express');

// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const {Dog, Temperaments} = require("../db")
require('dotenv').config();
const { API_KEY } = process.env; //trae la KEY para hacer el request a la API

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

//Obtiene detalle de una raza especifica pedida por nombre en caso de no recibir nombre por query 
//obtiene un arreglo de objetos, donde cada objeto es la raza de un perro
router.get('/dogs',async(req, res)=>{                                                                                           
    try{    
    if(req.query.name){
        const name = req.query.name;
        const listDogs = await Dog.findAll({where: {name: name}});
        if(listDogs.length === 0) return res.status(404).send(`el nombre ${name} no fue encontrado`)
        return res.status(200).json(listDogs);
    }
    else{
    var listDogs;
    listDogs = await Dog.findAll();
    return res.status(200).json(listDogs);
    }
}catch(err){
    return res.status(404).send(err.message)
}
})

router.get('/dogs/:idRaza', async(req, res)=>{ //Obtiene detalle de una raza especifica pedida por ID
   try{
    const id = req.params.idRaza;
        const dog = await Dog.findByPk(id)
        if(!dog) return res.status(404).send(`el id ${id} no fue encontrado`)
        return res.status(200).json(dog)
   }catch(err){
    return res.status(404).send(err.message)
   }    
})


router.post('/dogs', async(req, res)=>{
    const {name, image, altura, peso, anos_Vida} = req.body;
    if(!name || !image || !altura || !peso || !anos_Vida){
        return res.status(404).send('Faltan datos obligatorios')
    }
    try{
        const newDog = await Dog.create({name, image, altura, peso, anos_Vida});
        return res.status(201).json(newDog);
    }catch(err){
        return res.status(404).send('Error en alguno de los datos')
    }
})

router.get('/temperaments', async(req, res)=>{
    try{
        var listTemps;
        listTemps = await Temperaments.findAll();
        return res.status(200).json(listTemps);
    }catch(err){
        return res.status(404).send(err.message)
    }     
})

//Funcion para traer todos los temperamentos de la API en forma de array y guardarlos en la base de datos

importarTemps = function (){      
    var temps = [];
    fetch(`https://api.thedogapi.com/v1/breeds?api_key=${API_KEY}`)
    .then(response=> response.json())
    .then(data =>
    {
        data.forEach(breed => {
            if(breed.temperament){
                var auxTemps = breed.temperament.split(",")
                for(let i=0; i<auxTemps.length; i++){
                    if(!temps.includes(auxTemps[i]))temps.push(auxTemps[i]) //se verifica que no se repita
            }
        }
        });
       
        temps.forEach(async t =>{
            await Temperaments.create({name: t})
        })    
    }).catch(error=> console.log(error))
    
}
//Ejecucion de la función para agregar los Temperaments a la BD
importarTemps();




module.exports = router;
