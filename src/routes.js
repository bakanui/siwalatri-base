import React from 'react';

const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'));
const MasterKapal = React.lazy(() => import('./views/master/MasterKapal'));
const MasterPenumpang = React.lazy(() => import('./views/master/MasterPenumpang'));
const MasterRute = React.lazy(() => import('./views/master/MasterRute'));
const MasterTujuan = React.lazy(() => import('./views/master/MasterTujuan'));
const MasterSOP = React.lazy(() => import('./views/master/MasterSOP'));
const Operator = React.lazy(() => import('./views/user/Operator'));
const Petugas = React.lazy(() => import('./views/user/Petugas'));

const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/dashboard', name: 'Dashboard', component: Dashboard },
  { path: '/master-kapal', name: 'Master Kapal', component: MasterKapal },
  { path: '/master-penumpang', name: 'Master Penumpang', component: MasterPenumpang },
  { path: '/master-rute', name: 'Master Rute', component: MasterRute },
  { path: '/master-tujuan-penumpang', name: 'Master Tujuan Penumpang', component: MasterTujuan },
  { path: '/master-sop', name: 'Master SOP', component: MasterSOP },
  { path: '/user-operator', name: 'User Operator', component: Operator },
  { path: '/user-petugas', name: 'User Petugas', component: Petugas }

];

export default routes;
