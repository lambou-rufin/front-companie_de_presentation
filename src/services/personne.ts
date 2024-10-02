const baseURL = process.env.REACT_APP_API_ENDPOINT || 'http://localhost:8080';

async function getPersonneList() {
  try {
    const response = await fetch(`${baseURL}api/personnes/getPersonnes`, {
      method: "GET",
      credentials: "include", // Important pour envoyer les informations d'identification
    });
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();
    console.log(data);
    return data; // Assurez-vous de retourner les données
  } catch (error) {
    console.error("Error fetching personnes:", error);
    throw error; // Lancez l'erreur pour qu'elle soit gérée dans le composant
  }
}

export default getPersonneList;


