import React from 'react'
import CIcon from '@coreui/icons-react'

const _nav_armada =  [
  {
    _tag: 'CSidebarNavItem',
    name: 'Dashboard',
    to: '/dashboard',
    icon: <CIcon name="cil-speedometer" customClasses="c-sidebar-nav-icon"/>
  },
  {
    _tag: 'CSidebarNavDropdown',
    name: 'Penumpang',
    route: '/penumpang',
    icon: 'cil-notes',
    _children: [
      {
        _tag: 'CSidebarNavItem',
        name: 'Tiket',
        to: '/tiket',
      },
      {
        _tag: 'CSidebarNavItem',
        name: 'Total Harian Operator',
        to: '/total-harian-operator',
      },
    ],
  },
]

export default _nav_armada
