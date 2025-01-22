const baseURL = process.env.REACT_APP_API_ENDPOINT || 'http://localhost:8080';

async function getTutorialList(): Promise<any[]> { 
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

// Fonction pour supprimer un tuto
export async function deleteTutoriel(id: number) {
  try {
    const response = await fetch(`${baseURL}api/tutorials/deleteTutoriel/${id}`, {
      method: "DELETE",
      credentials: "include",
    });

    if (!response.ok) {
      throw new Error(`Erreur API : ${response.statusText}`);
    }

    return await response.json(); // Optionnel, selon ce que l’API retourne
  } catch (error) {
    console.error("Erreur dans delete tutoriel :", error);
    throw error;
  }
}