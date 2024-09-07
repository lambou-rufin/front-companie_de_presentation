const baseURL = process.env.REACT_APP_API_ENDPOINT || 'http://localhost:8080';
export async function register(username: string, email: string, password: string) {
  try {
    const response = await fetch(`${baseURL}api/auth/signup`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ username, email, password }),
      credentials: "include", // Important for sending credentials
    });
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.error("Error registering user:", error);
  }
}

interface LoginResponse {
  token: string; // Assurez-vous que la réponse du serveur contient un champ 'token'
}

export async function login(email: string, password: string): Promise<LoginResponse> {
  try {
    const response = await fetch(`${baseURL}api/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include", // Important pour envoyer les informations d'identification
      body: JSON.stringify({ email, password }), // Inclure les informations d'identification dans le corps de la requête
    });

    if (!response.ok) {
      const errorResponse = await response.json();
      throw new Error(errorResponse.message || `HTTP error! Status: ${response.status}`);
    }

    const data: LoginResponse = await response.json();
    return data; // Retourner les données de la réponse
  } catch (error) {
    // Lancer l'erreur pour que le composant appelant puisse la gérer
    throw new Error("Échec de la connexion. Veuillez vérifier vos identifiants et réessayer.");
  }
}

export async function clearToken(): Promise<void> {
  return new Promise((resolve) => {
    localStorage.removeItem('token'); // Supprimer le token du localStorage
    resolve();
  });
}
