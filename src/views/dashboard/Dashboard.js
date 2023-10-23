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
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAnchor, faShip, faUser } from '@fortawesome/free-solid-svg-icons'
import database from 'src/firebase_init';
import { Link } from 'react-router-dom';
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

  // useEffect(() => {
  //   //listen emergency message
  //   if (emergencyData.length > 0) {
  //     setEmergencyDataActive(emergencyData[0]);
  //     setShowEmergencyModal(true);
  //   }
  // }, [emergencyData.length]);

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
                        <div className="card__icon"><FontAwesomeIcon icon={faAnchor} /></div>
                        <h4 className="card__title">{data.nama_armada}</h4>
                        <h5 className="card__title_2">{data.kontak}</h5>
                        <p className="card__apply">
                            <Link to={"/list-jadwal/"+data.id_armada} className="card__link" >Lihat Jadwal <CIcon name="cil-arrow-right" className="mfe-2" /></Link>
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
    </>
  )
}

export default Dashboard
