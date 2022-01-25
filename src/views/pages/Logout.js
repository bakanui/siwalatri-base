
import React,{ useEffect, useState }  from 'react'
import {
  CBadge,
  CDropdown,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
  CImg
} from '@coreui/react'
import CIcon from '@coreui/icons-react'

const Logout = () => {

  const out = () => {
    localStorage.removeItem('access_token')
    window.location.reload()
  }

  useEffect(() => {
    out()
    // eslint-disable-next-line
  }, [])


  return (
        <></>
  )
}

export default Logout
