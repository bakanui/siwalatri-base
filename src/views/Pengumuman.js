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
import useToken from '../../src/useToken';
import Moment from 'react-moment';
import { apiUrl } from './../reusable/constants'
import 'moment-timezone';
import { Link } from 'react-router-dom';

Moment.globalTimezone = 'Asia/Makassar';

const Pengumuman = () => {

    const { token } = useToken();
    const [id, setId] = useState(0)
    const [judul, setJudul] = useState('')
    const [deskripsi, setDeskripsi] = useState('')
    const [typeModal, setTypeModal] = useState()  
    const [modal, setModal] = useState(false)

    const headers = {
        headers: {
          'Authorization': "bearer " + token 
        }
    }

    const [pengumumans, setPengumuman] = useState();

    const fetchData = async () => {
        const result = await axios.get(apiUrl + 'pengumuman', headers)
        .catch(function (error) {
          if(error.response?.status === 401){
              localStorage.removeItem('access_token')
              window.location.reload()
          }
        })
        setPengumuman(result.data.data.pengumumans)
        console.log(result.data.data.pengumumans)
    }

    
    useEffect(() => {
        fetchData()
    }, [])

    const submitHandler = (e) => {
        const form = new FormData(e.target);
        e.preventDefault();
        if(typeModal === 'Tambah'){
          let datas = {
            judul: form.get('judul'),
            deskripsi: form.get('deskripsi'),
          }
          axios.post(apiUrl + 'pengumuman', datas, headers)
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
        }else{
            let datas = {
                judul: form.get('judul'),
                deskripsi: form.get('deskripsi'),
              }
            axios.post(apiUrl + 'pengumuman/'+id+'/update', datas, headers)
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
        setJudul('')
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
                                Tambah Pengumuman
                            </CButton>
                    </div>
                    <hr/>
                      <CDataTable
                      items={pengumumans}
                      fields={[
                        { key: 'judul', label:'Judul', _style: { width: '20%'}},
                        { key: 'deskripsi', label:'Deskripsi', _style: { width: '20%'}},
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
                                        setId(item.id)
                                        setJudul(item.judul)
                                        setDeskripsi(item.deskripsi)
                                        setModal(!modal)
                                    }}
                                    >
                                    Edit
                                    </CButton>
                                </td>
                            ),
                      }}
                    />

                    <CModal 
                    show={modal} 
                    onClose={() => setModal(!modal)}
                    color='info'
                    >
                        <CModalHeader closeButton>
                            <CModalTitle>{typeModal} Pengumuman</CModalTitle>
                        </CModalHeader>
                        <CForm onSubmit={submitHandler}  method="post" encType="multipart/form-data" className="form-horizontal">
                        <CModalBody>
                                <CFormGroup row>
                                    <CCol xs="12">
                                        <CLabel htmlFor="nameLabel">Judul</CLabel>
                                        <CInput id={"nameInput"} placeholder="Judul"
                                        onChange={(e) => { setJudul(e.target.value); }}
                                        name="judul" value={judul} required/>
                                    </CCol>
                                </CFormGroup>
                                <CFormGroup row>
                                    <CCol xs="12">
                                        <CLabel htmlFor="nameLabel">Deskripsi</CLabel>
                                        <CTextarea required rows="6" value={deskripsi} placeholder="...." name="deskripsi" onChange={(e) => { setDeskripsi(e.target.value); }}>
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
            </div>
        </>
    )

}

export default Pengumuman