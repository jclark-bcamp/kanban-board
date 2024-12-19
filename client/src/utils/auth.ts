import { JwtPayload, jwtDecode } from 'jwt-decode';

class AuthService {
  getProfile() {
    // return the decoded token
    try {
      const token = this.getToken(); // Method to fetch the token from storage
      if (!token) throw new Error('No token found');
      return jwtDecode(token); // Decode the token
    } catch (error) {
      console.error('Error decoding token:', error);
      return null; // Return null if decoding fails
    }
  }

  loggedIn() {
    // return a value that indicates if the user is logged in
    const token = this.getToken();
    return !!token && !this.isTokenExpired(token);
  }
  
  // isTokenExpired(token: string) {
  //   return a value that indicates if the token is expired
  //   try {
  //     const payload = jwtDecode<JwtPayload>(token);
  //     return payload.exp < Date.now() / 1000;
  //   } catch (error) {
  //     console.error('Error decoding token:', error);
  //     return true;
  //   }
  // }
  isTokenExpired(token: string) {
    try {
      const decoded: JwtPayload = jwtDecode<JwtPayload>(token);
      if (decoded.exp) {
        const currentTime = Date.now() / 1000; 
        return decoded.exp < currentTime;
      }
      return false; 
    } catch (error) {
      console.error("Error decoding token:", error);
      return true;
    }
  }

  getToken(): string {
    // TODO: return the token
    return localStorage.getItem('id_token') || '';
  }

  login(idToken: string) {
    // TODO: set the token to localStorage
    localStorage.setItem('id_token', idToken); // Save token to localStorage
  }

  logout() {
    localStorage.removeItem('id_token'); // Remove token from storage
  }
}

export default new AuthService();
