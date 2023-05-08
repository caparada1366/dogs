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

export function searchDog(){
    return {
        type: 'SEARCH_DOG'
    }
}

export function removeDog(name){
    return {
        type: 'REMOVE_DOG',
        payload: name
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

    
export function getPerros(){
    return function(dispatch){
      return axios.get(`http://localhost:3001/dogs`).then(({data})=>{
        dispatch(getAllDogs(data))
      }).catch(err => err.message)
    }
  }