import api from "../common/api/api";

export const getPersonne = () => {
    api.get('${baseURL}/personnes').then((data) =>{
        console.log(data);
    }).catch((error) => console.log(error));
// console.log('koto');
}