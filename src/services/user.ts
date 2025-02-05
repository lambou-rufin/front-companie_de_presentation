import {
  ForgotpassResponse,
  IForgotPassword,
  LoginResponse,
} from "../utils/inteface/interface";

const baseURL = process.env.REACT_APP_API_ENDPOINT || "http://localhost:8080";
export async function register(
  name: string,
  email: string,
  password: string,
  base64Image: string | null
) {
  try {
    // Créer une instance de FormData
    const formData = new FormData();

    // Ajouter les champs de données au FormData
    formData.append("name", name);
    formData.append("email", email);
    formData.append("password", password);

    // Ajouter l'image si elle existe
    if (base64Image) {
      // Vous pouvez également transformer Base64 en Blob si le serveur attend un fichier
      const imageBlob = base64ToBlob(base64Image);
      formData.append("image", imageBlob, "image.jpg"); // Assurez-vous de nommer le fichier
    }

    const response = await fetch(`${baseURL}api/auth/signup`, {
      method: "POST",
      body: formData,
      credentials: "include", // Inclure les cookies
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    console.log("User registered successfully:", data);
  } catch (error) {
    console.error("Error registering user:", error);
  }
}

// Utilitaire pour convertir une chaîne Base64 en Blob
function base64ToBlob(base64: string): Blob {
  const byteString = atob(base64.split(",")[1]); // Décoder Base64 (après la virgule)
  const mimeString = base64.split(",")[0].split(":")[1].split(";")[0]; // Extraire le type MIME

  const byteNumbers = new Array(byteString.length);
  for (let i = 0; i < byteString.length; i++) {
    byteNumbers[i] = byteString.charCodeAt(i);
  }
  const byteArray = new Uint8Array(byteNumbers);

  return new Blob([byteArray], { type: mimeString });
}

// interface LoginResponse {
//   token: string; // Assurez-vous que la réponse du serveur contient un champ 'token'
// }

export async function login(
  email: string,
  password: string
): Promise<LoginResponse> {
  try {
    const response = await fetch(`${baseURL}api/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include", // Important pour envoyer les informations d'identification
      body: JSON.stringify({ email, password }), // Inclure les informations d'identification dans le corps de la requête
    });

    // Vérifiez si la réponse est OK
    if (!response.ok) {
      const errorResponse = await response.json();
      throw new Error(
        errorResponse.message || `HTTP error! Status: ${response.status}`
      );
    }

    // Assurez-vous que les données correspondent à LoginResponse
    const data: LoginResponse = await response.json();

    // Vérifiez que 'user' existe et a les propriétés attendues
    if (!data.user) {
      throw new Error("User information is missing in the response.");
    }

    return data; // Retourner les données de la réponse
  } catch (error) {
    // Lancer l'erreur pour que le composant appelant puisse la gérer
    throw new Error(
      "Échec de la connexion. Veuillez vérifier vos identifiants et réessayer."
    );
  }
}

export async function clearToken(): Promise<void> {
  return new Promise((resolve) => {
    localStorage.removeItem("token"); // Supprimer le token du localStorage
    resolve();
  });
}

export async function forgotPass(email: string): Promise<ForgotpassResponse> {
  try {
    const response = await fetch(`${baseURL}api/users/forgotPassword`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include", // Important pour envoyer les informations d'identification
      body: JSON.stringify({ email }), // Inclure les informations d'identification dans le corps de la requête
    });

    if (!response.ok) {
      const errorResponse = await response.json();
      throw new Error(
        errorResponse.message || `HTTP error! Status: ${response.status}`
      );
    }

    const data: ForgotpassResponse = await response.json();
    return data; // Retourner les données de la réponse
  } catch (error) {
    // Lancer l'erreur pour que le composant appelant puisse la gérer
    throw new Error(
      "Échec de la connexion. Veuillez vérifier vos identifiants et réessayer."
    );
  }
}

export async function updateProfile(
  name: string,
  email: string,
  phoneNumber: string,
  password?: string,
  base64Image?: string
) {
  try {
    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("phoneNumber", phoneNumber);
    
    if (password) {
      formData.append("password", password);
    }

    if (base64Image) {
      const imageBlob = base64ToBlob(base64Image);
      formData.append("image", imageBlob, "image.jpg");
    }

    const response = await fetch(`${baseURL}api/auth/updateProfile`, {
      method: "PUT",
      body: formData,
      credentials: "include",
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || `HTTP error! Status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Erreur lors de la mise à jour du profil :", error);
    throw error; // Permet au composant qui appelle cette fonction de gérer l'erreur
  }
}

