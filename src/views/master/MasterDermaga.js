import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
//   CBadge,
//   CCardBody,
//   CCardFooter,
  CCol,
//   CHeader,
  CDataTable,
//   CLink,
//   CWidgetIcon,
//   CRow,
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
//   CTextarea, 
  CSelect
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import useToken from '../../../src/useToken';
import Moment from 'react-moment';
import { apiUrl } from './../../reusable/constants'
import Toast from './../../reusable/toast';
import ToastMaker from './../../reusable/toastMaker';
import 'moment-timezone';
// import { Link } from 'react-router-dom';

Moment.globalTimezone = 'Asia/Makassar';

const MasterDermaga = () => {

    const { token } = useToken();
    const [id, setId] = useState(0)
    const [nama, setNama] = useState('')
    const [lokasi, setLokasi] = useState() 
    const [id_petugas, setIdPetugas] = useState(0) 
    const [typeModal, setTypeModal] = useState() 
    const [modal, setModal] = useState(false)

    const headers = {
        headers: {
          'Authorization': "bearer " + token 
        }
    }

    //Toast
    const { toasters, addToast } = ToastMaker()
    const [title, setTitle] = useState("")
    const [message, setMessage] = useState("")
    const [color, setColor] = useState("")
    useEffect(() => {
        fetchData()
        // eslint-disable-next-line
    }, [])

    const [dermagas, setDermaga] = useState([]);
    const [petugas, setPetugas] = useState([]);

    const fetchData = async () => {
        const result = await axios.get(apiUrl + 'dermaga', headers)
        .catch(function (error) {
          if(error.response?.status === 401){
              localStorage.removeItem('access_token')
              window.location.reload()
          }
        })
        setDermaga(result.data)
        // console.log(result.data)

        const result2 = await axios.get(apiUrl + 'user/syahbandar', headers)
        .catch(function (error) {
          if(error.response?.status === 401){
              localStorage.removeItem('access_token')
              window.location.reload()
          }
        })

        setPetugas(result2.data)
        // console.log(result2.data)
    }

    const submitHandler = (e) => {
        const form = new FormData(e.target);
        e.preventDefault();
        if(typeModal === 'Tambah'){
          let datas = {
            nama_dermaga: form.get('nama_dermaga'),
            lokasi: form.get('lokasi'),
            id_syahbandar: form.get('id_petugas'),
          }
          axios.post(apiUrl + 'dermaga', datas, headers)
          .then((res) => {
            setTitle("Action completed")
            setMessage("Entry has successfully been posted!")
            setColor("bg-success text-white")
            setModal(!modal)
            clearState();
            fetchData();
            addToast()
          }).catch((error) => {
            setTitle("An error occurred")
            setMessage(error?.response?.data?.message)
            setColor("bg-danger text-white")
            setModal(!modal)
            clearState();
            fetchData()
            addToast()
          })
        }else{
            let datas = {
                nama_dermaga: form.get('nama_dermaga'),
                lokasi: form.get('lokasi'),
                id_syahbandar: form.get('id_petugas'),
              }

            axios.post(apiUrl + 'dermaga/edit/'+id, datas, headers)
            .then((res) => {
                setTitle("Action completed")
                setMessage("Entry has successfully been posted!")
                setColor("bg-success text-white")
                // setEdit(!edit)
                setModal(!modal)
                clearState()
                fetchData();
                addToast()
            }).catch((error) => {
                setTitle("An error occurred")
                setMessage(error?.response?.data?.message)
                setColor("bg-danger text-white")
                setModal(!modal)
                clearState()
                fetchData()
                addToast()
            })
        }
      }

      function clearState(){
        setNama('')
        setLokasi('')
        setId()
        setIdPetugas()
    }

    return(
        <>
        <Toast toasters={toasters} message={message} title={title} color={color}/>
                    <div className='card grey-thead'>
                        <div className="left-right-component">
                            <CButton
                            color="info"
                            variant="outline"
                            shape="square"
                            size="sm" 
                            style={{margin:'5px 10px'}}
                            onClick={() => 
                                {
                                    setTypeModal('Tambah')
                                    setModal(true)
                                }}
                            >
                                Tambah Dermaga
                            </CButton>
                    </div>
                    <hr/>
                      <CDataTable
                      items={dermagas}
                      fields={[
                        { key: 'nama_dermaga', label:'Nama Dermaga', _style: { width: '20%'}},
                        { key: 'lokasi', _style: { width: '10%'} },
                        { key: 'email', _style: { width: '10%'} },
                        { key: 'edit', label:'', _style: { width: '5%'}, sorter: false, filter: false },
                      ]}
                      columnFilter
                      button
                      hover
                      pagination
                      bordered
                      striped
                      size="sm"
                      itemsPerPage={10}
                      scopedSlots = {{
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
                                        setId(item.id_dermaga)
                                        setIdPetugas(item.id_syahbandar)
                                        setNama(item.nama_dermaga)
                                        setLokasi(item.lokasi)
                                        setModal(!modal)
                                    }}
                                    >
                                    Edit
                                    </CButton>
                                </td>
                            ),
                      }}
                    />
              </div>

              <CModal 
                show={modal} 
                onClose={() => setModal(!modal)}
                color='info'
                >
                    <CModalHeader closeButton>
                        <CModalTitle>{typeModal} Dermaga</CModalTitle>
                    </CModalHeader>
                    <CForm  onSubmit={submitHandler} method="post" encType="multipart/form-data" className="form-horizontal">
                    <CModalBody>
                            <CFormGroup row>
                                <CCol xs="12">
                                    <CLabel htmlFor="nameLabel">Nama Dermaga</CLabel>
                                    <CInput id={"nameInput"} placeholder="Nama Jenis Penumpang"
                                    onChange={(e) => { setNama(e.target.value); }}
                                    name="nama_dermaga" value={nama} required/>
                                </CCol>
                            </CFormGroup>
                            <CFormGroup row>
                                <CCol xs="12">
                                    <CLabel htmlFor="nameLabel">Lokasi</CLabel>
                                    <CInput id={"nameInput"} placeholder="Lokasi"
                                    onChange={(e) => { setLokasi(e.target.value); }}
                                    name="lokasi" value={lokasi} required/>
                                </CCol>
                            </CFormGroup>
                            <CFormGroup row>
                                <CCol xs="12">
                                    <CLabel htmlFor="statusLabel">Role</CLabel>
                                    <CSelect custom name="id_petugas" id={"statusLabel"} onChange={(e) => { setIdPetugas(e.target.value); }} required>
                                        {
                                            petugas.map((data) => {
                                                if(id_petugas && id_petugas === data.id){
                                                    return(
                                                        <option selected value={data.id}>{data.email}</option>
                                                    )
                                                }else{
                                                    return(
                                                        <option value={data.id}>{data.email}</option>
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
                        <CButton color="secondary" onClick={() => setModal(!modal)}>Cancel</CButton>
                    </CModalFooter>
                    </CForm>
                </CModal>
        </>
    )


}

export default MasterDermaga