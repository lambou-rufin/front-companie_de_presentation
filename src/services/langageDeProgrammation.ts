const baseURL = process.env.REACT_APP_API_ENDPOINT || 'http://localhost:8080';

async function getLangageDeProgrammationList() {
  try {
    const response = await fetch(`${baseURL}api/langageDeProgrammations`, {
      method: "GET",
      credentials: "include", // Important for sending credentials
    });
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();
    console.log(data);
    return data; // Retourne les données ici
  } catch (error) {
    console.error("Error fetching langage de programmation", error);
    return []; // Retourne un tableau vide en cas d'erreur pour éviter des erreurs de type
  }
}

export default getLangageDeProgrammationList;
