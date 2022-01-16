import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  CCol,
  CDataTable,
  CButton,
  CModal, 
  CModalHeader, 
  CModalTitle, 
  CModalBody, 
  CModalFooter, 
  CForm, 
  CFormGroup, 
  CLabel, 
  CInput, 
  CSelect,
  CBadge,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import useToken from '../../../src/useToken';
import Moment from 'react-moment';
import { apiUrl } from './../../reusable/constants'
import 'moment-timezone';
// import { Link } from 'react-router-dom';

Moment.globalTimezone = 'Asia/Makassar';

const Jadwal = () => {
    const { token,type,id } = useToken();
    const [jadwalnya, setJadwalnya] = useState([]);
    const [kapals, setKapal] = useState([]);
    const [nahkodas, setNahkoda] = useState([]);
    const [lokets, setLoket] = useState([]);
    const [rutes, setRute] = useState([]);

    const headers = {
        headers: {
          'Authorization': "bearer " + token 
        },
        timeout: 10000 
      }
      const [typeModal, setTypeModal] = useState() 
      const [modal, setModal] = useState(false) 
      const [delmodal, setModalDelete] = useState(false)
      const [id_jenis_jadwal, setIdJenisJadwal] = useState(0) 
      const [jadwal, setJadwal] = useState() 
      const [id_nahkoda, setIdNahkoda] = useState(0)
      const [id_kapal, setIdKapal] = useState(0) 
      const [id_rute, setIdRute] = useState(0)
      const [id_jadwal, setIdJadwal] = useState(0)
      const [status, setStatus] = useState("")
      const [id_loket, setIdLoket] = useState(0) 
      const getBadge = (status)=>{
        switch (status) {
          case 'Berlayar': return 'success'
          case 'Nyandar': return 'secondary'
          case 'Persiapan': return 'warning'
          default: return 'primary'
        }
      }
    
      const fetchData = async () => {
          const jad = await axios.get(apiUrl + 'jadwal_keberangkatan/index/'+id, headers)
          setJadwalnya(jad.data.jadwal)
          setLoket(jad.data.lokets)

          const kap = await axios.get(apiUrl + 'kapal/'+id, headers)
          .catch(function (error) {
            if(error.response?.status === 401){
                localStorage.removeItem('access_token')
                window.location.reload()
            }
          })
          setKapal(kap.data)

          const nahk = await axios.get(apiUrl + 'nahkoda/'+id, headers)
          .catch(function (error) {
            if(error.response?.status === 401){
                localStorage.removeItem('access_token')
                window.location.reload()
            }
          })
          setNahkoda(nahk.data)

          const rute = await axios.get(apiUrl + 'rute', headers)
          .catch(function (error) {
            if(error.response?.status === 401){
                localStorage.removeItem('access_token')
                window.location.reload()
            }
          })
          setRute(rute.data)
      }

      useEffect(() => {
        fetchData()
        // eslint-disable-next-line
      }, [])


      const submitHandler = (e) => {
        const form = new FormData(e.target);
        e.preventDefault();
        if(typeModal === 'Tambah'){
          let datas = {
            jadwal: form.get('jadwal'),
            harga: form.get('harga'),
            status: "Nyandar",
            id_kapal: form.get('id_kapal'),
            id_nahkoda: form.get('id_nahkoda'),
            id_rute: form.get('id_rute'),
            ekstra: form.get('id_jenis_jadwal'),
            id_loket: form.get('id_loket'),
          }
          
          axios.post(apiUrl + 'jadwal_keberangkatan/'+id, datas, headers)
          .then((res) => {
            // setTitle("Action completed")
            // setMessage("Entry has successfully been posted!")
            // setColor("bg-success text-white")
            // setEdit(!edit)
            setModal(!modal)
            clearState()
            fetchData();
            // addToast()
          }).catch((error) => {
            // setTitle("An error occurred")
            // setMessage(error?.response?.data?.message)
            // setColor("bg-danger text-white")
            setModal(!modal)
            clearState()
            fetchData()
            // addToast()
          })
        }else if(typeModal === 'Edit'){
            let datas = {
                jadwal: form.get('jadwal'),
                harga: form.get('harga'),
                id_kapal: form.get('id_kapal'),
                id_nahkoda: form.get('id_nahkoda'),
                id_rute: form.get('id_rute'),
                ekstra: form.get('id_jenis_jadwal'),
                id_loket: form.get('id_loket'),
                status: status,
              }
              
              axios.post(apiUrl + 'jadwal_keberangkatan/edit/'+id_jadwal, datas, headers)
              .then((res) => {
                // setTitle("Action completed")
                // setMessage("Entry has successfully been posted!")
                // setColor("bg-success text-white")
                // setEdit(!edit)
                setModal(!modal)
                clearState()
                fetchData();
                // addToast()
              }).catch((error) => {
                // setTitle("An error occurred")
                // setMessage(error?.response?.data?.message)
                // setColor("bg-danger text-white")
                setModal(!modal)
                clearState()
                fetchData()
                // addToast()
              })
        }else if(typeModal === 'Delete'){
              axios.post(apiUrl + 'jadwal_keberangkatan/delete/'+id_jadwal, headers)
              .then((res) => {
                // setTitle("Action completed")
                // setMessage("Entry has successfully been posted!")
                // setColor("bg-success text-white")
                // setEdit(!edit)
                setModal(!modal)
                clearState()
                fetchData();
                // addToast()
              }).catch((error) => {
                // setTitle("An error occurred")
                // setMessage(error?.response?.data?.message)
                // setColor("bg-danger text-white")
                setModal(!modal)
                clearState()
                fetchData()
                // addToast()
              })
        }
      }
    
      function clearState(){
        setJadwal();
        setIdNahkoda(0);
        setIdKapal(0);
        setIdRute(0);
        setIdLoket(0)
        setIdJenisJadwal(0);
      }
  

    return(
        <>
                      <h5 className="heading-text">List Jadwal Keberangkatan</h5>
                      <CButton
                                color="info"
                                variant="outline"
                                shape="square"
                                size="sm" 
                                style={{margin:'10px 0'}}
                                onClick={() => 
                                    {
                                        setTypeModal('Tambah')
                                        setModal(true)
                                    }}
                                >
                                Tambah Jadwal
                            </CButton>
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
                                { key: 'edit', _style: { width: '1%'}, sorter: false, filter: false  },
                                { key: 'delete', _style: { width: '1%'}, sorter: false, filter: false  },
                              ]}
                              columnFilter
                              // tableFilter
                              button
                              hover
                              pagination
                              bordered
                              striped
                              size="sm"
                              itemsPerPage={10}
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
                                    'edit':
                                    (item)=>(
                                            <td className="py-2">
                                                <CButton
                                                color="primary"
                                                variant="outline"
                                                shape="square"
                                                size="sm"
                                                onClick={()=>{
                                                    setTypeModal('Edit')
                                                    setIdJadwal(item.id_jadwal)
                                                    setIdJenisJadwal(item.id_jenis_jadwal)
                                                    setIdKapal(item.id_kapal)
                                                    setIdLoket(item.id_loket)
                                                    setIdNahkoda(item.id_nahkoda)
                                                    setIdRute(item.id_rute)
                                                    setStatus(item.status)
                                                    setJadwal(item.jadwal)
                                                    setModal(true)
                                                }}
                                                >
                                                Edit
                                                </CButton>
                                            </td>
                                   ),
                                   'delete':
                                    (item) =>(
                                            <td className="py-2">
                                                <CButton
                                                color="danger"
                                                variant="outline"
                                                shape="square"
                                                size="sm"
                                                onClick={()=>{
                                                    setTypeModal('Delete')
                                                    setJadwal(item.id_jadwal)
                                                    setModalDelete(!delmodal)
                                                }}
                                                >
                                                Hapus
                                                </CButton>
                                            </td>
                                    )
                              }}
                            />
                      </div>

                      <CModal 
                        show={modal} 
                        onClose={() => {
                        setModal(!modal);clearState()
                        }}
                        color='info'
                        >
                            <CModalHeader closeButton>
                                <CModalTitle>{typeModal} Jadwal</CModalTitle>
                            </CModalHeader>
                            <CForm  onSubmit={submitHandler} method="post" encType="multipart/form-data" className="form-horizontal">
                            <CModalBody>
                                        <CFormGroup row>
                                            <CCol xs="6">
                                                <CLabel htmlFor="nameLabel">Jenis Jadwal</CLabel>
                                                <CSelect custom name="id_jenis_jadwal" id={"statusLabel"} onChange={(e) => { setIdJenisJadwal(e.target.value); }} required>
                                                {(() => {
                                                        if(id_jenis_jadwal === 0){
                                                            return(
                                                                <>
                                                                <option selected value="0">Umum</option>
                                                                <option  value="1">Extra</option>
                                                                </>
                                                            )
                                                        }else{
                                                            return(
                                                                <>
                                                                <option  value="0">Umum</option>
                                                                <option  value="1">Extra</option>
                                                                </>
                                                            )
                                                        }
                                                        
                                                })()}
                                                </CSelect>
                                            </CCol>
                                            <CCol xs="6">
                                                <CLabel htmlFor="nameLabel">Waktu Keberangkatan</CLabel>
                                                <CInput type="time" id={"nameInput"} placeholder="Waktu Keberangkatan"
                                                onChange={(e) => { setJadwal(e.target.value); }}
                                                name="jadwal" value={jadwal} required/>
                                            </CCol>
                                            {(() => {
                                                if(typeModal === 'Edit'){
                                                    <CInput type="hidden" id={"nameInput"} onChange={(e) => { setStatus(e.target.value); }}
                                                    name="status" value={status}/>
                                                }
                                            
                                            })()}
                                        </CFormGroup>
                                        <CFormGroup row>
                                            <CCol xs="12">
                                                <CLabel htmlFor="nameLabel">Kapal</CLabel>
                                                <CSelect custom name="id_kapal" id={"statusLabel"} onChange={(e) => { setIdKapal(e.target.value); }} required>
                                                {
                                                       kapals.map((data,index) => {
                                                        if(id_kapal && id_kapal === data.id_kapal){
                                                            return(
                                                                <option key={index} selected value={data.id_kapal}>{data.nama_kapal}</option>
                                                            )
                                                        }else{
                                                            return(
                                                                <option key={index} value={data.id_kapal}>{data.nama_kapal}</option>
                                                            )
                                                        }
                                                    })
                                                }
                                                </CSelect>
                                            </CCol>
                                        </CFormGroup>
                                        <CFormGroup row>
                                            <CCol xs="12">
                                                <CLabel htmlFor="nameLabel">Nahkoda</CLabel>
                                                <CSelect custom name="id_nahkoda" id={"statusLabel"} onChange={(e) => { setIdNahkoda(e.target.value); }} required>
                                                {
                                                       nahkodas.map((data,index) => {
                                                        if(id_nahkoda && id_nahkoda === data.id_nahkoda){
                                                            return(
                                                                <option key={index} selected value={data.id_nahkoda}>{data.nama_nahkoda}</option>
                                                            )
                                                        }else{
                                                            return(
                                                                <option key={index} value={data.id_nahkoda}>{data.nama_nahkoda}</option>
                                                            )
                                                        }
                                                    })
                                                }
                                                </CSelect>
                                            </CCol>
                                        </CFormGroup>
                                        <CFormGroup row>
                                            <CCol xs="12">
                                                <CLabel htmlFor="nameLabel">Rute</CLabel>
                                                <CSelect custom name="id_rute" id={"statusLabel"} onChange={(e) => { setIdRute(e.target.value); }} required>
                                                {
                                                       rutes.map((data,index) => {
                                                        if(id_rute && id_rute === data.id_rute){
                                                            return(
                                                                <option key={index} selected value={data.id_rute}>{data.tujuan_awals.nama_dermaga} - {data.tujuan_akhirs.nama_dermaga}</option>
                                                            )
                                                        }else{
                                                            return(
                                                                <option key={index} value={data.id_rute}>{data.tujuan_awals.nama_dermaga} - {data.tujuan_akhirs.nama_dermaga}</option>
                                                            )
                                                        }
                                                    })
                                                }
                                                </CSelect>
                                            </CCol>
                                        </CFormGroup>
                                        <CFormGroup row>
                                            <CCol xs="12">
                                                <CLabel htmlFor="nameLabel">Loket</CLabel>
                                                <CSelect custom name="id_loket" id={"statusLabel"} onChange={(e) => { setIdLoket(e.target.value); }} required>
                                                {
                                                       lokets.map((data,index) => {
                                                        if(id_loket && id_loket === data.id_loket){
                                                            return(
                                                                <option key={index} selected value={data.id_loket}>{data.nama_loket}</option>
                                                            )
                                                        }else{
                                                            return(
                                                                <option key={index} value={data.id_loket}>{data.nama_loket}</option>
                                                            )
                                                        }
                                                    })
                                                }
                                                </CSelect>
                                            </CCol>
                                        </CFormGroup>
                                    
                            </CModalBody>
                            <CModalFooter>
                                <CButton type="submit" color="primary">
                                    <CIcon name="cil-scrubber" /> Submit
                                </CButton>{' '}
                                <CButton color="secondary" onClick={() => {setModal(!modal); clearState()}}>Cancel</CButton>
                            </CModalFooter>
                            </CForm>
                        </CModal>

                        <CModal 
                            show={delmodal} 
                            onClose={() => setModalDelete(!delmodal)}
                            color='info'
                            >
                            <CModalHeader closeButton>
                                <CModalTitle>Delete Jadwal</CModalTitle>
                            </CModalHeader>
                            <CForm onSubmit={submitHandler} method="post" encType="multipart/form-data" className="form-horizontal">
                            <CModalBody>
                                <h5>Anda Yakin ingin menghapus data ini?</h5>
                            </CModalBody>
                            <CModalFooter>
                                <CButton type="submit" color="primary">
                                    <CIcon name="cil-scrubber" /> Submit
                                </CButton>{' '}
                                <CButton color="secondary" onClick={() => setModalDelete(!delmodal)}>Cancel</CButton>
                            </CModalFooter>
                            </CForm>
                        </CModal>
        </>
    )

}

export default Jadwal