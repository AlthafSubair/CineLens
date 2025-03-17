import axios from 'axios'


const api = axios.create({
  baseURL: `${import.meta.env.VITE_SERVER_API}/api`
 
})

export const googleAuth = (code: string) => api.get(`/auth/google?code=${code}`)