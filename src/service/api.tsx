import { create } from 'apisauce';

const api = create({
 baseURL: 'http://api.juadelivery.site',
   // baseURL: 'http://10.0.0.110/api',
    // headers: 'content-type: application/x-www-form-urlencoded;charset=utf-8'
});

let configApp = {
    token: '',
    statusLogin: false,
    userData: null,
}

export default api;