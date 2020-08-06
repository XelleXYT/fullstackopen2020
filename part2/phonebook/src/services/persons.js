import axios from 'axios'
const baseUrl = 'http://localhost:3001/persons'

const getPersons = () => {
    const request = axios.get(baseUrl)
    return request.then(response => response.data)
}

const createPerson = newObject => {
    const request = axios.post(baseUrl, newObject)
    return request.then(response => response.data)
}  

const deletePerson = oldObject => {
    const request = axios.delete(`${baseUrl}/${oldObject.id}`)
    return request.then(response => response.data)
}

const updatePerson = updatedObject => {
    const request = axios.put(`${baseUrl}/${updatedObject.id}`, updatedObject)
    return request.then(response => response.data)
}

export default { getPersons, createPerson, deletePerson, updatePerson }