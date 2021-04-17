import axios from 'axios'
const baseUrl = 'http://localhost:3001/persons';

const getAll = () => {
    const request = axios.get(baseUrl)
    return request.then(res => res.data)
}

const create = (newObj) => {
    const request = axios.post(baseUrl, newObj)
    return request.then(res => res.data)
}

const update = (id, newObj) => {
    return axios.put(`${baseUrl}/${id}`, newObj)
}

const personServices = { getAll, create, update}

export default personServices