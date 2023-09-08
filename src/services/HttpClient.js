import axios from 'axios';
import store from '../store/index';
import settings from '../settings';

const config = {
  baseURL: settings.hostname
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