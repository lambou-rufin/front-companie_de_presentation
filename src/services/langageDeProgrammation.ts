const baseURL = process.env.REACT_APP_API_ENDPOINT || 'http://localhost:8080';

async function getLangageDeProgrammation() {
  try {
    const response = await fetch(`${baseURL}api/langageDeProgrammations/`, {
      method: "GET",
      credentials: "include", // Important for sending credentials
    });
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.error("Error fetching langage de programmation", error);
  }
}

export default getLangageDeProgrammation;

