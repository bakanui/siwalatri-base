import React from 'react';

const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'));
const MasterKapal = React.lazy(() => import('./views/master/MasterKapal'));
const MasterPenumpang = React.lazy(() => import('./views/master/MasterPenumpang'));
const MasterDermaga = React.lazy(() => import('./views/master/MasterDermaga'));
const MasterRute = React.lazy(() => import('./views/master/MasterRute'));
const MasterTujuan = React.lazy(() => import('./views/master/MasterTujuan'));
const MasterSOP = React.lazy(() => import('./views/master/MasterSOP'));
const Operator = React.lazy(() => import('./views/user/Operator'));
const Petugas = React.lazy(() => import('./views/user/Petugas'));
const Pengumuman = React.lazy(() => import('./views/Pengumuman'));
const HarianOperator = React.lazy(() => import('./views/report/HarianOperator'));
const BulananOpetor = React.lazy(() => import('./views/report/BulananOperator'));
const PenumpangHarian = React.lazy(() => import('./views/report/PenumpangHarian'));
const PenumpangBulanan = React.lazy(() => import('./views/report/PenumpangBulanan'));
const Wisata = React.lazy(() => import('./views/wisata/Wisata'));
const MasterKapalArmada = React.lazy(() => import('./views/armada/MasterKapalArmada'));
const MasterNahkodaArmada = React.lazy(() => import('./views/armada/MasterNahkodaArmada'));
const MasterLoket = React.lazy(() => import('./views/armada/MasterLoket'));

const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/dashboard', name: 'Dashboard', component: Dashboard },
  { path: '/master-kapal', name: 'Master Kapal', component: MasterKapal },
  { path: '/master-penumpang', name: 'Master Penumpang', component: MasterPenumpang },
  { path: '/master-dermaga', name: 'Master Dermaga', component: MasterDermaga },
  { path: '/master-rute', name: 'Master Rute', component: MasterRute },
  { path: '/master-tujuan-penumpang', name: 'Master Tujuan Penumpang', component: MasterTujuan },
  { path: '/master-sop', name: 'Master SOP', component: MasterSOP },
  { path: '/user-operator', name: 'User Operator', component: Operator },
  { path: '/user-petugas', name: 'User Petugas', component: Petugas },
  { path: '/pengumuman', name: 'Pengumuman', component: Pengumuman },
  { path: '/harian-operator', name: 'Harian Operator', component: HarianOperator },
  { path: '/bulanan-operator', name: 'Bulanan Operator', component: BulananOpetor },
  { path: '/laporan-harian-penumpang', name: 'Laporan Harian Penumpang', component: PenumpangHarian },
  { path: '/laporan-bulanan-penumpang', name: 'Laporan Bulanan Penumpang', component: PenumpangBulanan },
  { path: '/wisata', name: 'Wisata', component: Wisata },
  { path: '/master-kapal-armada', name: 'Master Kapal Armada', component: MasterKapalArmada },
  { path: '/master-nahkoda-armada', name: 'Master Nahkoda Armada', component: MasterNahkodaArmada },
  { path: '/master-loket-armada', name: 'Master Loket Armada', component: MasterLoket },

];

export default routes;
