// import
import { useEffect, useState } from "react";
import jwt_decode from "jwt-decode"
import { GoogleOAuthProvider } from '@react-oauth/google';

export function Login(params) {
  const [user, setUser ] = useState({});

  function handleCallbackResponse(response) {
    console.log("Encoded JWS Id tokens" + response.credencials);
    var userObj = jwt_decode(response.credencials);
    console.log(userObj);
    setUser(userObj);

  }

  useEffect(() => {
    google.accounts.id.initialize({
      client_id: "422076817865-9dbp6oce8lv11muqibebec3lusskrb6t.apps.googleusercontent.com",
      callback: handleCallbackResponse
    });
    google.accounts.id.renderButton(
      document.getElementById("signInDiv"),
      { theme: "outline"}
    );
  }, []);

  return (
    <div className="App">
      <div id="signInDiv"></div>
      { user &&
      <div>
        <img src={user?.picture} alt='bro palo'></img>
        <h3>{user.name}</h3>
      </div>
      }
    </div>
  );
}