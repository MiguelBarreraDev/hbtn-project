// import
import { useEffect, useState } from "react";
import jwt_decode from "jwt-decode"
import { GoogleOAuthProvider } from '@react-oauth/google';
import {useUser} from "@/context/user.context";
import {useNavigate} from "react-router-dom";
import axios from "axios";
import './login.css'
import { useAuth } from "@/hooks";

const API_URL = 'http://localhost:5000'

export function Login() {
  const navigate = useNavigate()
  const { user, setUser } = useUser()
  const { login } = useAuth()
  
  useEffect(() => {
    if (user) {
      setUser(null)
      window.localStorage.removeItem('user')
    }
  }, [])

  async function handleCallbackResponse(response) {
    // const token = response.credential;
    //await login({token})
    // setUser(userObj)
    // navigate('/students')
    // Validar el correro (holberton)

    // Validar con nuestro backend
    axios.post(`${API_URL}/login`,{
      data: {
        token: token
      }
    })
      .then(response => {
        setUser(response.data)
        window.localStorage.setItem('user', JSON.stringify(response.data))
        navigate('/students')
      })
      .catch(err => console.log('err:', err))
  }

  useEffect(() => {
    console.log("Holaaa")
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
      <form>
  <div class="segment">
    <h1>Iniciar Sesiòn</h1>
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
