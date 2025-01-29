import { ILanguage } from "utils/inteface/interface";

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


export async function createLangageDeProgrammation(langageData: ILanguage) {
  try {
    const response = await fetch(`${baseURL}api/langageDeProgrammations/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(langageData),
      credentials: "include", // Important pour envoyer les informations d'identification
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    console.log('Langage de programmation créé:', data);
    return data; // Retourne les données créées
  } catch (error) {
    console.error("Erreur lors de la création du langage de programmation", error);
    throw new Error("Erreur lors de la création du langage de programmation"); // Lancer l'erreur pour gestion dans le composant
  }
}


