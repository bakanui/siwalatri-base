import { useState } from 'react';

export default function useToken() {
  const getToken = () => {
    if(localStorage.getItem('access_token')){
      const tokenString = localStorage.getItem('access_token');
      const userToken = JSON.parse(tokenString);
      return userToken?.access_token
    }
    
  };

  const getEmail = () => {
    if(localStorage.getItem('access_token')){
      const tokenString = localStorage.getItem('access_token');
      const userToken = JSON.parse(tokenString);
      return userToken?.user.email
    }
    
  };

  const getName = () => {
    if(localStorage.getItem('access_token')){
      const tokenString = localStorage.getItem('access_token');
      const userToken = JSON.parse(tokenString);
      return userToken?.user.admin.name
    }
    
  };

  const getId = () => {
    if(localStorage.getItem('access_token')){
      const tokenString = localStorage.getItem('access_token');
      const userToken = JSON.parse(tokenString);
      return userToken?.user.id
    }
    
  };

  const [token, setToken] = useState(getToken());
  const [email, setEmail] = useState(getEmail());
  const [name, setName] = useState(getName())
  const [id, setId] = useState(getId())

  const saveToken = userToken => {
    localStorage.setItem('access_token', JSON.stringify(userToken));
    setToken(userToken.access_token);
    setEmail(userToken.user.email)
    setName(userToken.user.admin.name)
    setId(userToken.user.id)
  };

  return {
    setToken: saveToken,
    token,
    email,
    name,
    id
  }
}