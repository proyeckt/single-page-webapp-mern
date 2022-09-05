const axios = require('axios');

const API_URL = 'http://localhost:8080/api/users/';

export const createUser = (user) => axios.post(API_URL+'create',{
    user
});

export const loginUser = (email,password) => axios.post(API_URL+'login',{
    email,password
});

export const logoutUser = () => axios.post(API_URL+'logout');

export const getUsers = () => axios.get(API_URL);

export const getUserById = (id) => axios.get(API_URL+`${id}`);