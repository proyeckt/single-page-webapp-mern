const axios = require('axios');

const API_URL = 'http://localhost:8080/api/';

export const createTag = (tag) => axios.post(API_URL+'tags/create',{tag});

export const getTags = () => axios.get(API_URL+'tags');

export const getTag = (id) => axios.get(API_URL+`tag/${id}`);

export const deleteTag = (id) => axios.delete(API_URL+`tags/delete/${id}`);

export const editTag = (id, tag) => axios.put(API_URL+`tags/edit/${id}`,{tag});