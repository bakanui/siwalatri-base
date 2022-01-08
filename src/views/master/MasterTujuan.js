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
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import useToken from '../../../src/useToken';
import Moment from 'react-moment';
import { apiUrl } from './../../reusable/constants'
import 'moment-timezone';
// import { Link } from 'react-router-dom';

Moment.globalTimezone = 'Asia/Makassar';

const MasterTujuan = () => {

    const { token } = useToken();
    const [id, setId] = useState(0)
    const [nama, setNama] = useState('')
    const [typeModal, setTypeModal] = useState()  
    const [modal, setModal] = useState(false)

    const headers = {
        headers: {
          'Authorization': "bearer " + token 
        }
    }
    useEffect(() => {
        fetchData()
        // eslint-disable-next-line
    }, [])

    const [jenisTujuan, setJenisTujuan] = useState();

    const fetchData = async () => {
        const jenis = await axios.get(apiUrl + 'jenis_tujuan', headers)
        .catch(function (error) {
          if(error.response?.status === 401){
              localStorage.removeItem('access_token')
              window.location.reload()
          }
        })
        setJenisTujuan(jenis.data)
        console.log(jenis.data)
    }

    const submitHandler = (e) => {
        const form = new FormData(e.target);
        e.preventDefault();
        if(typeModal === 'Tambah'){
          let datas = {
            nama_tujuan: form.get('nama_tujuan'),
          }
          axios.post(apiUrl + 'jenis_tujuan', datas, headers)
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
                nama_tujuan: form.get('nama_tujuan'),
              }
             

            axios.post(apiUrl + 'jenis_tujuan/'+id, datas, headers)
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
                                Tambah Jenis Penumpang
                            </CButton>
                    </div>
                    <hr/>
                      <CDataTable
                      items={jenisTujuan}
                      fields={[
                        { key: 'nama_tujuan', label:'Tujuan Penumpang', _style: { width: '20%'}},
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
                                        setId(item.id_tujuan)
                                        setNama(item.nama_tujuan)
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
                            <CModalTitle>{typeModal} Jenis Tujuan Penumpang</CModalTitle>
                        </CModalHeader>
                        <CForm  onSubmit={submitHandler} method="post" encType="multipart/form-data" className="form-horizontal">
                        <CModalBody>
                                <CFormGroup row>
                                    <CCol xs="12">
                                        <CLabel htmlFor="nameLabel">Nama Jenis Tujuan</CLabel>
                                        <CInput id={"nameInput"} placeholder="Nama Jenis Tujuan"
                                        onChange={(e) => { setNama(e.target.value); }}
                                        name="nama_tujuan" value={nama} required/>
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

export default MasterTujuan