// import
import axios from "axios";
import { useEffect, useState } from "react";
import jwt_decode from "jwt-decode"
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
            { size: "large"}
        );
        google.accounts.id.prompt();
    }, []);

    // if we have user: sig button. or 
    // if no user: show the log out button.
    return (
        <div className="App">
            <GoogleLogin
            client_id = "422076817865-9dbp6oce8lv11muqibebec3lusskrb6t.apps.googleusercontent.com"
            buttontex = "Login"
            />

            <div id="signInDiv"></div>
            { user &&
                <div>
                    {/* <img src={user.picture}></img> */}
                    <h3>{user.name}</h3>
                </div>
            }
        </div>
    );
}