export function decodeToken(token: string) {
    try {
      const base64Url = token.split('.')[1]; // Partie payload du JWT
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      return JSON.parse(atob(base64)); // Décodage Base64
    } catch (error) {
      console.error("Erreur lors du décodage du token :", error);
      return null;
    }
  }
  
  export function getUserFromToken(): { id: string; email: string; role?: string } | null {
    const token = localStorage.getItem("token");
    if (!token) return null;
    return decodeToken(token);
  }
  