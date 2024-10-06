import { UserLogin } from "../interfaces/UserLogin";

const login = async (userInfo: UserLogin) => {
  // TODO: make a POST request to the login route - Done
  try {
    const response = await fetch('/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userInfo),
    });
    if (!response.ok) {
      const errorData = await response.json(); //parse error response as JSON
      throw new Error(`Error: ${errorData.message}`);
    }
    const data = await response.json();  //pars the response body as JSON 
    return data;  //return the data received from the server

    } catch (err) {
      console.log('Error from data retrieval:', err);
      return [];
    }

 
}

export { login };
