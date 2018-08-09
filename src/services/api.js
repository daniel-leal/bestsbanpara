import axios from 'axios';

import { AsyncStorage } from 'react-native';

const api = axios.create({
  baseURL: 'https://api.cartolafc.globo.com/',
});

api.interceptors.request.use(async (config) => {
  try {
    const token = await AsyncStorage.getItem('@BestsBanpara:token');

    if (token) {
      config.headers['x-glb-token'] = token;
    }

    return config;
  } catch (err) {
    alert(err);
  }
});

const apiAuth = axios.create({
  baseURL: 'https://login.globo.com/',
});

export {api, apiAuth};
