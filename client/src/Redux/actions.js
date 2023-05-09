import axios from 'axios'

export function addDog(dog){
    return{
        type: 'ADD_DOG',
        payload: dog
    }
}

export function filterTemp(temperament){
    return{
        type: 'FILTER_TEMP',
        payload: temperament
    }
}

export function filterOrigin(origin){
    return{
        type: 'FILTER_ORIGIN',
        payload: origin
    }
}

export function sortByName(order){
    return{
        type: 'SORT_BY_NAME',
        payload: order
    }
}

export function sortByWeight(order){
    return{
        type: 'SORT_BY_WEIGHT',
        payload: order
    }
}

export function prevPage(){
    return {
        type: 'PREV_PAGE'
    }
}

export function nextPage(){
    return {
        type: 'NEXT_PAGE'
    }
}

export function searchDog(name){
    return {
        type: 'SEARCH_DOG',
        payload: name
    }
}

export function todos(){
    return {
        type: 'TODOS',
    }
}

export function getAllDogs(){
    return (dispatch)=>{
        axios.get(`http://localhost:3001/dogs`).then(({data})=>{
            dispatch({
                type: 'GET_ALL_DOGS',
                payload: data    
            })
        })    
    }
}

export function getAllTemps(){
    return (dispatch)=>{
        axios.get(`http://localhost:3001/temperaments`).then(({data})=>{      
            dispatch({
                type: 'GET_ALL_TEMPS',
                payload: data    
            })
        })    
    }
}
