import { create } from 'apisauce';

const api = create({
    baseURL: 'https://aplicativo.vulto.site',
    headers: 'content-type: application/x-www-form-urlencoded;charset=utf-8'
});

let configApp = {
    token: '',
    statusLogin: false,
    userData: null,
}

export default api;