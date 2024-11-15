const baseURL = process.env.REACT_APP_API_ENDPOINT || 'http://localhost:8080';

async function getTutorialList(): Promise<any[]> { // Ajout d'un type de retour
  try {
    const response = await fetch(`${baseURL}api/tutorials/findAll`, {
      method: "GET",
      credentials: "include", // Important pour envoyer les credentials
    });
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();
    return data; // Assurez-vous de retourner les données ici
  } catch (error) {
    console.error("Error fetching tutorials:", error);
    throw error; // Propager l'erreur
  }
}

export default getTutorialList;

