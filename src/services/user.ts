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


// src/services/authService.ts
export async function login(email: string, password: string): Promise<void> {
  try {
    const response = await fetch(`${baseURL}api/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include", // Important for sending credentials
      body: JSON.stringify({ email, password }), // Include the credentials in the request body
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    console.log(data);
  } catch (error) {
    throw new Error("Failed to login. Please check your credentials and try again.");
  }
}
