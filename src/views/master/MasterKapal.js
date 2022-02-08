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
  CTextarea, 
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

const MasterKapal = () => {
    const { token } = useToken();
    const [modalKapal, setModalKapal] = useState(false)
    const [id, setId] = useState(0)
    const [namaKapal, setNamaKapal] = useState('')
    const [deskripsiKapal, setDeskripsiKapal] = useState('')
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

    const [jenisKapal, setJenisKapal] = useState();

    const fetchData = async () => {
        const jenis = await axios.get(apiUrl + 'jenis_kapal', headers)
        .catch(function (error) {
          if(error.response?.status === 401){
              localStorage.removeItem('access_token')
              window.location.reload()
          }
        })
        setJenisKapal(jenis.data)
        // console.log(jenis.data)
    }

    const submitHandler = (e) => {
        const form = new FormData(e.target);
        e.preventDefault();
        if(typeModal === 'Tambah'){
          let datas = {
            nama_jenis: form.get('nama'),
            description: form.get('deskripsi'),
          }
          
    
          axios.post(apiUrl + 'jenis_kapal', datas, headers)
          .then((res) => {
            setTitle("Action completed")
            setMessage("Entry has successfully been posted!")
            setColor("bg-success text-white")
            // setEdit(!edit)
            setModalKapal(!modalKapal)
            setNamaKapal('');
            setDeskripsiKapal('');
            fetchData();
            addToast()
          }).catch((error) => {
            setTitle("An error occurred")
            setMessage(error?.response?.data?.message)
            setColor("bg-danger text-white")
            setModalKapal(!modalKapal)
            setNamaKapal('');
            setDeskripsiKapal('');
            fetchData()
            addToast()
          })
        }else{
            let datas = {
                nama_jenis: form.get('nama'),
                description: form.get('deskripsi'),
              }
             

            axios.post(apiUrl + 'jenis_kapal/'+id, datas, headers)
            .then((res) => {
                setTitle("Action completed")
                setMessage("Entry has successfully been posted!")
                setColor("bg-success text-white")
                // setEdit(!edit)
                setModalKapal(!modalKapal)
                setId();
                setNamaKapal('');
                setDeskripsiKapal('');
                fetchData();
                addToast()
            }).catch((error) => {
                setTitle("An error occurred")
                setMessage(error?.response?.data?.message)
                setColor("bg-danger text-white")
                setModalKapal(!modalKapal)
                setId();
                setNamaKapal('');
                setDeskripsiKapal('');
                fetchData()
                addToast()
            })
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
                                    setModalKapal(true)
                                }}
                            >
                                Tambah Kapal
                            </CButton>
                    </div>
                    <hr/>
                      <CDataTable
                      items={jenisKapal}
                      fields={[
                        { key: 'nama_jenis', _style: { width: '20%'}},
                        { key: 'description', _style: { width: '20%'} },
                        { key: 'created_at', _style: { width: '10%'} },
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
                                        setId(item.id_jenis)
                                        setNamaKapal(item.nama_jenis)
                                        setDeskripsiKapal(item.description)
                                        setModalKapal(!modalKapal)
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
                show={modalKapal} 
                onClose={() => setModalKapal(!modalKapal)}
                color='info'
                >
                <CModalHeader closeButton>
                    <CModalTitle>{typeModal} Kapal</CModalTitle>
                </CModalHeader>
                <CForm onSubmit={submitHandler}  method="post" encType="multipart/form-data" className="form-horizontal">
                <CModalBody>
                        <CFormGroup row>
                            <CCol xs="12">
                                <CLabel htmlFor="nameLabel">Nama Kapal</CLabel>
                                <CInput id={"nameInput"} placeholder="Nama Kapal"
                                onChange={(e) => { setNamaKapal(e.target.value); }}
                                name="nama" value={namaKapal} required/>
                            </CCol>
                        </CFormGroup>
                        <CFormGroup row>
                            <CCol xs="12">
                                <CLabel htmlFor="mainNameLabel">Deskripsi</CLabel>
                                <CTextarea required rows="6" value={deskripsiKapal} placeholder="...." name="deskripsi" onChange={(e) => { setDeskripsiKapal(e.target.value); }}> 
                                </CTextarea>
                            </CCol>
                        </CFormGroup> 
                </CModalBody>
                <CModalFooter>
                    <CButton type="submit" color="primary">
                        <CIcon name="cil-scrubber" /> Submit
                    </CButton>{' '}
                    <CButton color="secondary" onClick={() => setModalKapal(!modalKapal)}>Cancel</CButton>
                </CModalFooter>
                </CForm>
                </CModal>
        </>
    )
}

export default MasterKapal