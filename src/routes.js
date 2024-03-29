import React from 'react';

const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'));
const JadwalEB = React.lazy(() => import('./views/jadwal/Jadwal'));
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
const Approval = React.lazy(() => import('./views/data/Approval'));
const Jadwal = React.lazy(() => import('./views/armada/Jadwal'));
const TotalHarian = React.lazy(() => import('./views/armada/TotalHarian'));
const DetailKeberangkatan = React.lazy(() => import('./views/DetailKeberangkatan'));
const LaporanManifest = React.lazy(() => import('./views/report/LaporanManifest'));
const DetailManifest = React.lazy(() => import('./views/report/DetailManifest'));
const Tiket = React.lazy(() => import('./views/loket/tiket/Tiket'));
const FormTiket = React.lazy(() => import('./views/loket/tiket/FormTiket'));
const FormTiketGroup = React.lazy(() => import('./views/loket/tiket/FormTiketGroup'));
const TiketKeberangkatan = React.lazy(() => import('./views/armada/TiketKeberangkatan'));
const Logout = React.lazy(() => import('./views/pages/Logout'));
const TiketView = React.lazy(() => import('./views/dashboard/TiketView'));
const DetailApproval = React.lazy(() => import('./views/data/DetailApproval'));
const DetailKeberangkatanOperator = React.lazy(() => import('./views/DetailKeberangkatanOperator'));
const ManageAccount = React.lazy(() => import('./views/pages/ManageAccount'));
const Cash = React.lazy(() => import('./views/rekonsiliasi/Cash'));
const VA = React.lazy(() => import('./views/rekonsiliasi/VA'));
const QRIS = React.lazy(() => import('./views/rekonsiliasi/QRIS'));

const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/logout', exact: true, name: 'Out', component: Logout },
  { path: '/dashboard', name: 'Dashboard', component: Dashboard },
  { path: '/laporan-manifest', name: 'Jadwal', component: JadwalEB },
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
  { path: '/approval', name: 'Approval', component: Approval },
  { path: '/jadwal', name: 'Jadwal Keberangkatan', component: Jadwal },
  { path: '/total-harian-operator', name: 'Total Harian Operator', component: TotalHarian },
  { path: '/detail-keberangkatan/:id_keberangkatan/:fil_date', name: 'Detail Keberangkatan', component: DetailKeberangkatan, exact: true },
  { path: '/total-harian-operator/:id_keberangkatan/:fil_date', name: 'Detail Keberangkatan', component: DetailKeberangkatan, exact: true },
  { path: '/total-harian-operator/detail-keberangkatan/:id_keberangkatan/:fil_date', name: 'Detail Keberangkatan', component: DetailKeberangkatan, exact: true },
  { path: '/laporan-manifest', name: 'Laporan Manifest', component: LaporanManifest },
  { path: '/detail-manifest/:id_jadwals/:fil_date', name: 'Detail Manifest', component: DetailManifest, exact: true },
  { path: '/tiket', name: 'Tiket', component: Tiket, exact: true },
  { path: '/tiket/form-tiket/:id_jadwal/:kapasitas_penumpang', name: 'Form Tiket', component: FormTiket, exact: true },
  { path: '/tiket/form-tiket-group/:id_jadwal/:kapasitas_penumpang', name: 'Form Tiket Group', component: FormTiketGroup, exact: true },
  { path: '/tiket-keberangkatan/:id_jadwal', name: 'Daftar Tiket Keberangkatan', component: TiketKeberangkatan, exact: true },
  { path: '/jadwal/tiket-keberangkatan/:id_jadwal', name: 'Daftar Tiket Keberangkatan', component: TiketKeberangkatan, exact: true },
  { path: '/list-jadwal/:id_operator', name: 'List Jadwal', component: TiketView, exact: true  },
  { path: '/detail-approval/:id_jadwal/:total_penumpang/:id_approval', name: 'Detail Approval', component: DetailApproval, exact: true  },
  { path: '/detail-keberangkatan-petugas/:id_keberangkatan/:fil_date', name: 'Detail Keberangkatan Petugas', component: DetailKeberangkatanOperator, exact: true  },
  { path: '/manage-account', name: 'Manage Account', component: ManageAccount, exact: true },
  { path: '/rekonsiliasi/tunai', name: 'Tunai', component: Cash, exact: true },
  { path: '/rekonsiliasi/va', name: 'Virtual Account', component: VA, exact: true },
  { path: '/rekonsiliasi/qris', name: 'QRIS', component: QRIS, exact: true },
];

export default routes;
