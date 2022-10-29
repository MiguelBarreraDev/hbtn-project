// import
import axios from "axios";
import { useEffect, useState } from "react";
import jwt_decode from "jwt-decode"
import './login.css'
// import { GoogleOAuthProvider } from '@react-oauth/google';

// import { GoogleLogin } from "@react-oauth/google";
import { GoogleLogin, useGoogleLogin } from 'react-google-login';

export function Login() {

    // const respuestaGoogle=(response)=>{
    //     console.log(response);
    //     console.log(response.profileObj);
    // }
    const [user, setUser ] = useState({});

    function handleCallbackResponse(response) {
        console.log("desde login")
        console.log("Encoded JWS Id tokens" + response.credential);
        var userObj = jwt_decode(response.credential);
        console.log(userObj);
        setUser(userObj);
    }
    useEffect(() => {
        google.accounts.id.initialize({
            client_id: "422076817865-9dbp6oce8lv11muqibebec3lusskrb6t.apps.googleusercontent.com",
            callback: handleCallbackResponse
        });
        // google.accounts.id.renderButton(
        //     document.getElementById("signInDiv"),
        //     { size: "large", class: "mybtn act"}
        // );
        google.accounts.id.prompt();
    }, []);

    // if we have user: sig button. or 
    // if no user: show the log out button.
    return (
        <div className="App">
        <form class="f-login">
    
          <div class="segment tittle">
            <h1>Iniciar Sesion</h1>
          </div>
          <div class="logo">
            <img src="https://holberton.anahuac.mx/wp-content/uploads/Group-359.png"></img>
          </div>
          <GoogleLogin
          clientId="422076817865-9dbp6oce8lv11muqibebec3lusskrb6t.apps.googleusercontent.com"
          render={renderProps =>(
                <button class="red mybtn act" type="button" id="signInDiv" onClick={renderProps.onClick} disabled={renderProps.disabled}>Iniciar con google</button>
            )}
            cookiePolicy={'single_host_origin'}
          />
          {/* <button class="red mybtn act" type="button" id="signInDiv"> Iniciar con google</button> */}
          
          <div class="segment">
            <button class="unit mybtn" type="button"></button>
            <button class="unit mybtn" type="button"></button>
            <button class="unit mybtn" type="button"></button>
          </div>
          
        </form>
        {/* <div id="signInDiv"></div> */}
  
      </div>
    );
}