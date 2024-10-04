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
export async function addPersonne(person:any) {
  try {
    const response = await fetch(`${baseURL}api/personnes`, {
      method: "POST",
      credentials: "include", // Important pour envoyer les informations d'identification
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(person), // Conversion de l'objet en chaîne JSON
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    
    const data = await response.json(); // Optionnel, en fonction de ce que votre API retourne
    return data; // Assurez-vous de retourner les données si nécessaire
  } catch (error) {
    console.error("Error adding personne:", error);
    throw error; // Lancez l'erreur pour qu'elle soit gérée dans le composant
  }
}

