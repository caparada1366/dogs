import axios from 'axios'


const initialState = {
    dogs: [],
    paginaActual: 1,
   
}


export default function rootReducer(state = initialState, {type, payload}){
    switch (type){
        case 'PREV_PAGE':
            return {
                ...state,
                paginaActual: state.paginaActual -1,
            };
        case 'NEXT_PAGE':
            return {
                ...state,
                paginaActual: state.paginaActual +1,
            };
        case 'FILTER_TEMP':
            const filtered =[];
            state.dogs.forEach((dog)=>{
                var temps = dog.temperament.split(',')
                if(temps.includes(payload)) filtered.push(dog);
            })
            return {
                ...state,
                dogs: filtered
            };
        case 'FILTER_ORIGIN':
            const filtered2 = [];
            state.dogs.forEach((dog)=>{
                if(payload === 'API'){
                    if(isNaN(dog.id))filtered2.push(dog)
                }
                else if(payload === 'BD'){
                    if(!isNaN(dog.id))filtered2.push(dog)
                }
            })
            return {
                ...state,
                dogs: filtered
            };
        case 'SORT_BY_NAME':
            const ordenados =[];
            if(payload = 'AZ'){
                ordenados = state.dogs.sort((a, b)=> a.name.localCompare(b.nombre))
            }else if(payload = 'ZA') ordenados = state.dogs.sort((a,b) => b.name.localCompare(a.name))
            
            return {
                ...state,
                dogs: ordenados
            };
        case 'SORT_BY_WEIGHT':
            const ordenadosPeso = []
            if(payload = 'Ascendente'){
                ordenadosPeso = state.dogs.sort((a, b)=> a.peso.split(' - ')[1] - b.peso.split(' - ')[1])
            }
            else if (payload = 'Descendente'){
                ordenadosPeso = state.dogs.sort((a, b)=> b.peso.split(' - ')[1] - a.peso.split(' - ')[1])
            }
            return{
                ...state,
                dogs: ordenadosPeso     
            };
        case 'SEARCH_DOG':
            return{

            };
        case 'ADD_DOG':
            return {

            };
        case 'REMOVE_DOG':
            const nuevoDogs=[];
            //nuevoDogs = state.dogs.filter((dog)=>{!(dog.name === payload)})
            return{
                ...state,
                dogs: nuevoDogs
            }
        case 'GET_ALL_DOGS':
            return {
                ...state,
                dogs: payload
            }
        default:
            return state;
    }
}