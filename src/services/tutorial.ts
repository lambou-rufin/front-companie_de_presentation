import api from "../common/api/api";

export const getTutorial = () => {
  api.get('${baseURL}/tutorials')
    .then((response) => {
      console.log(response);
    })
    .catch((error) => console.log(error));
  // console.log("koto");
};
