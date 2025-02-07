const baseURL = process.env.REACT_APP_API_ENDPOINT || 'http://localhost:8080';

// Fonction pour récupérer la liste des tutoriels
export async function getTutorialList(): Promise<any[]> { 
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

// Fonction pour présenter un tutoriel
export async function presentTutorial(tutorialData: any) {
  try {
    // Envoi de la requête API
    const response = await fetch(`${baseURL}api/tutorials/present`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include", // Assurez-vous que l'authentification est incluse si nécessaire
      body: JSON.stringify(tutorialData), // Envoyer les données du tutoriel (y compris le statut)
    });

    // Vérifier si la réponse est OK
    if (!response.ok) {
      // Si la réponse est une erreur, vérifiez si c'est une erreur de statut spécifique
      const errorData = await response.json();
      throw new Error(
        `Erreur API : ${response.status} - ${errorData.message || response.statusText}`
      );
    }

    // Si tout se passe bien, retourner les données du tutoriel créé
    return await response.json();
  } catch (error) {
    console.error("Erreur dans la présentation du tutoriel :", error);
    // Si une erreur se produit, renvoyer un message d'erreur générique
    throw new Error("Une erreur est survenue lors de la présentation du tutoriel.");
  }
}

