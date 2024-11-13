import axios from 'axios';

const API = axios.create({ baseURL: 'http://localhost:5000/api' });

API.interceptors.request.use(req => {
    const token = localStorage.getItem('token');
    if (token) req.headers.Authorization = token;
    return req;
});

export const signup = (data) => API.post('/user/signup', data);
export const login = (data) => API.post('/user/login', data);
export const fetchTasks = () => API.get('/tasks');
export const createTask = (data) => API.post('/tasks', data);
export const updateTask = (id, data) => API.put(`/tasks/${id}`, data);
export const deleteTask = (id) => API.delete(`/tasks/${id}`);
