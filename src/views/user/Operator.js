import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  CBadge,
  CCardBody,
  CCardFooter,
  CCol,
  CHeader,
  CDataTable,
  CLink,
  CWidgetIcon,
  CRow,
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
  CTextarea, 
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import useToken from '../../../src/useToken';
import Moment from 'react-moment';
import { apiUrl } from './../../reusable/constants'
import 'moment-timezone';
import { Link } from 'react-router-dom';

Moment.globalTimezone = 'Asia/Makassar';

const Operator = () => {

    const { token } = useToken();
    const [modal, setModal] = useState(false)
    const [id, setId] = useState(0)
    const [nama, setNama] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [kontak, setKontak] = useState('')
    const [alamat, setAlamat] = useState('')
    const [deskripsi, setDeskripsi] = useState('')
    const [typeModal, setTypeModal] = useState()  
    const headers = {
      headers: {
        'Authorization': "bearer " + token 
      }
    }

    useEffect(() => {
        fetchData()
    }, [])

    const [operator, setOperator] = useState();

    const fetchData = async () => {
        const operators = await axios.get(apiUrl + 'armada', headers)
        .catch(function (error) {
          if(error.response?.status === 401){
              localStorage.removeItem('access_token')
              window.location.reload()
          }
        })
        setOperator(operators.data)
        console.log(operators.data)
    }

    const submitHandler = (e) => {
        const form = new FormData(e.target);
        e.preventDefault();
        if(typeModal === 'Tambah'){
          let auth = {
            email: form.get('email'),
            password: form.get('password'),
            type: 'armada',
          }
          axios.post(apiUrl + 'auth/register_armada', auth, headers)
          .then((res) => {
            let data = {
                id_user: res.data.user.id,
                nama_armada: form.get('nama_armada'),
                kontak: form.get('kontak'),
                alamat: form.get('alamat'),
                description: form.get('description'),
              }

            axios.post(apiUrl + 'armada', data, headers)
            .then((res) => {
                console.log(res);
                setModal(!modal)
                clearState();
                fetchData()
            })

          }).catch((error) => {
            // setTitle("An error occurred")
            // setMessage(error?.response?.data?.message)
            // setColor("bg-danger text-white")
            setModal(!modal)
            clearState();
            fetchData()
            // addToast()
          })
        }else{
            // let datas = {
            //     description: form.get('deskripsi'),
            // }
            // axios.post(apiUrl + 'sop/'+id, datas, headers)
            // .then((res) => {
            //     // setTitle("Action completed")
            //     // setMessage("Entry has successfully been posted!")
            //     // setColor("bg-success text-white")
            //     // setEdit(!edit)
            //     setModal(!modal)
            //     clearState();
            //     fetchData();
            //     // addToast()
            // }).catch((error) => {
            //     // setTitle("An error occurred")
            //     // setMessage(error?.response?.data?.message)
            //     // setColor("bg-danger text-white")
            //     setModal(!modal)
            //     clearState();
            //     fetchData()
            //     // addToast()
            // })
        }
      }

      function clearState(){
          setNama('')
          setEmail('')
          setPassword('')
          setKontak('')
          setAlamat('')
          setDeskripsi('')
          setId()
      }

    return(
        <>

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
                                Tambah Operator
                            </CButton>
                    </div>
                    <hr/>
                      <CDataTable
                      items={operator}
                      fields={[
                        { key: 'id_armada', _style: { width: '10%'}},
                        { key: 'nama_armada', _style: { width: '10%'} },
                        { key: 'kontak', _style: { width: '10%'} },
                        { key: 'email', _style: { width: '10%'}, sorter: false, filter: false  },
                        { key: 'description', _style: { width: '20%'} },
                        { key: 'created_at', _style: { width: '5%'} },
                        { key: 'edit', label:'', _style: { width: '1%'}, sorter: false, filter: false },
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
                        'email':
                        (item)=>(
                          <td>
                              {item.armada_to_user[0].email}
                          </td>
                        ),
                        'created_at':
                          (item)=>(
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
                                        setNama(item.nama_armada)
                                        // setEmail(item.email)
                                        // setKontak(item.description)
                                        setAlamat(item.alamat)
                                        setDeskripsi(item.description)
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
                        <CModalTitle>{typeModal} Operator</CModalTitle>
                    </CModalHeader>
                    <CForm onSubmit={submitHandler}  method="post" encType="multipart/form-data" className="form-horizontal">
                    <CModalBody>
                            <CFormGroup row>
                                <CCol xs="12">
                                    <CLabel htmlFor="nameLabel">Nama Operator</CLabel>
                                    <CInput id={"nameInput"} placeholder="Nama Operator"
                                    onChange={(e) => { setNama(e.target.value); }}
                                    name="nama_armada" value={nama} required/>
                                </CCol>
                            </CFormGroup>
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
                            <CFormGroup row>
                                <CCol xs="12">
                                    <CLabel htmlFor="nameLabel">Kontak</CLabel>
                                    <CInput id={"nameInput"} placeholder="Kontak"
                                    onChange={(e) => { setKontak(e.target.value); }}
                                    name="kontak" value={kontak} required/>
                                </CCol>
                                
                            </CFormGroup>
                            <CFormGroup row>
                                <CCol xs="12">
                                        <CLabel htmlFor="nameLabel">Alamat</CLabel>
                                        <CTextarea required rows="3" value={alamat} placeholder="...." name="alamat" onChange={(e) => { setAlamat(e.target.value); }}>
                                        </CTextarea>
                                </CCol>
                            </CFormGroup>
                            <CFormGroup row>
                                <CCol xs="12">
                                        <CLabel htmlFor="nameLabel">Deskripsi</CLabel>
                                        <CTextarea required rows="3" value={deskripsi} placeholder="...." name="description " onChange={(e) => { setDeskripsi(e.target.value); }}>
                                        </CTextarea>
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

export default Operator;