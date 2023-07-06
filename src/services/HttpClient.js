import axios from 'axios';
import store from '../store/index';

const config = {
  baseURL: 'http://terminologist.ru:4567'
}

const httpClient = axios.create(config);

httpClient.defaults.withCredentials = true;

httpClient.interceptors.response.use(
    undefined,
    error => {
      if (error.response.status === 403) {
        store.dispatch('Session/setIsSignedIn', false);
      }
      return Promise.reject(error)
    }
);

export default httpClient;