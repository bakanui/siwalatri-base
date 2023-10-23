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
        name: 'Master Dermaga',
        to: '/master-dermaga',
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
    name: 'Data',
    // route: '/data',
    icon: 'cil-excerpt',
    _children: [
        {
          _tag: 'CSidebarNavItem',
          name: 'Approval',
          to: '/approval',
        }
    ]
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
  },
  {
    _tag: 'CSidebarNavItem',
    name: 'Pengumuman',
    to: '/pengumuman',
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
          name: 'Harian Operator',
          to: '/harian-operator',
        },
        {
          _tag: 'CSidebarNavItem',
          name: 'Bulanan Operator',
          to: '/bulanan-operator',
        },
        // {
        //   _tag: 'CSidebarNavItem',
        //   name: 'Manifest',
        //   to: '/laporan-manifest',
        // },
        {
          _tag: 'CSidebarNavItem',
          name: 'Penumpang Harian',
          to: '/laporan-harian-penumpang',
        },
        {
          _tag: 'CSidebarNavItem',
          name: 'Penumpang Bulanan',
          to: '/laporan-bulanan-penumpang',
        },
        {
          _tag: 'CSidebarNavItem',
          name: 'Manifest',
          to: '/laporan-manifest',
        },
    ]
  },
  {
    _tag: 'CSidebarNavItem',
    name: 'Rekonsiliasi',
    to: '/rekonsiliasi',
    icon: 'cil-excerpt'
  },
]

export default _nav
