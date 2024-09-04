import api from "../common/api/api";

export const getLangageDeProgrammation = () => {
    api.get('${baseURL}/langageDeProgrammations').then((response) =>{
        console.log(response);
    }).catch((error) => console.log(error));
// console.log('koto');
}