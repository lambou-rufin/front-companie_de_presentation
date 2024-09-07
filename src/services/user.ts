const baseURL = process.env.REACT_APP_API_ENDPOINT || 'http://localhost:8080';

export async function register() {
    try {
      const response = await fetch(`${baseURL}api/auth/signup`, {
        method: "POST",
        credentials: "include", // Important for sending credentials
      });
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error("Error fetching tutorials:", error);
    }
  }

  export async function login() {
    try {
      const response = await fetch(`${baseURL}api/auth/login`, {
        method: "POST",
        credentials: "include", // Important for sending credentials
      });
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error("Error fetching tutorials:", error);
    }
  }