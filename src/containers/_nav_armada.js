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
    name: 'Master',
    route: '/master',
    icon: 'cil-notes',
    _children: [
      {
        _tag: 'CSidebarNavItem',
        name: 'Master Kapal',
        to: '/master-kapal-armada',
      },
      {
        _tag: 'CSidebarNavItem',
        name: 'Master Nahkoda',
        to: '/master-nahkoda-armada',
      },
      {
        _tag: 'CSidebarNavItem',
        name: 'Master Loket',
        to: '/master-loket-armada',
      },
    ],
  },
  {
    _tag: 'CSidebarNavItem',
    name: 'Jadwal',
    to: '/jadwal',
    icon: <CIcon name="cil-bullhorn" customClasses="c-sidebar-nav-icon"/>
  },
  {
    _tag: 'CSidebarNavDropdown',
    name: 'Laporan',
    route: '/laporan',
    icon: 'cil-excerpt',
    _children: [
        {
          _tag: 'CSidebarNavItem',
          name: 'Total Harian Operator',
          to: '/total-harian-operator',
        },
        {
          _tag: 'CSidebarNavItem',
          name: 'Manifest',
          to: '/laporan-manifest',
        },
    ]
  },
]

export default _nav_armada
