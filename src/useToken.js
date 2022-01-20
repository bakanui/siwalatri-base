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

  const getId = () => {
    if(type === 'armada'){
      if(localStorage.getItem('access_token')){
        const tokenString = localStorage.getItem('access_token');
        const userToken = JSON.parse(tokenString);
        return userToken?.armada.id_armada
      }
    }else{
      if(localStorage.getItem('access_token')){
        const tokenString = localStorage.getItem('access_token');
        const userToken = JSON.parse(tokenString);
        return userToken?.user.id
      }
    }
    
  };

  const getIdArmada = () => {
    if(type === 'loket'){
      if(localStorage.getItem('access_token')){
        const tokenString = localStorage.getItem('access_token');
        const userToken = JSON.parse(tokenString);
        return userToken?.loket.id_armada
      }
    }
  }

  const [token, setToken] = useState(getToken());
  const [email, setEmail] = useState(getEmail());
  const [type, setType] = useState(getType())
  const [id, setId] = useState(getId())
  const [id_armada, setIdArmada] = useState(getIdArmada())

  const saveToken = userToken => {
    localStorage.setItem('access_token', JSON.stringify(userToken));
    setToken(userToken.token);
    setEmail(userToken.user.email)
    setType(userToken.user.type)
    setId(userToken.user.id)
    if(type === 'loket'){
      setIdArmada(userToken.loket.id_armada)
    }
  };

  return {
    setToken: saveToken,
    token,
    email,
    type,
    id,
    id_armada
  }
}