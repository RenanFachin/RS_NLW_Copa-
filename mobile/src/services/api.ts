import axios from 'axios'

export const api = axios.create({
    // Para ios, o localhost funciona. Já para o android é necessário o ip da máquina
    baseURL: 'http://192.168.1.110:3333'
})