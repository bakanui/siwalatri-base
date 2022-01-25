import React from 'react'
import CIcon from '@coreui/icons-react'

const _nav =  [
//   {
//     _tag: 'CSidebarNavItem',
//     name: 'Dashboard',
//     to: '/dashboard',
//     icon: <CIcon name="cil-speedometer" customClasses="c-sidebar-nav-icon"/>
//   },
  {
    _tag: 'CSidebarNavDropdown',
    name: 'Laporan',
    route: '/laporan',
    icon: 'cil-excerpt',
    _children: [
        {
          _tag: 'CSidebarNavItem',
          name: 'Harian Operator',
          to: '/harian-operator',
        },
        {
          _tag: 'CSidebarNavItem',
          name: 'Bulanan Operator',
          to: '/bulanan-operator',
        },
        {
          _tag: 'CSidebarNavItem',
          name: 'Laporan Penumpang Harian',
          to: '/laporan-harian-penumpang',
        },
        {
          _tag: 'CSidebarNavItem',
          name: 'Laporan Penumpang Bulanan',
          to: '/laporan-bulanan-penumpang',
        },
    ]
  },
]

export default _nav
