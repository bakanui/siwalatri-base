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
//   CInput, 
  CTextarea, 
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import useToken from '../../../src/useToken';
import Moment from 'react-moment';
import { apiUrl } from './../../reusable/constants'
import 'moment-timezone';
// import { Link } from 'react-router-dom';

Moment.globalTimezone = 'Asia/Makassar';

const MasterSOP = () => {

    const { token } = useToken();
    const [id, setId] = useState(0)
    const [nama, setNama] = useState('')
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

    const [sops, setSOP] = useState();

    const fetchData = async () => {
        const sops = await axios.get(apiUrl + 'sop', headers)
        .catch(function (error) {
          if(error.response?.status === 401){
              localStorage.removeItem('access_token')
              window.location.reload()
          }
        })
        setSOP(sops.data)
        console.log(sops.data)
    }

    const delSubmit = (e) => {
        // const form = new FormData(e.target);
        e.preventDefault();
        axios.get(apiUrl + 'sop/delete/'+id, headers)
          .then((res) => {
            // setTitle("Action completed")
            // setMessage("Entry has successfully been posted!")
            // setColor("bg-success text-white")
            // setEdit(!edit)
            setModalDelete(false)
            setId('');
            fetchData();
            // addToast()
          }).catch((error) => {
            // setTitle("An error occurred")
            // setMessage(error?.response?.data?.message)
            // setColor("bg-danger text-white")
            setModalDelete(false)
            setId('');
            fetchData()
            // addToast()
          })

    }

    const submitHandler = (e) => {
        const form = new FormData(e.target);
        e.preventDefault();
        if(typeModal === 'Tambah'){
          let datas = {
            description: form.get('deskripsi'),
          }
          axios.post(apiUrl + 'sop', datas, headers)
          .then((res) => {
            // setTitle("Action completed")
            // setMessage("Entry has successfully been posted!")
            // setColor("bg-success text-white")
            // setEdit(!edit)
            setModal(!modal)
            setNama('');
            fetchData();
            // addToast()
          }).catch((error) => {
            // setTitle("An error occurred")
            // setMessage(error?.response?.data?.message)
            // setColor("bg-danger text-white")
            setModal(!modal)
            setNama('');
            fetchData()
            // addToast()
          })
        }else{
            let datas = {
                description: form.get('deskripsi'),
            }
            axios.post(apiUrl + 'sop/'+id, datas, headers)
            .then((res) => {
                // setTitle("Action completed")
                // setMessage("Entry has successfully been posted!")
                // setColor("bg-success text-white")
                // setEdit(!edit)
                setModal(!modal)
                setId();
                setNama('');
                fetchData();
                // addToast()
            }).catch((error) => {
                // setTitle("An error occurred")
                // setMessage(error?.response?.data?.message)
                // setColor("bg-danger text-white")
                setModal(!modal)
                setId();
                setNama('');
                fetchData()
                // addToast()
            })
        }
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
                                Tambah SOP
                            </CButton>
                    </div>
                    <hr/>
                      <CDataTable
                      items={sops}
                      fields={[
                        { key: 'description', _style: { width: '20%'}},
                        { key: 'created_at', _style: { width: '10%'} },
                        { key: 'edit', label:'', _style: { width: '1%'}, sorter: false, filter: false },
                        { key: 'delete', label:'', _style: { width: '1%'}, sorter: false, filter: false },
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
                                        setNama(item.description)
                                        setModal(!modal)
                                    }}
                                    >
                                    Edit
                                    </CButton>
                                </td>
                            ),
                            'delete':
                            (item)=>(
                                    <td className="py-2">
                                        <CButton
                                        color="danger"
                                        variant="outline"
                                        shape="square"
                                        size="sm"
                                        onClick={()=>{
                                            setId(item.id)
                                            setModalDelete(!delmodal)
                                        }}
                                        >
                                        Delete
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
                            <CModalTitle>{typeModal} SOP</CModalTitle>
                        </CModalHeader>
                        <CForm  onSubmit={submitHandler} method="post" encType="multipart/form-data" className="form-horizontal">
                        <CModalBody>
                                <CFormGroup row>
                                    <CCol xs="12">
                                        <CLabel htmlFor="nameLabel">Deskripsi</CLabel>
                                        <CTextarea required rows="6" value={nama} placeholder="...." name="deskripsi" onChange={(e) => { setNama(e.target.value); }}>
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

                    <CModal 
                    show={delmodal} 
                    onClose={() => setModalDelete(!delmodal)}
                    color='info'
                    >
                        <CModalHeader closeButton>
                            <CModalTitle>Delete SOP</CModalTitle>
                        </CModalHeader>
                        <CForm  onSubmit={delSubmit} method="post" encType="multipart/form-data" className="form-horizontal">
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
              </div>
        </>
    )


}

export default MasterSOP