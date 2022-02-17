import axios from "axios";

const API_URL = "localhost:4001";

class AuthService {
  login(username, password) {
    return axios
      .post(API_URL + "signin", {
        username,
        password
      })
      .then(response => {
        if (response.data.accessToken) {
          localStorage.setItem("user", JSON.stringify(response.data));
        }

        return response.data;
      });
  }

  logout() {
    localStorage.removeItem("user");
  }

  /* Módulo para registrar un nuevo usuario */
    register(name, email) {
      return axios.post(API_URL + "/api/users", {
        name,
        email
      });
    }

  // getCurrentUser() {
  //   return JSON.parse(localStorage.getItem('user'));;
  // }
}
