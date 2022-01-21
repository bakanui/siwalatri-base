import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  CBadge,
  CCard,
  // CCardBody,
  // CCardFooter,
  // CCol,
  // CHeader,
  CDataTable,
  // CLink,
  // CWidgetIcon,
  CRow

} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import useToken from '../../../src/useToken';
import { apiUrl } from './../../reusable/constants'
import Penumpangs from './../../components/Penumpangs'
import { MapLocation } from 'src/reusable/MapLocation';

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
  //     "status": "Nyandar",
  //     "tujuan_awal": "Tribuana",
  //     "lokasi_awal": "Kusamba",
  //     "tujuan_akhir": "Sampalan",
  //     "lokasi_akhir": "Batununggul"
  //   }
  // ]

  
  const { token,type,id } = useToken();
  const [armadas, setArmada] = useState({data : postArmada});
  const [jadwals, setJadwals] = useState({data : []});
  const [jadwalnya, setJadwalnya] = useState([]);
  const [kapal, setKapals] = useState({data : []});
  const headers = {
    headers: {
      'Authorization': "bearer " + token 
    },
    timeout: 10000 
  }
  console.log('id = '+id);

  useEffect(() => {
    fetchData()
    // eslint-disable-next-line
  }, [])

  const getBadge = (status)=>{
    switch (status) {
      case 'Berlayar': return 'success'
      case 'Nyandar': return 'secondary'
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
    if(type === 'admin'){
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
                        (item)=> (
                          <td>
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

  return (
    <>
    {(() => {
      if(type === 'admin'){
        return(
          <div className='conteiner-operator'>
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
                                (item)=>(
                                  <td>
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
            <CCard className='p-3'>
              <MapLocation id={id}/>
            </CCard>
          </div>
        )
      }else if(type === 'armada'){
        return(
          <div>
            <CCard className='p-3'>
              <MapLocation id={id}/>
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
                                    (item)=>(
                                      <td>
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
      }
    })()}
    </>
  )
}

export default Dashboard
