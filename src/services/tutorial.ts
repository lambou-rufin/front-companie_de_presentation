const baseURL = process.env.REACT_APP_API_ENDPOINT || 'http://localhost:8080';

// Fonction pour récupérer la liste des tutoriels
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

// Fonction pour créer un tutoriel
export async function createTutorial(tutorialData: any) {
  try {
    const response = await fetch(`${baseURL}api/tutorials/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json", // Spécifie que les données envoyées sont en JSON
      },
      credentials: "include", // Pour envoyer les credentials
      body: JSON.stringify(tutorialData), // Convertit les données du tutoriel en JSON
    });

    if (!response.ok) {
      throw new Error(`Erreur API : ${response.statusText}`);
    }

    return await response.json(); // Retourner la réponse JSON, si elle existe
  } catch (error) {
    console.error("Erreur dans la création du tutoriel :", error);
    throw error; // Propager l'erreur
  }
}

// Fonction pour supprimer un tutoriel
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

export default getTutorialList;
