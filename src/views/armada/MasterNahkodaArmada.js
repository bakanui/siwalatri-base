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
  CSelect
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import useToken from '../../useToken';
import Moment from 'react-moment';
import { apiUrl } from '../../reusable/constants'
import 'moment-timezone';
// import { Link } from 'react-router-dom';

Moment.globalTimezone = 'Asia/Makassar';

const MasterNahkodaArmada = () => {
    const { token, id } = useToken();
    const headers = {
        headers: {
          'Authorization': "bearer " + token 
        }
      }

    const [typeModal, setTypeModal] = useState() 
    const [modal, setModal] = useState(false) 
    const [delmodal, setModalDelete] = useState(false)
    const [id_nahkoda, setIdNahkoda] = useState(0)
    const [nama, setNama] = useState('')
    const [no_hp, setNoHP] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [id_kecakapan, setIdKecakapan] = useState(0)

    useEffect(() => {
        fetchData()
        // eslint-disable-next-line
    }, [])

    const [nahkodas, setNahkoda] = useState([]);
    const [kecakapans, setKecakapan] = useState([]);

    const fetchData = async () => {
        const result = await axios.get(apiUrl + 'nahkoda/'+id, headers)
        .catch(function (error) {
          if(error.response?.status === 401){
              localStorage.removeItem('access_token')
              window.location.reload()
          }
        })
        setNahkoda(result.data)
        console.log(result.data)

        const kecakapan = await axios.get(apiUrl + 'kecakapan',headers)
        setKecakapan(kecakapan.data)
        console.log(kecakapan.data)

    }

    const submitHandler = (e) => {
      const form = new FormData(e.target);
      e.preventDefault();
      if(typeModal === 'Tambah'){
        let datas = {
          nama_nahkoda: form.get('nama'),
          email : form.get('email'),
          password : form.get('password'),
          type : 'nahkoda',
          id_armada : id,
          no_hp : form.get('no_hp'),
          id_kecakapan : form.get('id_kecakapan'),
        }
        console.log(datas);
        axios.post(apiUrl + 'auth/register_nahkoda', datas, headers)
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
          nama_nahkoda: form.get('nama'),
          no_hp : form.get('no_hp'),
          id_kecakapan : form.get('id_kecakapan'),
        }
        console.log(datas);
        axios.post(apiUrl + 'nahkoda/profile/'+id_nahkoda, datas, headers)
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

      }else{
        axios.get(apiUrl + 'nahkoda/profile/delete/'+id_nahkoda, headers)
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
        setNoHP('')
        setEmail('')
        setPassword('')
        setIdKecakapan('')
        setIdNahkoda('')
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
                          Tambah Nahkoda
                      </CButton>
                      <CDataTable
                          items={nahkodas}
                          fields={[
                            { key: 'nama_nahkoda', _style: { width: '15%'}},
                            { key: 'no_hp', _style: { width: '10%'} },
                            { key: 'nama_kecakapan', _style: { width: '10%'} },
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
                                          setNama(item.nama_nahkoda)
                                          setNoHP(item.no_hp)
                                          setIdKecakapan(item.id_kecakapan)
                                          setIdNahkoda(item.id_nahkoda)
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
                                            setIdNahkoda(item.id_nahkoda)
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
                        <CModalTitle>{typeModal} Nahkoda</CModalTitle>
                    </CModalHeader>
                    <CForm  onSubmit={submitHandler} method="post" encType="multipart/form-data" className="form-horizontal">
                    <CModalBody>
                            <CFormGroup row>
                                <CCol xs="12">
                                    <CLabel htmlFor="nameLabel">Nama Nahkoda</CLabel>
                                    <CInput id={"nameInput"} placeholder="Nama Nahkoda"
                                    onChange={(e) => { setNama(e.target.value); }}
                                    name="nama" value={nama} required/>
                                </CCol>
                            </CFormGroup>
                            <CFormGroup row>
                                <CCol xs="12">
                                    <CLabel htmlFor="nameLabel">No Hp</CLabel>
                                    <CInput id={"nameInput"} placeholder="No HP"
                                    onChange={(e) => { setNoHP(e.target.value); }}
                                    name="no_hp" value={no_hp} required/>
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
                            <CFormGroup row>
                                <CCol xs="6">
                                    <CLabel htmlFor="nameLabel">Kecakapan Nahkoda</CLabel>
                                    <CSelect custom name="id_kecakapan" id={"statusLabel"} onChange={(e) => { setIdKecakapan(e.target.value); }} required>
                                     {
                                            kecakapans.map((data,index) => {
                                                if(id_kecakapan && id_kecakapan === data.id_kecakapan){
                                                    return(
                                                        <option key={index} selected value={data.id_kecakapan}>{data.nama_kecakapan}</option>
                                                    )
                                                }else{
                                                    return(
                                                        <option key={index} value={data.id_kecakapan}>{data.nama_kecakapan}</option>
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
                        <CButton color="secondary" onClick={() => setModalDelete(!delmodal)}>Cancel</CButton>
                    </CModalFooter>
                    </CForm>
                </CModal>
        </>
    )

}

export default MasterNahkodaArmada;