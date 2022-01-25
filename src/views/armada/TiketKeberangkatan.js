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
  CSelect,
  CBadge,
  CCard,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import useToken from '../../useToken';
import Moment from 'react-moment';
import { apiUrl } from '../../reusable/constants'
import 'moment-timezone';
import dayjs from 'dayjs';
import { useParams } from 'react-router-dom';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import _ from "lodash";
import Toast from './../../reusable/toast';
import ToastMaker from './../../reusable/toastMaker';


Moment.globalTimezone = 'Asia/Makassar';

const TiketKeberangkatan = () => {
  const { token,type,id } = useToken();
  const { id_jadwal } = useParams();
  const headers = {
    headers: {
      'Authorization': "bearer " + token 
    },
    timeout: 10000 
  }
  const [datas, setData] = useState([]);
  const [jenisPenumpang, setJenisPenumpang] = useState([]);

  const [typeModal, setTypeModal] = useState()  
  const [modal, setModal] = useState(false)
  const [delmodal, setModalDelete] = useState(false)
  const [id_tiket, setIdTiket] = useState(0);
  const [nama_tiket, setNamaTiket] = useState('');
  const [harga_tiket, setHargaTiket] = useState(0);
  const [id_jns_penum, setIdJenisPenum] = useState(0);

  //Toast
  const { toasters, addToast } = ToastMaker()
  const [title, setTitle] = useState("")
  const [message, setMessage] = useState("")
  const [color, setColor] = useState("")

  useEffect(() => {
    fetchData()
    // eslint-disable-next-line
  }, [])


  const fetchData = async () => {
    
      const result = await axios.get(apiUrl + 'jadwal_keberangkatan/view/tiket/'+id_jadwal, headers)
      .catch(function (error) {
        if(error.response?.status === 401){
            localStorage.removeItem('access_token')
            window.location.reload()
        }
      })
      setData(result.data)
      console.log(result.data)
      const jenis = await axios.get(apiUrl + 'jenis_penumpang', headers)
      .catch(function (error) {
        if(error.response?.status === 401){
            localStorage.removeItem('access_token')
            window.location.reload()
        }
      })
      setJenisPenumpang(jenis.data)
  }


  const fields = [
    { key: 'no', _style: { width: '1%'} },
    { key: 'nama_tiket', _style: { width: '15%'} },
    { key: 'nama_jns_penum', label:'Jenis penumpang', _style: { width: '15%'} },
    { key: 'harga', _style: { width: '10%'} },
    { key: 'edit', _style: { width: '1%'} },
    { key: 'delete', _style: { width: '1%'} },
  ]


  function clearState(){
    setNamaTiket('')
    setIdJenisPenum()
    setIdTiket()
    setHargaTiket(0)
  }

  const submitHandler = (e) => {
    const form = new FormData(e.target);
    e.preventDefault();
    if(typeModal === 'Tambah'){
    let datas = {
      nama: form.get('nama_tiket'),
      harga: form.get('harga_tiket'),
      barang: null,
      id_jns_penum: form.get('id_jns_penum'),
    }

    axios.post(apiUrl + 'jadwal_keberangkatan/add/tiket/'+id_jadwal, datas, headers)
    .then((res) => {
            setTitle("Penambahan data tiket berhasil")
            setMessage("Data telah berhasil ditambahkan!")
            setColor("bg-success text-white")
            setModal(!modal)
            clearState()
            fetchData();
            addToast()
    }).catch((error) => {
            setTitle("Terjadi kesalahan")
            setMessage(error?.response?.data?.message)
            setColor("bg-danger text-white")
            setModal(!modal)
            clearState()
            fetchData()
            addToast()
          })
    }else if(typeModal === 'Edit'){
      let datas = {
        nama: form.get('nama_tiket'),
        harga: form.get('harga_tiket'),
        barang: null,
        id_jns_penum: form.get('id_jns_penum'),
      }
      axios.post(apiUrl + 'jadwal_keberangkatan/edit/tiket/'+id_tiket, datas, headers)
      .then((res) => {
              setTitle("Perubahan data tiket berhasil")
              setMessage("Data telah berhasil diupdate!")
              setColor("bg-success text-white")
              setModal(!modal)
              clearState()
              fetchData();
              addToast()
      }).catch((error) => {
              setTitle("Terjadi kesalahan")
              setMessage(error?.response?.data?.message)
              setColor("bg-danger text-white")
              setModal(!modal)
              clearState()
              fetchData()
              addToast()
      })
    }else if(typeModal === 'Delete'){
      axios.get(apiUrl + 'jadwal_keberangkatan/delete/tiket/'+id_tiket, headers)
      .then((res) => {
              setTitle("Perubahan data tiket berhasil")
              setMessage("Data telah berhasil diupdate!")
              setColor("bg-success text-white")
              setModalDelete(!delmodal)
              clearState()
              fetchData();
              addToast()
      }).catch((error) => {
              setTitle("Terjadi kesalahan")
              setMessage(error?.response?.data?.message)
              setColor("bg-danger text-white")
              setModalDelete(!delmodal)
              clearState()
              fetchData()
              addToast()
      })
    }
  }



  return(
    <>
    <Toast toasters={toasters} message={message} title={title} color={color}/>
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
              Tambah Tiket keberangkatan
          </CButton>
          <CCard style={{padding:'1rem 1rem'}}>
                           
                <CDataTable
                  items={datas}
                  fields={fields}
                  hover
                  striped
                  bordered
                  size="sm"
                  itemsPerPage={10}
                  pagination
                  scopedSlots = {{
                    'no':
                    (item,index)=>(
                    <td key={index}>
                        {index+1}
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
                                  setIdTiket(item.id)
                                  setNamaTiket(item.nama_tiket)
                                  setHargaTiket(item.harga)
                                  setIdJenisPenum(item.id_jns_penum)
                                  setModal(true)
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
                                      setIdTiket(item.id)
                                      setModalDelete(!delmodal)
                                  }}
                                  >
                                  Hapus
                                  </CButton>
                              </td>
                      )
                  }}
              />
        </CCard>


        <CModal 
                        show={modal} 
                        onClose={() => {
                        setModal(!modal);clearState()
                        }}
                        color='info'
                        >
                            <CModalHeader closeButton>
                                <CModalTitle>{typeModal} Jadwal</CModalTitle>
                            </CModalHeader>
                            <CForm  onSubmit={submitHandler} method="post" encType="multipart/form-data" className="form-horizontal">
                            <CModalBody>
                                        <CFormGroup row>
                                            <CCol xs="12">
                                                <CLabel htmlFor="nameLabel">Jenis Penumpang</CLabel>
                                                <CSelect custom name="id_jns_penum" id={"statusLabel"} onChange={(e) => { setIdJenisPenum(e.target.value); }} required>
                                                {
                                                       jenisPenumpang.map((data,index) => {
                                                        if(id_jns_penum && id_jns_penum === data.id_jns_penum){
                                                            return(
                                                                <option key={index} selected value={data.id_jns_penum}>{data.nama_jns_penum}</option>
                                                            )
                                                        }else{
                                                            return(
                                                                <option key={index} value={data.id_jns_penum}>{data.nama_jns_penum}</option>
                                                            )
                                                        }
                                                    })
                                                }
                                                </CSelect>
                                            </CCol>
                                        </CFormGroup>
                                        <CFormGroup row>
                                          <CCol xs="6">
                                              <CLabel htmlFor="nameLabel">Nama Tiket</CLabel>
                                              <CInput type="text" id={"nameInput"} placeholder="Nama Tiket"
                                              onChange={(e) => { setNamaTiket(e.target.value); }}
                                              name="nama_tiket" value={nama_tiket} required/>
                                          </CCol>
                                          <CCol xs="6">
                                              <CLabel htmlFor="nameLabel">Harga Tiket</CLabel>
                                              <CInput type="number" id={"nameInput"} placeholder="Harga Tiket"
                                              onChange={(e) => { setHargaTiket(e.target.value); }}
                                              name="harga_tiket" value={harga_tiket} required/>
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
                                  <CModalTitle>Delete Kapal</CModalTitle>
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

export default TiketKeberangkatan;