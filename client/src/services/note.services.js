import {authServices} from './auth.services';

const axios = require('axios');

const API_URL = 'http://localhost:8080/api/';

export const createNote = (note) => axios.post(API_URL+'notes/create',{
    note
},{headers: authServices.loadToken()});

export const getNotes = () => axios.get(API_URL+'notes',{headers: authServices.loadToken()});

export const getNote = (id) => axios.get(API_URL+`note/${id}`,{headers: authServices.loadToken()});

export const deleteNote = (id) => axios.delete(API_URL+`notes/delete/${id}`,{headers: authServices.loadToken()});

export const editNote = (id, note) => axios.put(API_URL+`notes/edit/${id}`,{
    note
},{headers: authServices.loadToken()});

export const changeArchivedState = (id) => axios.put(API_URL+`note/archive/${id}`,{headers:authServices.loadToken()});