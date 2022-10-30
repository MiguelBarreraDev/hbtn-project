// import
import { useEffect, useLayoutEffect } from "react";
import { useNavigate } from "react-router-dom";
import './login.css'
import { useAuth } from "@/hooks";
import { GoogleOAuthProvider } from '@react-oauth/google';
import { GoogleLogin, useGoogleLogin } from 'react-google-login';
export function Login() {
  const navigate = useNavigate()
  const { login, isLogged, loading } = useAuth()

  useEffect(() => {
    isLogged && navigate('/')
  }, [isLogged])

  async function handleCallbackResponse(response) {
    const token = response.credential;
    await login({ token })
  }

  useLayoutEffect(() => {
    google.accounts.id.initialize({
      client_id: "your_client_id",
      callback: handleCallbackResponse
    });
    google.accounts.id.renderButton(
      document.getElementById("signInDiv"),
      { theme: "outline", width: 283 }
    );
  }, []);

  return (
    <div className="App">
      <form className="f-login">

        <div className="segment tittle">
          <h1>Iniciar Sesion</h1>
        </div>
        <div className="logo1">
          <img src="https://holberton.anahuac.mx/wp-content/uploads/Group-359.png"></img>
        </div>
        <div id="signInDiv"></div>
        {/* <GoogleLogin
        clientId=" "
        render={renderProps =>(
              <button className="red mybtn act" type="button" id="signInDiv" onClick={renderProps.onClick} disabled={renderProps.disabled}>Iniciar con google</button>
          )}
          cookiePolicy={'single_host_origin'}
        onSuccess={handleCallbackResponse}
        /> */}
        {/* <button className="red mybtn act" type="button" id="signInDiv"> Iniciar con google</button> */}
        
        <div className="segment">
          <button className="unit mybtn" type="button"></button>
          <button className="unit mybtn" type="button"></button>
          <button className="unit mybtn" type="button"></button>
        </div>
        
      </form>

  </div>
  );
}
