import axios from 'axios';
import AuthContext from '../Context/AuthProvider';


export default axios.create({
    baseURL: 'http://localhost:9191'
});
/*const api = axios.create({
    baseURL: "http://localhost:9191/api/v1",
  });*/
/*api.interceptors.response.use(
    
    (response) => response,
    (error) => {
      if (error.response && error.response.status === 401) {
        logoutUser()
      }
      return Promise.reject(error);
    }
  );*/
export const axiosPrivate = axios.create({
    baseURL: 'http://localhost:9191'
});