const baseURL = process.env.REACT_APP_API_ENDPOINT || 'http://localhost:8080';

async function getPersonneList() {
  try {
    const response = await fetch(`${baseURL}api/personnes/getPersonnes`, {
        method: "GET",
        credentials: "include", // Important for sending credentials
      });
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.error("Error fetching persones:", error);
  }
}

export default getPersonneList;

