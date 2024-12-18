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

// Nouvelle fonction pour ajouter une personne
export async function addPersonne(person: any) {
  try {
    console.log('Sending person data:', person);  // Vérifiez l'objet envoyé

    const response = await fetch(`${baseURL}api/personnes/createPers`, {
      method: 'POST',
      credentials: 'include',  // Important pour envoyer les informations d'identification
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(person), // Envoi des données sous forme de JSON
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();  // Vérifiez la réponse
    console.log('Response data:', data);  // Afficher la réponse du serveur
    return data;  // Assurez-vous de retourner les données si nécessaire
  } catch (error) {
    console.error('Error adding personne:', error);
    throw error;  // Lancez l'erreur pour qu'elle soit gérée dans le composant
  }
}


// Fonction pour supprimer une personne
export async function deletePersonne(pers_id: string) {
  try {
    const response = await fetch(`${baseURL}api/personnes/deletePersonne/${pers_id}`, {
      method: "DELETE",
      credentials: "include",
    });

    if (!response.ok) {
      throw new Error(`Erreur API : ${response.statusText}`);
    }

    return await response.json(); // Optionnel, selon ce que l’API retourne
  } catch (error) {
    console.error("Erreur dans deletePersonne :", error);
    throw error;
  }
}




