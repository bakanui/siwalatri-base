import React from 'react'
import CIcon from '@coreui/icons-react'

const _nav =  [
  {
    _tag: 'CSidebarNavItem',
    name: 'Dashboard',
    to: '/dashboard',
    icon: <CIcon name="cil-speedometer" customClasses="c-sidebar-nav-icon"/>
  },
  {
    _tag: 'CSidebarNavDropdown',
    name: 'Master',
    route: '/master',
    icon: 'cil-notes',
    _children: [
      {
        _tag: 'CSidebarNavItem',
        name: 'Master Kapal',
        to: '/master-kapal',
      },
      {
        _tag: 'CSidebarNavItem',
        name: 'Master Penumpang',
        to: '/master-penumpang',
      },
      {
        _tag: 'CSidebarNavItem',
        name: 'Master Rute',
        to: '/master-rute',
      },
      {
        _tag: 'CSidebarNavItem',
        name: 'Master Tujuan Penumpang',
        to: '/master-tujuan-penumpang',
      },
      {
        _tag: 'CSidebarNavItem',
        name: 'Master SOP',
        to: '/master-sop',
      },
    ],
  },
  {
    _tag: 'CSidebarNavDropdown',
    name: 'User',
    route: '/user',
    icon: 'cil-user',
    _children: [
        {
          _tag: 'CSidebarNavItem',
          name: 'User Petugas',
          to: '/user-petugas',
        },
        {
          _tag: 'CSidebarNavItem',
          name: 'User Operator Armada',
          to: '/user-operator',
        }
    ]
  }
]

export default _nav
