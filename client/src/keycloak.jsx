import Keycloak from 'keycloak-js';
import axios from 'axios'; // Assurez-vous que axios est importé

let initOptions = {
  url: 'http://localhost:8080/',
  realm: 'myrealm',
  clientId: 'react-client',
};

let keycloak = new Keycloak(initOptions);

const initKeycloak = async () => {
  try {
    const auth = await keycloak.init({
      onLoad: 'login-required',
      checkLoginIframe: true,
      pkceMethod: 'S256',
    });

    if (!auth) {
      window.location.reload();
    } else {
      console.info("Authenticated");
      console.log('auth', auth);
      console.log('Keycloak', keycloak);
      console.log('Access Token', keycloak.token);

      axios.defaults.headers.common['Authorization'] = `Bearer ${keycloak.token}`;

      keycloak.onTokenExpired = () => {
        console.log('token expired');
        // Vous pouvez également gérer ici le renouvellement du token si nécessaire
      };
    }
  } catch (error) {
    console.error("Authentication Failed", error);
    // Gérer l'erreur d'authentification
  }
}

initKeycloak();

export default keycloak;
