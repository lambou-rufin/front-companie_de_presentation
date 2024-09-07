// import api from "../common/api/api";

// export const getTutorial = () => {
//   api.get('${baseURL}/tutorials')
//     .then((response) => {
//       console.log(response);
//     })
//     .catch((error) => console.log(error));
//   // console.log("koto");
// };
const baseURL = process.env.REACT_APP_API_ENDPOINT || 'http://localhost:8080';

async function getTutorial() {
  try {
    const response = await fetch(`${baseURL}api/tutorials`, {
      method: "GET",
      credentials: "include", // Important for sending credentials
    });
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.error("Error fetching tutorials:", error);
  }
}

export default getTutorial;

