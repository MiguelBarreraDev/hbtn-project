// import
import { useEffect, useLayoutEffect } from "react";
import { useNavigate } from "react-router-dom";
import './login.css'
import { useAuth } from "@/hooks";

export function Login() {
  const navigate = useNavigate()
  const { login, isLogged } = useAuth()

  useEffect(() => {
    // isLogged && navigate('/')
  }, [])

  async function handleCallbackResponse(response) {
    const token = response.credential;
    const loginResponse = await login({ token })
    if (!loginResponse.error) navigate('/')
  }

  useLayoutEffect(() => {
    google.accounts.id.initialize({
      client_id: "422076817865-9dbp6oce8lv11muqibebec3lusskrb6t.apps.googleusercontent.com",
      callback: handleCallbackResponse
    });
    google.accounts.id.renderButton(
      document.getElementById("signInDiv"),
      { theme: "outline", width: 300 }
    );
  }, []);

  return (
    <div className="App">
      <form>
        <div className="segment">
          <h1>Iniciar Sesión</h1>
        </div>
        <div id="signInDiv"></div>
        {/* <button class="red" type="button" className="login"><i class="icon ion-md-lock"></i></button> */}

        {/* <div class="segment">
    <button class="unit" type="button"><i class="icon ion-md-arrow-back"></i></button>
    <button class="unit" type="button"><i class="icon ion-md-bookmark"></i></button>
    <button class="unit" type="button"><i class="icon ion-md-settings"></i></button>
  </div> */}

      </form>
    </div>
  );
}
