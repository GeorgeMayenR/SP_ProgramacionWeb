import logo from "./logo.svg";
import { useEffect, useState } from "react";
import jwt_decode from "jwt-decode";

import "./App.css";

function App() {
  const [user, setUser] = useState({});

  function handleCallbackResponse(response) {
    console.log("Encoded JWT ID token: " + response.credential);
    var userObject = jwt_decode(response.credential);
    console.log(userObject);
    setUser(userObject);
    document.getElementById("signInDiv").hidden = true;
  }

  function handleSignOut(event) {
    setUser({});
    document.getElementById("signInDiv").hidden = false;
  }

  useEffect(() => {
    /*global google*/
    google.accounts.id.initialize({
      /* Copiamos cliente OAuth*/
      client_id:
        "131052844737-a3g54scm0qql87qkkpn3eo0d75r1cltp.apps.googleusercontent.com",
      callback: handleCallbackResponse,
    });
    google.accounts.id.renderButton(document.getElementById("signInDiv"), {
      theme: "outline",
      size: "large",
    });

    google.accounts.id.prompt();
  }, []);


  // Si no tenemos un usuario: boton de inicio de sesion
  //si tenemos un usuarioi: muestre el boton de cerrar sesion
  return (
    <div className="App">
      <div id="signInDiv"></div>
      {Object.keys(user).length != 0 && (
        <button onClick={(e) => handleSignOut(e)}>Sign Out</button>
      )}

      <div id="carnet"></div>
      {Object.keys(user).length != 0 && <h3>0901-19-11383</h3>}

      {user && (
        <div>
          <h3>{user.name}</h3>
          <h3>{user.email}</h3>
          <img src={user.picture}></img>
        </div>
      )}
    </div>
  );
}

export default App;
