// import
import { useEffect, useLayoutEffect } from "react";
import { useNavigate } from "react-router-dom";
import './login.css'
import { useAuth } from "@/hooks";

export function Login() {
  const navigate = useNavigate()
  const { login, isLogged, loading } = useAuth()

  useEffect(() => {
    // isLogged && navigate('/')
  }, [])

  async function handleCallbackResponse(response) {
    const token = response.credential;
    await login({ token })
  }

  useLayoutEffect(() => {
    google.accounts.id.initialize({
      client_id: "422076817865-9dbp6oce8lv11muqibebec3lusskrb6t.apps.googleusercontent.com",
      // render:(renderProps =>{
      //   <button onClick={renderProps.onClick} disabled={renderProps.disabled}>Inicia session</button>
      // }),
      callback: handleCallbackResponse
    });
    google.accounts.id.renderButton(
      document.getElementById("signInDiv"),
      { theme: "outline", width: 300 }
    );
  }, []);

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
