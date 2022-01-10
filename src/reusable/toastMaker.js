import { useState } from 'react'


export default function ToastMaker() {

  const [toasts, setToasts] = useState([])

  const position = 'top-right'
  const autohide = true
  const autohideValue = 5000
  const closeButton = true
  const fade = true

  const addToast = () => {
    setToasts([
      ...toasts, 
      { position, autohide: autohide && autohideValue, closeButton, fade }
    ])
  }

  const toasters = (()=>{
    return toasts.reduce((toasters, toast) => {
      toasters[toast.position] = toasters[toast.position] || []
      toasters[toast.position].push(toast)
      return toasters
    }, {})
  })()

  return {
      toasters,
      addToast
  }
}
