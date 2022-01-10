import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
  CCreateElement,
  CSidebar,
  CSidebarBrand,
  CSidebarNav,
  CSidebarNavDivider,
  CSidebarNavTitle,
  CSidebarMinimizer,
  CSidebarNavDropdown,
  CSidebarNavItem,
} from '@coreui/react'

// import CIcon from '@coreui/icons-react'
import logos from './../assets/logo.png';
// sidebar nav config
import navigation from './_nav'
import wisata_navigation from './_nav_wisata'
import syahbandar_navigation from './_nav_syahbandar'

import useToken from '../useToken';

const TheSidebar = () => {
  const dispatch = useDispatch()
  const show = useSelector(state => state.sidebarShow)
  const { type } = useToken()

  function menuSelect (type){
    if(type === 'wisata'){
      return(
        <CCreateElement
          items={wisata_navigation}
          components={{
            CSidebarNavDivider,
            CSidebarNavDropdown,
            CSidebarNavItem,
            CSidebarNavTitle
          }}
        />
      )
    }else if(type === 'admin'){
      return(
        <CCreateElement
          items={navigation}
          components={{
            CSidebarNavDivider,
            CSidebarNavDropdown,
            CSidebarNavItem,
            CSidebarNavTitle
          }}
        />
      )
    }else if(type === 'syahbandar'){
      return(
        <CCreateElement
          items={syahbandar_navigation}
          components={{
            CSidebarNavDivider,
            CSidebarNavDropdown,
            CSidebarNavItem,
            CSidebarNavTitle
          }}
        />
      )
    }
  }
  return (
    <CSidebar
      show={show}
      onShowChange={(val) => dispatch({type: 'set', sidebarShow: val })}
    >
      <CSidebarBrand className="d-md-down-none" to="/" style={{padding:'1rem 3.2rem'}}>
        <img alt="SIWALATRI" src={logos} style={{width:'100%',height:'auto'}}/>
      </CSidebarBrand>
      <CSidebarNav>
        {menuSelect(type)}
      </CSidebarNav>
      <CSidebarMinimizer className="c-d-md-down-none"/>
    </CSidebar>
  )
}

export default React.memo(TheSidebar)
