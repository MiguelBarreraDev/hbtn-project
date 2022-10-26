// import
import { useEffect, useState } from "react";
import jwt_decode from "jwt-decode"
import { GoogleOAuthProvider } from '@react-oauth/google';
import {useUser} from "@/context/user.context";
import {useNavigate} from "react-router-dom";

const API_URL = 'http://localhost:5000'

export function Login() {
  const navigate = useNavigate()
  const { user, setUser } = useUser()
  
  useEffect(() => {
    if (user) {
      setUser(null)
      window.localStorage.removeItem('user')
    }
  }, [])

  function handleCallbackResponse(response) {
    var userObj = jwt_decode(response.credential);
    window.localStorage.setItem('user', userObj)
    setUser(userObj)
    navigate('/students')
    // Validar el correro (holberton)

    // Validar con nuestro backend
    // axios.post(`${API_URL}/login`,{
    //   data: {
    //     email: userObj?.email
    //   }
    // })
    //   .then(response => {
    //     setUser(userObj)
    //     navigate('/students')
    //   })
    //   .catch(err => console.log('err:', err))
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
      <div id="signInDiv"></div>
    </div>
  );
}
