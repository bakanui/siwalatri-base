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

const MasterKapalArmada = () => {

    const { token, id } = useToken();
    const [id_kapal, setIdKapal] = useState(0)
    const [nama, setNama] = useState('')
    const [mesin, setMesin] = useState('')
    const [panjang, setPanjang] = useState('')
    const [lebar, setLebar] = useState('')
    const [kilometer, setKilometer] = useState('')
    const [dalam, setKedalaman] = useState('')
    const [grt, setGRT] = useState('')
    const [dwt, setDWT] = useState('')
    const [kapasitas_penumpang, setKapPenum] = useState('')
    const [kapasitas_crew, setKapCrew] = useState('')
    const [id_status_kapal, setIdStatusKapal] = useState(1)
    const [id_jenis_kapal, setIdJenisKapal] = useState(0)

    const [typeModal, setTypeModal] = useState() 
    const [modal, setModal] = useState(false) 
    const [delmodal, setModalDelete] = useState(false)
    const headers = {
      headers: {
        'Authorization': "bearer " + token 
      }
    }

    useEffect(() => {
        fetchData()
        // eslint-disable-next-line
    }, [])

    const [kapals, setKapal] = useState([]);
    const [jenisKapal, setJenisKapal] = useState([]);

    const fetchData = async () => {
        const result = await axios.get(apiUrl + 'kapal/'+id, headers)
        .catch(function (error) {
          if(error.response?.status === 401){
              localStorage.removeItem('access_token')
              window.location.reload()
          }
        })
        setKapal(result.data)
        // console.log(result.data)

        axios.get(apiUrl + 'jenis_kapal', headers)
        .then((res)=>{
          setJenisKapal(res.data)
          // console.log(res.data)
        })
        .catch(function (error) {
          if(error.response?.status === 401){
              localStorage.removeItem('access_token')
              window.location.reload()
          }
        })

    }

    // const getBadge = (status)=>{
    //   switch (status) {
    //     case 'Berlayar': return 'success'
    //     case 'Sandar': return 'secondary'
    //     case 'Persiapan': return 'warning'
    //     default: return 'primary'
    //   }
    // }

    const getBadgeStatus = (status)=>{
      switch (status) {
        case 'Active': return 'success'
        case 'Inactive': return 'danger'
        default: return 'info'
      }
    }

    const submitHandler = (e) => {
      const form = new FormData(e.target);
      e.preventDefault();
      if(typeModal === 'Tambah'){
        let datas = {
            mesin: form.get('mesin'),
            panjang : form.get('panjang'),
            lebar : form.get('lebar'),
            dimension : form.get('dalam'),
            kilometer : form.get('kilometer'),
            grt : form.get('grt'),
            dwt : form.get('dwt'),
            kapasitas_penumpang : form.get('kapasitas_penumpang'),
            kapasitas_crew : form.get('kapasitas_crew'),
            id_jenis : form.get('id_jenis_kapal'),
            id_status : form.get('id_status_kapal'),
            nama_kapal : form.get('nama_kapal'),
            id_armada : id
        }
        // console.log(datas);
        axios.post(apiUrl + 'kapal', datas, headers)
        .then((res) => {
          // setTitle("Action completed")
          // setMessage("Entry has successfully been posted!")
          // setColor("bg-success text-white")
          // setEdit(!edit)
          setModal(!modal)
          clearState();
          fetchData();
          // addToast()
        }).catch((error) => {
          // setTitle("An error occurred")
          // setMessage(error?.response?.data?.message)
          // setColor("bg-danger text-white")
          setModal(!modal)
          clearState();
          fetchData()
          // addToast()
        })
      }else if(typeModal === 'Edit'){
          let datas = {
            mesin: form.get('mesin'),
            panjang : form.get('panjang'),
            lebar : form.get('lebar'),
            dimension : form.get('dalam'),
            kilometer : form.get('kilometer'),
            grt : form.get('grt'),
            dwt : form.get('dwt'),
            kapasitas_penumpang : form.get('kapasitas_penumpang'),
            kapasitas_crew : form.get('kapasitas_crew'),
            id_jenis : form.get('id_jenis_kapal'),
            id_status : form.get('id_status_kapal'),
            nama_kapal : form.get('nama_kapal'),
          }
          // console.log(datas);
          axios.post(apiUrl + 'kapal/'+id_kapal, datas, headers)
          .then((res) => {
            // setTitle("Action completed")
            // setMessage("Entry has successfully been posted!")
            // setColor("bg-success text-white")
            // setEdit(!edit)
            setModal(!modal)
            clearState();
            fetchData();
            // addToast()
          }).catch((error) => {
            // setTitle("An error occurred")
            // setMessage(error?.response?.data?.message)
            // setColor("bg-danger text-white")
            setModal(!modal)
            clearState();
            fetchData()
            // addToast()
          })
        }else if(typeModal === 'Delete'){
          if(id_kapal){
              axios.get(apiUrl + 'kapal/delete/'+id_kapal, headers)
              .then((res) => {
                // setTitle("Action completed")
                // setMessage("Entry has successfully been posted!")
                // setColor("bg-success text-white")
                // setEdit(!edit)
                setModalDelete(!delmodal)
                clearState();
                fetchData();
                // addToast()
              }).catch((error) => {
                // setTitle("An error occurred")
                // setMessage(error?.response?.data?.message)
                // setColor("bg-danger text-white")
                setModalDelete(!delmodal)
                clearState();
                fetchData()
                // addToast()
              })
          }
        }
    }

    function clearState(){
      setIdKapal(0)
      setNama('')
      setMesin('')
      setPanjang('')
      setLebar('')
      setKilometer('')
      setKedalaman('')
      setGRT('')
      setDWT('')
      setKapPenum('')
      setKapCrew('')
      setIdStatusKapal('')
      setIdJenisKapal(0)
    }

    return(
      <>
         <div className='grey-thead'>
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
                Tambah Kapal
            </CButton>
            <CDataTable
                  items={kapals}
                  fields={[
                    { key: 'nama_kapal', _style: { width: '15%'}},
                    { key: 'mesin', _style: { width: '10%'} },
                    { key: 'kapal_jenis', _style: { width: '10%'} },
                    { key: 'kapasitas_penumpang', _style: { width: '10%'} },
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
                                        setIdKapal(item.id_kapal)
                                        setNama(item.nama_kapal)
                                        setMesin(item.mesin)
                                        setPanjang(item.panjang)
                                        setLebar(item.lebar)
                                        setKilometer(item.kilometer)
                                        setKedalaman(item.dimension)
                                        setGRT(item.grt)
                                        setDWT(item.dwt)
                                        setKapPenum(item.kapasitas_penumpang)
                                        setKapCrew(item.kapasitas_crew)
                                        setIdStatusKapal(item.id_status)
                                        setIdJenisKapal(item.id_jenis)
                                        setModal(!modal)
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
                                        setIdKapal(item.id_kapal)
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
                        <CModalTitle>{typeModal} Kapal</CModalTitle>
                    </CModalHeader>
                    <CForm  onSubmit={submitHandler} method="post" encType="multipart/form-data" className="form-horizontal">
                    <CModalBody>
                            <CFormGroup row>
                                <CCol xs="12">
                                    <CLabel htmlFor="nameLabel">Nama Kapal</CLabel>
                                    <CInput id={"nameInput"} placeholder="Nama Jenis Penumpang"
                                    onChange={(e) => { setNama(e.target.value); }}
                                    name="nama_kapal" value={nama} required/>
                                </CCol>
                            </CFormGroup>
                            <CFormGroup row>
                                <CCol xs="12">
                                    <CLabel htmlFor="nameLabel">Mesin</CLabel>
                                    <CInput id={"nameInput"} placeholder="Mesin"
                                    onChange={(e) => { setMesin(e.target.value); }}
                                    name="mesin" value={mesin} required/>
                                </CCol>
                            </CFormGroup>
                            <CFormGroup row>
                                <CCol xs="6">
                                    <CLabel htmlFor="nameLabel">Panjang Kapal (m)</CLabel>
                                    <CInput  id={"nameInput"} placeholder="Panjang Kapal"
                                    onChange={(e) => { setPanjang(e.target.value); }}
                                    name="panjang" value={panjang} required/>
                                </CCol>
                                <CCol xs="6">
                                    <CLabel htmlFor="nameLabel">Lebar Kapal (m)</CLabel>
                                    <CInput id={"nameInput"} placeholder="Lebar Kapal"
                                    onChange={(e) => { setLebar(e.target.value); }}
                                    name="lebar" value={lebar} required/>
                                </CCol>
                            </CFormGroup>
                            <CFormGroup row>
                                <CCol xs="6">
                                    <CLabel htmlFor="nameLabel">Kilometer Kapal</CLabel>
                                    <CInput type="number" id={"nameInput"} placeholder="kilometer"
                                    onChange={(e) => { setKilometer(e.target.value); }}
                                    name="kilometer" value={kilometer} required/>
                                </CCol>
                                <CCol xs="6">
                                    <CLabel htmlFor="nameLabel">Kedalaman Kapal</CLabel>
                                    <CInput type="number" id={"nameInput"} placeholder="Kedalaman kapal"
                                    onChange={(e) => { setKedalaman(e.target.value); }}
                                    name="dalam" value={dalam} required/>
                                </CCol>
                            </CFormGroup>
                            <CFormGroup row>
                                <CCol xs="6">
                                    <CLabel htmlFor="nameLabel">GRT</CLabel>
                                    <CInput type="number" id={"nameInput"} placeholder="GRT"
                                    onChange={(e) => { setGRT(e.target.value); }}
                                    name="grt" value={grt} required/>
                                </CCol>
                                <CCol xs="6">
                                    <CLabel htmlFor="nameLabel">DWT</CLabel>
                                    <CInput type="number" id={"nameInput"} placeholder="DWT"
                                    onChange={(e) => { setDWT(e.target.value); }}
                                    name="dwt" value={dwt} required/>
                                </CCol>
                            </CFormGroup>
                            <CFormGroup row>
                                <CCol xs="6">
                                    <CLabel htmlFor="nameLabel">Kapasitas Penumpang</CLabel>
                                    <CInput type="number" id={"nameInput"} placeholder="Kapasitas Penumpang"
                                    onChange={(e) => { setKapPenum(e.target.value); }}
                                    name="kapasitas_penumpang" value={kapasitas_penumpang} required/>
                                </CCol>
                                <CCol xs="6">
                                    <CLabel htmlFor="nameLabel">Kapasitas Crew</CLabel>
                                    <CInput type="number" id={"nameInput"} placeholder="Kapasitas Crew"
                                    onChange={(e) => { setKapCrew(e.target.value); }}
                                    name="kapasitas_crew" value={kapasitas_crew} required/>
                                </CCol>
                            </CFormGroup>
                            <CFormGroup row>
                                <CCol xs="6">
                                    <CLabel htmlFor="nameLabel">Status Kapal</CLabel>
                                    <CSelect custom name="id_status_kapal" id={"statusLabel"} onChange={(e) => { setIdStatusKapal(e.target.value); }} required>
                                    {(() => {
                                              if(id_status_kapal === 1){
                                                  return(
                                                    <>
                                                      <option selected value="1">Active</option>
                                                      <option  value="0">Inactive</option>
                                                    </>
                                                  )
                                              }else{
                                                  return(
                                                    <>
                                                      <option  value="1">Active</option>
                                                      <option  value="0">Inactive</option>
                                                    </>
                                                  )
                                              }
                                              
                                     })()}
                                     </CSelect>
                                </CCol>
                                <CCol xs="6">
                                  <CLabel htmlFor="nameLabel">Jenis Kapal</CLabel>
                                    <CSelect custom name="id_jenis_kapal" id={"statusLabel"} onChange={(e) => { setIdJenisKapal(e.target.value); }} required>
                                        {
                                            jenisKapal.map((data,index) => {
                                                if(id_jenis_kapal && id_jenis_kapal === data.id_jenis){
                                                    return(
                                                        <option key={index} selected value={data.id_jenis}>{data.nama_jenis}</option>
                                                    )
                                                }else{
                                                    return(
                                                        <option key={index} value={data.id_jenis}>{data.nama_jenis}</option>
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
                            <CModalTitle>Delete Kapal</CModalTitle>
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

export default MasterKapalArmada