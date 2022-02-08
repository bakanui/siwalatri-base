import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  CBadge,
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
import 'moment-timezone';
// import { Link } from 'react-router-dom';

Moment.globalTimezone = 'Asia/Makassar';

const MasterRute = () => {
    const { token } = useToken();
    const [id, setId] = useState(0)
    const [jarak, setJarak] = useState('')
    const [typeModal, setTypeModal] = useState()  
    const [modal, setModal] = useState(false)
    const [rute, setRute] = useState();
    const [dermaga, setDermaga] = useState({data: []});
    const [awal, setTujuanAwal] = useState();
    const [akhir, setTujuanAkhir] = useState()  

    const headers = {
        headers: {
          'Authorization': "bearer " + token 
        }
    }
    useEffect(() => {
        fetchData()
        // eslint-disable-next-line
    }, [])

    const fetchData = async () => {
        const rute = await axios.get(apiUrl + 'rute', headers)
        .catch(function (error) {
          if(error.response?.status === 401){
              localStorage.removeItem('access_token')
              window.location.reload()
          }
        })
        setRute(rute.data)

        const dermaga = await axios.get(apiUrl + 'dermaga', headers)
        .catch(function (error) {
          if(error.response?.status === 401){
              localStorage.removeItem('access_token')
              window.location.reload()
          }
        })
        setDermaga(dermaga)
    }

    const submitHandler = (e) => {
        const form = new FormData(e.target);
        e.preventDefault();
        // console.log(id);
        if(typeModal === 'Tambah'){
          let datas = {
            tujuan_awal: form.get('tujuan_awal'),
            tujuan_akhir: form.get('tujuan_akhir'),
            jarak: form.get('jarak'),
          }
          

          axios.post(apiUrl + 'rute', datas, headers)
          .then((res) => {
            // setTitle("Action completed")
            // setMessage("Entry has successfully been posted!")
            // setColor("bg-success text-white")
            // setEdit(!edit)
            setModal(!modal)
            setTujuanAwal('');
            setTujuanAkhir('');
            setJarak('');
            fetchData();
            // addToast()
          }).catch((error) => {
            // setTitle("An error occurred")
            // setMessage(error?.response?.data?.message)
            // setColor("bg-danger text-white")
            setModal(!modal)
            setTujuanAwal('');
            setTujuanAkhir('');
            setJarak('');
            fetchData()
            // addToast()
          })
        }else{
            let datas = {
                tujuan_awal: form.get('tujuan_awal'),
                tujuan_akhir: form.get('tujuan_akhir'),
                jarak: form.get('jarak'),
              }
              

            axios.post(apiUrl + 'rute/'+id, datas, headers)
            .then((res) => {
                // setTitle("Action completed")
                // setMessage("Entry has successfully been posted!")
                // setColor("bg-success text-white")
                // setEdit(!edit)
                setModal(!modal)
                setTujuanAwal('');
                setTujuanAkhir('');
                setJarak('');
                fetchData();
                // addToast()
            }).catch((error) => {
                // setTitle("An error occurred")
                // setMessage(error?.response?.data?.message)
                // setColor("bg-danger text-white")
                setModal(!modal)
                setTujuanAwal('');
                setTujuanAkhir('');
                setJarak('');
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
                                Tambah Rute
                            </CButton>
                        </div>
                    <hr/>
                      <CDataTable
                      items={rute}
                      fields={[
                        { key: 'rute', label:'Rute Keberangkatan', _style: { width: '20%'}, sorter: false, filter: false},
                        { key: 'jarak', _style: { width: '1%'}, sorter: false, filter: false },
                        { key: 'created_at', label:'Created at', _style: { width: '5%'}, sorter: false, filter: false },
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
                        'rute':
                        (item)=>(
                          <td>
                             {item.tujuan_awals.nama_dermaga}  <CBadge color="warning">{item.tujuan_awals.lokasi}</CBadge> <CIcon name="cil-arrow-right" className="mfe-2" /> {item.tujuan_akhirs.nama_dermaga} <CBadge color="warning">{item.tujuan_akhirs.lokasi}</CBadge>
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
                                        setId(item.id_rute)
                                        setTujuanAwal(item.tujuan_awals.id_dermaga)
                                        setTujuanAkhir(item.tujuan_akhirs.id_dermaga)
                                        setJarak(item.jarak)
                                        setModal(true)
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
                            <CModalTitle>{typeModal} Rute</CModalTitle>
                        </CModalHeader>
                        <CForm onSubmit={submitHandler}  method="post" encType="multipart/form-data" className="form-horizontal">
                        <CModalBody>
                                <CFormGroup row>
                                    <CCol md="3">
                                    <CLabel htmlFor="statusLabel">Tujuan Awal</CLabel>
                                    </CCol>
                                    <CCol xs="12" md="9">
                                    <CSelect custom name="tujuan_awal" id={"statusLabel"} onChange={(e) => { setTujuanAwal(e.target.value); }}>
                                        {
                                            dermaga.data.map((data) => {
                                                if(awal && awal === data.id_dermaga){
                                                    return(
                                                        <option selected value={data.id_dermaga}>{data.nama_dermaga} - {data.lokasi}</option>
                                                    )
                                                }else{
                                                    return(
                                                        <option value={data.id_dermaga}>{data.nama_dermaga} - {data.lokasi}</option>
                                                    )
                                                }
                                                
                                            })
                                        }
                                    </CSelect>
                                    </CCol>
                                </CFormGroup>  
                                <CFormGroup row>
                                    <CCol md="3">
                                    <CLabel htmlFor="statusLabel">Tujuan Akhir</CLabel>
                                    </CCol>
                                    <CCol xs="12" md="9">
                                    <CSelect custom name="tujuan_akhir" id={"statusLabel"} onChange={(e) => { setTujuanAkhir(e.target.value); }}>
                                        {
                                            dermaga.data.map((data) => {
                                                if(akhir && akhir === data.id_dermaga){
                                                    return(
                                                        <option selected value={data.id_dermaga}>{data.nama_dermaga} - {data.lokasi}</option>
                                                    )
                                                }else{
                                                    return(
                                                        <option value={data.id_dermaga}>{data.nama_dermaga} - {data.lokasi}</option>
                                                    )
                                                }
                                            })
                                        }
                                    </CSelect>
                                    </CCol>
                                </CFormGroup>  
                                <CFormGroup row>
                                    <CCol xs="12">
                                        <CLabel htmlFor="nameLabel">Jarak</CLabel>
                                        <CInput id={"nameInput"} placeholder="Jarak"
                                        onChange={(e) => { setJarak(e.target.value); }}
                                        name="jarak" value={jarak} required/>
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

export default MasterRute
