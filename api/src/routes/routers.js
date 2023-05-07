const axios =require('axios') 
const { API_KEY } = process.env; 
const {Dog, Temperaments} = require("../db")

async function getDogs(req, res){
    const {name} = req.query;
    if(name){                                                     //Hacemos la busqueda si recibimos nombre por query
        try{  
        const listDogs = await Dog.findAll({where: {name: name}});  //Buscamos en la DB
        if(listDogs.length < 0) return res.status(200).json(listDogs);
        else{
            axios.get(`https://api.thedogapi.com/v1/breeds?api_key=${API_KEY}`) //Buscamos en la API
            .then(response=> {
                const datos = response.data
                const aux = datos.find(dog => {
                   return dog.name.toLowerCase() === name.toLowerCase()});  //Le quitamos el case sensitive 
                   if(aux){
                   const perro = {
                        id: aux.id,
                        name: aux.name,
                        image: aux.image.url,
                        altura: aux.height.metric,
                        peso: aux.weight.metric,
                        anos_Vida: aux.life_span,
                        temperament: aux.temperament
                    }
                    return res.status(200).json(perro);
                }else{
                    return res.status(404).send(`el nombre ${name} no fue encontrado`)
                }
                
            })   
        }
        }catch(err){

        }
    }
    else {                              //Aqui se ejecuta la busqueda de todas las razas porque no se recibe query
    try{     
        var listDogs;
        listDogs = await Dog.findAll();     //Traemos los de la DB  
    }catch(err){
        return res.status(404).send(err.message)
    }
    axios.get(`https://api.thedogapi.com/v1/breeds?api_key=${API_KEY}`) //Traemos los de la API
    .then(response=> {
        const dogs =[];
        const datos = response.data;
        datos.forEach(dog=>{
            const perro = {
                id: dog.id,
                name: dog.name,
                image: dog.image.url,
                altura: dog.height.metric,
                peso: dog.weight.metric,
                anos_Vida: dog.life_span,
                temperament: dog.temperament
            }
            dogs.push(perro);
        })

        res.status(200).json(dogs.concat(listDogs))
    }).catch(err => {
        res.status(404).send(err.message)
    })
    }  
}

//Funcion para la busqueda por ID
async function getDogById(req,res){
     var id = req.params.idRaza;
     id = Number(id);
   try{
        if(isNaN(id)){
            const resp = await Dog.findByPk(id)
            if(resp){
                res.status(200).json(resp);
            }else{
                res.status(404).send(`La raza con id ${id}no existe en la db`)
            }
        }else{
            await axios.get(`https://api.thedogapi.com/v1/breeds?api_key=${API_KEY}`)
            .then(response=> {
                const datos = response.data
                const aux = datos.find(dog => {
                   return dog.id === id});
                if(aux){
                    const perro = {
                        id: aux.id,
                        name: aux.name,
                        image: aux.image.url,
                        altura: aux.height.metric,
                        peso: aux.weight.metric,
                        anos_Vida: aux.life_span,
                        temperament: aux.temperament
                    }
                    return res.status(200).json(perro);
                }else {
                    return res.status(404).send(`La raza con id ${id}no existe`)
                }    
            })
        } 
        
   } catch(err){
    res.status(404).send(err.message)
   }
 
 }

 async function getDogByName(req,res){
    const name = req.query.name;
    try{    
        if(name){
            const name = req.query.name;
            const listDogs = await Dog.findAll({where: {name: name}});
            if(listDogs.length === 0) return res.status(404).send(`el nombre ${name} no fue encontrado`)
            return res.status(200).json(listDogs);
        }
    }   catch(err){
        return res.status(404).send(err.message)
        }
 }

 async function createDog(req, res){
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
 }

 async function getTemperaments(req, res){
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
    try{
        var listTemps;
        listTemps = await Temperaments.findAll();
        return res.status(200).json(listTemps);
    }catch(err){
        return res.status(404).send(err.message)
    }     
 }


module.exports ={
    getDogs,
    getDogById,
    getDogByName,
    createDog,
    getTemperaments
}