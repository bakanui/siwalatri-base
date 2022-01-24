import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  // CBadge,
  // CCardBody,
  // CCardFooter,
  CCol,
  // CHeader,
  CDataTable,
  // CLink,
  // CWidgetIcon,
  // CRow,
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
  // CTextarea, 
  CSelect
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import useToken from '../../../src/useToken';
import Moment from 'react-moment';
import { apiUrl } from './../../reusable/constants'
import 'moment-timezone';
// import { Link } from 'react-router-dom';
import Toast from './../../reusable/toast';
import ToastMaker from './../../reusable/toastMaker';

Moment.globalTimezone = 'Asia/Makassar';

const Petugas = () => {
      const { token } = useToken();
      const [modal, setModal] = useState(false)
      // eslint-disable-next-line
      const [id, setId] = useState(0)
      const [email, setEmail] = useState('')
      const [password, setPassword] = useState('')
      // eslint-disable-next-line
      const [type, setType] = useState('')
      const [typeModal, setTypeModal] = useState()  
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

      const [petugas, setPetugas] = useState();

      const fetchData = async () => {
          const result = await axios.get(apiUrl + 'user', headers)
          .catch(function (error) {
            if(error.response?.status === 401){
                localStorage.removeItem('access_token')
                window.location.reload()
            }
          })
          setPetugas(result.data)
          console.log(result.data)
      }

      function clearState(){
        setEmail('')
        setPassword('')
        setType('')
        setId()
    }

    const submitHandler = (e) => {
      const form = new FormData(e.target);
      e.preventDefault();
      if(typeModal === 'Tambah'){
        let auth = {
          email: form.get('email'),
          password: form.get('password'),
          type: form.get('type'),
        }
        axios.post(apiUrl + 'auth/register_armada', auth, headers)
        .then((res) => {
              console.log(res);
              setTitle("Action completed")
              setMessage("Entry has successfully been posted!")
              setColor("bg-success text-white")
              setModal(!modal)
              clearState();
              fetchData()
              addToast()
        }).catch((error) => {
          setTitle("An error occurred")
          setMessage(error?.response?.data?.message)
          setColor("bg-danger text-white")
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
                                Tambah Petugas
                            </CButton>
                    </div>
                    <hr/>
                      <CDataTable
                      items={petugas}
                      fields={[
                        { key: 'email', _style: { width: '10%'}},
                        { key: 'type', _style: { width: '10%'} },
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
                              {item.email}
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
                                        setEmail(item.email)
                                        setPassword(item.password)
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
                        <CModalTitle>{typeModal} Petugas</CModalTitle>
                    </CModalHeader>
                    <CForm onSubmit={submitHandler}  method="post" encType="multipart/form-data" className="form-horizontal">
                    <CModalBody>
                             <CFormGroup row>
                                    <CCol xs="12">
                                    <CLabel htmlFor="statusLabel">Role</CLabel>
                                    <CSelect custom name="type" id={"statusLabel"} onChange={(e) => { setType(e.target.value); }} required>
                                        <option  value="">-</option>
                                        <option  value="admin">Admin</option>
                                        <option  value="syahbandar">Syahbandar</option>
                                        <option  value="wisata">Wisata</option>
                                        <option  value="pelapor">Pelapor</option>
                                    </CSelect>
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

export default Petugas;