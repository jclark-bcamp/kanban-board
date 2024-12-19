import { UserLogin } from "../interfaces/UserLogin";


const login = async (userInfo: UserLogin) => {
    // TODO: make a POST request to the login route
    // and return the response
  try {
    const response = await fetch("/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userInfo),
    });

    if (!response.ok) { 
      throw new Error("Login failed");
    }

    const data = await response.json();
    // Check if the API returned a token

    if (!data.token) { // if no token is returned, throw an error
      throw new Error('No token returned.');
    }

    console.log('Login successful!, token:', data.token);

    return data;
  } catch (error) {
    console.error("User login error:", error);
    return Promise.reject('Could not fetch user info');
  }
};




export { login };
