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
  CInput
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import useToken from '../../../src/useToken';
import Moment from 'react-moment';
import { apiUrl } from './../../reusable/constants'
import 'moment-timezone';
// import { Link } from 'react-router-dom';

Moment.globalTimezone = 'Asia/Makassar';

const MasterLoket = () => {

    const { token, id } = useToken();
    const headers = {
        headers: {
        'Authorization': "bearer " + token 
        }
    }

    const [typeModal, setTypeModal] = useState() 
    const [modal, setModal] = useState(false) 
    const [delmodal, setModalDelete] = useState(false)
    const [id_loket, setIdLoket] = useState(0)
    const [nama, setNama] = useState('')
    const [lokasi, setLokasi] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    useEffect(() => {
        fetchData()
        // eslint-disable-next-line
    }, [])

    const [lokets, setLoket] = useState([]);

    const fetchData = async () => {
        const result = await axios.get(apiUrl + 'loket/'+id, headers)
        .catch(function (error) {
        if(error.response?.status === 401){
            localStorage.removeItem('access_token')
            window.location.reload()
        }
        })
        setLoket(result.data)
        // console.log(result.data)
    }

    const submitHandler = (e) => {
        const form = new FormData(e.target);
        e.preventDefault();
        if(typeModal === 'Tambah'){
          let datas = {
            nama_loket: form.get('nama'),
            email : form.get('email'),
            password : form.get('password'),
            type : 'loket',
            id_armada : id,
            lokasi_loket : form.get('lokasi'),
          }
        //   console.log(datas);
          axios.post(apiUrl + 'auth/register_loket', datas, headers)
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
                nama_loket: form.get('nama'),
                lokasi_loket : form.get('lokasi'),
              }
              axios.post(apiUrl + 'loket/edit/'+id_loket, datas, headers)
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
              axios.get(apiUrl + 'loket/delete/'+id_loket, headers)
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

    function clearState(){
        setNama('')
        setLokasi('')
        setEmail('')
        setPassword('')
        setIdLoket(0)
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
                    Tambah Loket
                </CButton>
                <CDataTable
                    items={lokets}
                    fields={[
                        { key: 'nama_loket', _style: { width: '15%'}},
                        { key: 'lokasi_loket', _style: { width: '10%'} },
                        { key: 'email', _style: { width: '10%'} },
                        { key: 'created_at', _style: { width: '10%'} },
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
                            'email': 
                            (item)=> (
                            <td>
                                {item.loket_to_user.email}
                            </td>
                            ),
                            'created_at': 
                            (item)=> (
                            <td>
                                <Moment format="D/MM/Y H:m a">{item.created_at}</Moment>
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
                                            setIdLoket(item.id_loket)
                                            setNama(item.nama_loket)
                                            setLokasi(item.lokasi_loket)
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
                                            setIdLoket(item.id_loket)
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
                        <CModalTitle>{typeModal} Loket</CModalTitle>
                    </CModalHeader>
                    <CForm  onSubmit={submitHandler} method="post" encType="multipart/form-data" className="form-horizontal">
                    <CModalBody>
                            <CFormGroup row>
                                <CCol xs="12">
                                    <CLabel htmlFor="nameLabel">Nama Loket</CLabel>
                                    <CInput id={"nameInput"} placeholder="Nama Loket"
                                    onChange={(e) => { setNama(e.target.value); }}
                                    name="nama" value={nama} required/>
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
                            {(() => {
                                  if(typeModal === 'Tambah'){
                                    return(
                                      <CFormGroup row>
                                          <CCol xs="6">
                                              <CLabel htmlFor="nameLabel">Email</CLabel>
                                              <CInput id={"nameInput"} placeholder="Email"
                                              onChange={(e) => { setEmail(e.target.value); }}
                                              name="email" value={email} required/>
                                          </CCol>
                                          <CCol xs="6">
                                              <CLabel htmlFor="nameLabel">Password</CLabel>
                                              <CInput id={"nameInput"} placeholder="Password"
                                              onChange={(e) => { setPassword(e.target.value); }}
                                              name="password" type="password" value={password} required/>
                                          </CCol>
                                      </CFormGroup>
                                    )
                                  }
                            })()}
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
                    onClose={() => {setModalDelete(!delmodal);clearState()}}
                    color='info'
                    >
                    <CModalHeader closeButton>
                        <CModalTitle>Delete Nahkoda</CModalTitle>
                    </CModalHeader>
                    <CForm onSubmit={submitHandler} method="post" encType="multipart/form-data" className="form-horizontal">
                    <CModalBody>
                          <h5>Anda Yakin ingin menghapus data ini?</h5>
                    </CModalBody>
                    <CModalFooter>
                        <CButton type="submit" color="primary">
                            <CIcon name="cil-scrubber" /> Submit
                        </CButton>{' '}
                        <CButton color="secondary" onClick={() => {setModalDelete(!delmodal);clearState()}}>Cancel</CButton>
                    </CModalFooter>
                    </CForm>
                </CModal>
        </>
    )

}
export default MasterLoket