import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = (newToken) => {
  token = `bearer ${newToken}`
}

const getConfig = () => {
  return { headers: { Authorization: token }}
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const getById = async (id) => {
  const response = await axios.get(`${baseUrl}/${id}`)
  return response.data
}

const create = async (newObj) => {
  const response = await axios.post(baseUrl, newObj, getConfig())
  return response.data
}

const update = async (id, newObj) => {
 
  const response = await axios.put(`${baseUrl}/${id}`, newObj, getConfig())
  return response.data
}

const deleteBlog = async (id) => {
  const response = await axios.delete(`${baseUrl}/${id}`, getConfig())
  return response.data
}

export default { getAll, create, setToken, update, getById, deleteBlog }