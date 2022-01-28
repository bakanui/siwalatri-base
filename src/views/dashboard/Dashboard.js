import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  CBadge,
  CCard,
  CDataTable,
  CRow,
  CModal, 
  CModalHeader, 
  CModalTitle, 
  CModalBody, 
  CModalFooter, 
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import useToken from '../../../src/useToken';
import { apiUrl } from './../../reusable/constants'
import Penumpangs from './../../components/Penumpangs'
import { MapLocation } from 'src/reusable/MapLocation';
import warningIcon from '../../assets/img/warning.png';
import { ref, onValue } from "firebase/database";
import database from 'src/firebase_init';

const Dashboard = () => {
  const postArmada = [
    {
      "id_armada": 1,
      "id_user": "",
      "nama_armada": " ",
      "kontak": "",
      "alamat": "",
      "description": "",
      "created_at": "2021-05-23T07:18:25.000000Z",
      "updated_at": "2021-05-23T07:18:25.000000Z",
      "deleted_at": null,
      "armada_to_user": [
          {
              "id": 36,
              "email": "",
              "type": "",
              "created_at": "2021-05-23T07:18:24.000000Z",
              "updated_at": "2021-05-23T07:18:24.000000Z",
              "deleted_at": null
          }
      ]
  },
  ]

  // const postJadwal = [
  //   {
  //     "nama_armada": "Gangga Express",
  //     "jadwal": "06:30:00",
  //     "nama_kapal": "Gangga Exspress 8",
  //     "status": "Sandar",
  //     "tujuan_awal": "Tribuana",
  //     "lokasi_awal": "Kusamba",
  //     "tujuan_akhir": "Sampalan",
  //     "lokasi_akhir": "Batununggul"
  //   }
  // ]

  
  const { token,type,id,id_armada } = useToken();
  const [armadas, setArmada] = useState({data : postArmada});
  const [jadwals, setJadwals] = useState({data : []});
  const [jadwalnya, setJadwalnya] = useState([]);
  const [kapal, setKapals] = useState({data : []});
  const [showEmergencyModal, setShowEmergencyModal] = useState(false);
  const [emergencyData, setEmergencyData] = useState([]);
  const [emergencyDataActive, setEmergencyDataActive] = useState(null);
  const [idKeberangkatan, setIdKeberangkatan] = useState(null);
  const headers = {
    headers: {
      'Authorization': "bearer " + token 
    },
    timeout: 10000 
  }

  useEffect(() => {
    fetchData();
    _listenEmergencyNotification();
    // eslint-disable-next-line
  }, [])

  useEffect(() => {
    //listen emergency message
    if (emergencyData.length > 0) {
      setEmergencyDataActive(emergencyData[0]);
      setShowEmergencyModal(true);
    }
  }, [emergencyData.length]);

  const getBadge = (status)=>{
    switch (status) {
      case 'Berlayar': return 'success'
      case 'Sandar': return 'secondary'
      case 'Persiapan': return 'warning'
      default: return 'primary'
    }
  }

  const getBadgeStatus = (status)=>{
    switch (status) {
      case 'Active': return 'success'
      case 'Inactive': return 'danger'
      default: return 'info'
    }
  }


  const fetchData = async () => {
    if(type === 'admin' || type === 'syahbandar'){
      const result = await axios.get(apiUrl + 'armada', headers)
      .catch(function (error) {
        if(error.response?.status === 401){
            localStorage.removeItem('access_token')
            window.location.reload()
        }
      })
      setArmada(result)
      const jadwals = await axios.get(apiUrl + 'jadwal_keberangkatan', headers)
      setJadwals(jadwals)
    }else if(type === 'armada'){
      const result = await axios.get(apiUrl + 'kapal/'+id, headers)
      .catch(function (error) {
        if(error.response?.status === 401){
            localStorage.removeItem('access_token')
            window.location.reload()
        }
      })
      setKapals(result)
      // console.log(result)
      const jad = await axios.get(apiUrl + 'jadwal_keberangkatan/index/'+id, headers)
      setJadwalnya(jad.data.jadwal)
      // console.log(jad.data.jadwal);
    }else if(type === 'loket'){
      const jad = await axios.get(apiUrl + 'jadwal_keberangkatan/index/'+id_armada, headers)
      setJadwalnya(jad.data.jadwal)
    }
  }

  function getCardArmadas(datas){
    const listItems = 
        datas.map((data, i) =>
          {
            if(data.nama_armada !== 'Padang Bai' && data.nama_armada !== 'El Rey'){
              return(
                      <div key={i} className={"card cards-custom card-"+i}>
                        <div className="card__icon"><CIcon name="cil-scrubber" className="mfe-2" /></div>
                        <h4 className="card__title">{data.nama_armada}</h4>
                        <h5 className="card__title_2">{data.kontak}</h5>
                        <p className="card__apply">
                          <a href="/#" className="card__link" >Lihat Jadwal <CIcon name="cil-arrow-right" className="mfe-2" /></a>
                        </p>
                      </div>
              )
            }else{
              return ( <></> )
            }
          }
          
      );
      return listItems;
  }

  function getCardKapal(datas){
      return(
          <div className='grey-thead'>
            <CDataTable
                  items={datas}
                  fields={[
                    { key: 'nama_kapal', _style: { width: '15%'}},
                    { key: 'mesin', _style: { width: '10%'} },
                    { key: 'kapal_jenis', _style: { width: '10%'} },
                    { key: 'kapasitas_penumpang', _style: { width: '10%'} },
                    { key: 'status', _style: { width: '10%'} },
                  ]}
                  columnFilter
                  // tableFilter
                  button
                  hover
                  pagination
                  bordered
                  striped
                  size="sm"
                  itemsPerPage={5}
                  scopedSlots = {{
                      'nama_kapal': 
                        (item,index)=> (
                          <td key={index}>
                            {item.nama_kapal}
                          </td>
                        ),
                        'mesin':
                        (item)=>(
                          <td>
                            {item.mesin}
                          </td>
                        ),
                        'kapal_jenis': 
                        (item)=> (
                          <td>
                            {item.kapal_to_jenis.nama_jenis}
                          </td>
                        ),
                        'kapasitas_penumpang': 
                        (item)=> (
                          <td>
                            {item.kapasitas_penumpang}
                          </td>
                        ),
                        'status': 
                        (item)=> (
                          <td>
                            <CBadge color={getBadgeStatus(item.kapal_to_status.nama_status)}>
                              {item.kapal_to_status.nama_status}
                            </CBadge>
                          </td>
                        ),
                  }}
              />
          </div>
        )
  }

  const _listenEmergencyNotification = () => {
    onValue(ref(database, '/emergency/'), (snapshot) => {
      let dataTmp = [];
      snapshot.forEach((child)=>{
        dataTmp.push({
          id: child.key,
          armada: child.val().armada,
          date: child.val().date,
          id_armada: child.val().id_armada,
          nama_kapal: child.val().kapal,
          kode: child.val().kode,
          nahkoda: child.val().nahkoda,
        });
        setEmergencyData(dataTmp);
      });
    });
  }

  const _fokusShipLocation = () => {
    setShowEmergencyModal(false);
    setIdKeberangkatan(emergencyDataActive ? emergencyDataActive.id : null);
  }

  return (
    <>
    {(() => {
      if(type === 'admin' || type === 'syahbandar'){
        return(
          <div className='conteiner-operator'>
            <CCard className='p-3'>
              <MapLocation id={null} id_keberangkatan={idKeberangkatan}/>
            </CCard>
            <CRow>
                <div className='col-lg-6 col-xs-12 col-sm-12 col-md-6'>
                    <h5 className="heading-text">List Armada</h5>
                    <div className="cards">
                        {armadas?.data ? getCardArmadas(armadas.data) : ''}
                    </div>
                </div>
                <div className='col-lg-6 col-xs-12 col-sm-12 col-md-6'>
                <h5 className="heading-text">List Keberangkatan</h5>
                  <div className='card blue-thead'>
                          <CDataTable
                          items={jadwals.data}
                          fields={[
                            { key: 'nama_armada', _style: { width: '15%'}},
                            { key: 'jadwal', _style: { width: '10%'} },
                            { key: 'nama_kapal', _style: { width: '10%'} },
                            { key: 'tujuan_awal', _style: { width: '20%'} },
                            { key: 'tujuan_akhir', _style: { width: '10%'} },
                            { key: 'status', _style: { width: '10%'} },
                          ]}
                          columnFilter
                          // tableFilter
                          button
                          hover
                          pagination
                          bordered
                          striped
                          size="sm"
                          itemsPerPage={5}
                          scopedSlots = {{
                              'nama_armada':
                                (item, index)=>(
                                  <td key={index}>
                                    {item.nama_armada}
                                  </td>
                                ),
                                'jadwal':
                                (item)=>(
                                  <td>
                                    {item.jadwal}
                                  </td>
                                ),
                                'nama_kapal': 
                                (item)=> (
                                  <td>
                                    {item.nama_kapal}
                                  </td>
                                ),
                                'tujuan_awal': 
                                (item)=> (
                                  <td>
                                    {item.tujuan_awal} - {item.lokasi_awal}
                                  </td>
                                ),
                                'tujuan_akhir': 
                                (item)=> (
                                  <td>
                                    {item.tujuan_akhir} - {item.lokasi_akhir}
                                  </td>
                                ),
                                'status': 
                                (item)=> (
                                  <td>
                                    <CBadge color={getBadge(item.status)}>
                                      {item.status}
                                    </CBadge>
                                  </td>
                                ),
                          }}
                        />
                  </div>
                </div>
            </CRow>
            <Penumpangs />
          </div>
        )
      }else if(type === 'armada'){
        return(
          <div>
            <CCard className='p-3'>
              <MapLocation id={id} id_keberangkatan={idKeberangkatan}/>
            </CCard>
            <CRow>
                <div className='col-lg-6 col-xs-12 col-sm-12 col-md-6'>
                    <h5 className="heading-text">List Kapal</h5>
                    <div className="card">
                        {kapal.data ? getCardKapal(kapal.data) : 'asdad'}
                    </div>
                </div>
                <div className='col-lg-6 col-xs-12 col-sm-12 col-md-6'>
                    <h5 className="heading-text">List Keberangkatan</h5>
                      <div className='card blue-thead'>
                              <CDataTable
                              items={jadwalnya}
                              fields={[
                                { key: 'nahkoda', _style: { width: '15%'}},
                                { key: 'jadwal', _style: { width: '10%'} },
                                { key: 'nama_kapal', _style: { width: '10%'} },
                                { key: 'tujuan_awal', _style: { width: '20%'} },
                                { key: 'tujuan_akhir', _style: { width: '10%'} },
                                { key: 'status', _style: { width: '10%'} },
                              ]}
                              columnFilter
                              // tableFilter
                              button
                              hover
                              pagination
                              bordered
                              striped
                              size="sm"
                              itemsPerPage={5}
                              scopedSlots = {{
                                  'nahkoda':
                                    (item, index)=>(
                                      <td key={index}>
                                        {item.jadwal_to_nahkoda.nama_nahkoda}
                                      </td>
                                    ),
                                    'jadwal':
                                    (item)=>(
                                      <td>
                                        {item.jadwal}
                                      </td>
                                    ),
                                    'nama_kapal': 
                                    (item)=> (
                                      <td>
                                        {item?.jadwal_to_kapal?.nama_kapal ? item.jadwal_to_kapal.nama_kapal : '-'}
                                      </td>
                                    ),
                                    'tujuan_awal': 
                                    (item)=> (
                                      <td>
                                        {item.jadwal_to_rute.tujuan_awals.nama_dermaga} - {item.jadwal_to_rute.tujuan_awals.lokasi}
                                      </td>
                                    ),
                                    'tujuan_akhir': 
                                    (item)=> (
                                      <td>
                                        {item.jadwal_to_rute.tujuan_akhirs.nama_dermaga} - {item.jadwal_to_rute.tujuan_akhirs.lokasi}
                                      </td>
                                    ),
                                    'status': 
                                    (item)=> (
                                      <td>
                                        <CBadge color={getBadge(item.status)}>
                                          {item.status}
                                        </CBadge>
                                      </td>
                                    ),
                              }}
                            />
                      </div>
                </div>
            </CRow>
          </div>
        )
      }else if(type === 'loket'){
        return(
        <div >
        <h5 className="heading-text">List Keberangkatan</h5>
          <div className='card blue-thead'>
                  <CDataTable
                  items={jadwalnya}
                  fields={[
                    { key: 'nahkoda', _style: { width: '15%'}},
                    { key: 'jadwal', _style: { width: '10%'} },
                    { key: 'nama_kapal', _style: { width: '10%'} },
                    { key: 'tujuan_awal', _style: { width: '20%'} },
                    { key: 'tujuan_akhir', _style: { width: '10%'} },
                    { key: 'status', _style: { width: '10%'} },
                  ]}
                  columnFilter
                  // tableFilter
                  button
                  hover
                  pagination
                  bordered
                  striped
                  size="sm"
                  itemsPerPage={5}
                  scopedSlots = {{
                      'nahkoda':
                        (item,index)=>(
                          <td key={index}>
                            {item.jadwal_to_nahkoda.nama_nahkoda}
                          </td>
                        ),
                        'jadwal':
                        (item)=>(
                          <td>
                            {item.jadwal}
                          </td>
                        ),
                        'nama_kapal': 
                        (item)=> (
                          <td>
                            {item?.jadwal_to_kapal?.nama_kapal ? item.jadwal_to_kapal.nama_kapal : '-'}
                          </td>
                        ),
                        'tujuan_awal': 
                        (item)=> (
                          <td>
                            {item.jadwal_to_rute.tujuan_awals.nama_dermaga} - {item.jadwal_to_rute.tujuan_awals.lokasi}
                          </td>
                        ),
                        'tujuan_akhir': 
                        (item)=> (
                          <td>
                            {item.jadwal_to_rute.tujuan_akhirs.nama_dermaga} - {item.jadwal_to_rute.tujuan_akhirs.lokasi}
                          </td>
                        ),
                        'status': 
                        (item)=> (
                          <td>
                            <CBadge color={getBadge(item.status)}>
                              {item.status}
                            </CBadge>
                          </td>
                        ),
                  }}
                />
          </div>
        </div>
        )
      }
    })()}
    <CModal 
      show={showEmergencyModal} 
      size='lg'
      onClose={()=> setShowEmergencyModal(false)}
      color='danger'
      alignment="center"
      >
          <CModalHeader closeButton>
              <CIcon width={25} name="cil-warning"/>
              <div className="mr-2"/>
              <CModalTitle>EMERGENCY!</CModalTitle>
          </CModalHeader>
          <CModalBody>
            <div className='d-flex flex-column align-items-center bg-successs'>
              <img className="warning-icon" src={warningIcon}/>
              <p>Nahkoda atas nama <span className='font-weight-bold'>{emergencyDataActive && emergencyDataActive.nahkoda ? emergencyDataActive.nahkoda : '-'}</span> telah mengirim kode darurat:</p>
              <p className='danger-code'>{emergencyDataActive && emergencyDataActive.kode ? emergencyDataActive.kode : '-'}</p>
              <p className='danger-time'>{emergencyDataActive && emergencyDataActive.date ? emergencyDataActive.date : '-'}</p>
              <p className='danger-time-subtitle no-line-height font-weight-bold text-danger'>(1 Menit yang lalu)</p>
              <hr className='hr-1 mb-4'/>
              <div className='d-flex flex-row justify-content-between w-50 no-line-height'>
                <p>Armada</p>
                <p>{emergencyDataActive && emergencyDataActive.armada ? emergencyDataActive.armada : ''}</p>
              </div>
              <div className='d-flex flex-row justify-content-between w-50'>
                <p>Kapal</p>
                <p>{emergencyDataActive && emergencyDataActive.nama_kapal ? emergencyDataActive.nama_kapal : '-'}</p>
              </div>
              <button onClick={_fokusShipLocation} className='btn btn-primary btn-block btn-blue w-50'>Lihat Posisi Kapal</button>
            </div>
          </CModalBody>
      </CModal>
    </>
  )
}

export default Dashboard
