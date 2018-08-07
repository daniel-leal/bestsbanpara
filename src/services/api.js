import axios from 'axios';

const api = axios.create({
  baseURL: 'https://api.cartolafc.globo.com/',
});

const apiAuth = axios.create({
  baseURL: 'https://login.globo.com/',
});

export {api, apiAuth};
