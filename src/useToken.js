import { useState } from 'react';

export default function useToken() {
  const getToken = () => {
    if(localStorage.getItem('access_token')){
      const tokenString = localStorage.getItem('access_token');
      const userToken = JSON.parse(tokenString);
      return userToken?.token
    }
    
  };

  const getEmail = () => {
    if(localStorage.getItem('access_token')){
      const tokenString = localStorage.getItem('access_token');
      const userToken = JSON.parse(tokenString);
      return userToken?.user.email
    }
    
  };

  const getType = () => {
    if(localStorage.getItem('access_token')){
      const tokenString = localStorage.getItem('access_token');
      const userToken = JSON.parse(tokenString);
      return userToken?.user.type
    }
    
  };

//   const getId = () => {
//     if(localStorage.getItem('access_token')){
//       const tokenString = localStorage.getItem('access_token');
//       const userToken = JSON.parse(tokenString);
//       return userToken?.user.id
//     }
    
//   };

  const [token, setToken] = useState(getToken());
  const [email, setEmail] = useState(getEmail());
  const [type, setType] = useState(getType())
//   const [id, setId] = useState(getId())

  const saveToken = userToken => {
    localStorage.setItem('access_token', JSON.stringify(userToken));
    setToken(userToken.token);
    setEmail(userToken.user.email)
    setType(userToken.user.type)
  };

  return {
    setToken: saveToken,
    token,
    email,
    type,
    // id
  }
}