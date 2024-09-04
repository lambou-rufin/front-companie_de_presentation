import api from "../common/api/api";

export const register = () => {
    api.get('${baseURL}/auth/register/').then((data) =>{
        console.log(data);
    }).catch((error) => console.log(error));
// console.log('koto');
}

export const login = () => {
    api.get('${baseURL}/auth/login/').then((response) =>{
        console.log(response);
    }).catch((error) => console.log(error));
// console.log('koto');
}