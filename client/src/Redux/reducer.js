


const initialState = {
    temps: [],
    dogs: [],
    paginaActual: 1,
    dogsAux: [],  
     
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
            var filterTemp = state.dogsAux

            filterTemp = filterTemp.filter((dog)=>dog.temperament?.split(',').includes(payload))
            if(payload === 'default') filterTemp = state.dogsAux;

            return {
                ...state,
                dogs: filterTemp,
                paginaActual: 1
            };
        case 'FILTER_ORIGIN':
            var filtered2 = state.dogsAux;

                if(payload === 'API'){
                    filtered2 = filtered2.filter((dog)=> !isNaN(dog.id))
                }
                if(payload === 'BD'){
                    filtered2 = filtered2.filter((dog)=> isNaN(dog.id))
                }
                 if(payload === 'default') filtered2 = state.dogsAux;
           
            return {
                ...state,
                dogs: filtered2,
                paginaActual: 1  
            };
        case 'SORT_BY_NAME':
            var ordenados =state.dogs;
            if(payload === 'AZ'&& state.dogs){
                ordenados = state.dogs.sort((a, b)=> {
                    if(a.name < b.name) return -1
                    if(a.name > b.name) return 1
                    return 0
                })
            }
            if(payload === 'ZA' && state.dogs){
                ordenados = state.dogs.sort((a, b)=> {
                    if(a.name < b.name) return 1
                    if(a.name > b.name) return -1
                    return 0
                })
            }
            if(payload === 'default') ordenados = state.dogsAux;
            return {
                ...state,
                dogs: ordenados,
                paginaActual: 1  
            };
        case 'SORT_BY_WEIGHT':
            var ordenadosPeso = state.dogs
            if(payload === 'Ascendente'){
                ordenadosPeso = state.dogs.sort((a, b)=> a.peso.split(' - ')[1] - b.peso.split(' - ')[1])
            }
            if (payload === 'Descendente'){
                ordenadosPeso = state.dogs.sort((a, b)=> b.peso.split(' - ')[1] - a.peso.split(' - ')[1])
            }
            if(payload === 'default') ordenadosPeso = state.dogsAux;
            return{
                ...state,
                dogs: ordenadosPeso,
                paginaActual: 1     
            };
        case 'SEARCH_DOG':
            var search = state.dogs;
                search = search.filter((dog)=> dog.name.toLowerCase() === payload.toLowerCase())
                if(search.length ===0) {
                    alert('Raza inexistente')
                    search = state.dogsAux
                }
            return{
                ...state,
                dogs: search
            };
        case 'TODOS':
           
            return{
                ...state,
                dogs: state.dogsAux,
                paginaActual: 1  
            }
        case 'ADD_DOG':

            return {

            };
        case 'GET_ALL_TEMPS':
            return {
                ...state,
                temps: payload,
                }    
        case 'GET_ALL_DOGS':
            return {
                ...state,
                dogs: payload,
                dogsAux: payload,
            }
       
        default:
            return state;
    }
}