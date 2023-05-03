

importarTemps = function (){      //Funcion para traer todos los temperamentos de la API en forma de array
    
    var temps = [];
    fetch(`https://api.thedogapi.com/v1/breeds?api_key=${API_KEY}`)
    .then(response=> response.json())
    .then(data =>
    {
        data.forEach(breed => {
            if(breed.temperament){
                var auxTemps = breed.temperament.split(",")
                for(let i=0; i<auxTemps.length; i++){
                    if(!temps.includes(auxTemps[i]))temps.push(auxTemps[i]) //se verifica que no esté agregado 
            }
        }
        });
    
        temps.forEach(async t =>{
            await Temperaments.create({name: t})
        })    
    }).catch(error=> console.log(error))
    
}