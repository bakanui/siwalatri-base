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
  const [detail_jadwal, setDetailJadwal] = useState([]);
  const [jenisPenumpang, setJenisPenumpang] = useState([]);

  const [typeModal, setTypeModal] = useState()  
  const [modal, setModal] = useState(false)
  const [modalsec, setModalSecond] = useState(false)
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
      console.log(result.data)
      setData(result.data)
      const jadwal = await axios.get(apiUrl + 'jadwal_keberangkatan/view/'+id_jadwal, headers)
      .catch(function (error) {
        if(error.response?.status === 401){
            localStorage.removeItem('access_token')
            window.location.reload()
        }
      })
      setDetailJadwal(jadwal.data)
      console.log(jadwal.data)
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

  const sendAtixHandler = (e) => { //send data to atix handler
      let tiket_mancanegara = _.filter(datas, {  'id_jns_penum': 2 });
      console.log('push to atix')
      let tiket_domestik = _.filter(datas, {  'id_jns_penum': 1 });
      if(tiket_mancanegara.length !== 0 && tiket_domestik !== 0){
      let data_mancanegara = {
          ticket_name: tiket_mancanegara[0].nama_jns_penum + " " + detail_jadwal.jadwal + " " + detail_jadwal.jadwal_to_rute.tujuan_awals.nama_dermaga + " - " + detail_jadwal.jadwal_to_rute.tujuan_akhirs.nama_dermaga,
          ticket_desc: "<p>tujuan_awal : "+detail_jadwal.jadwal_to_rute.tujuan_awals.nama_dermaga+"</p>\r\r<p>lokasi_awal : "+detail_jadwal.jadwal_to_rute.tujuan_awals.lokasi+"</p>\r\r<p>tujuan_akhir : "+detail_jadwal.jadwal_to_rute.tujuan_akhirs.nama_dermaga+"</p>\r\r<p>lokasi_akhir : "+detail_jadwal.jadwal_to_rute.tujuan_akhirs.lokasi+"</p>",
          ticket_type: "mancanegara",
          price_adult: tiket_mancanegara[0].harga,
          price_child: tiket_mancanegara[1].harga,
          label_child: "Anak-Anak",
          label_adult: "Dewasa",
          id_kapal_sw: detail_jadwal.jadwal_to_kapal.id_kapal,
          idtiket_siwalatri_adult: tiket_mancanegara[0].id,
          idtiket_siwalatri_child: tiket_mancanegara[1].id,
          idjadwal_siwalatri: detail_jadwal.id_jadwal,
          kapasitas: detail_jadwal.jadwal_to_kapal.kapasitas_penumpang
      }

      let data_nusantara = {
        ticket_name: tiket_domestik[0].nama_jns_penum + " " + detail_jadwal.jadwal + " " + detail_jadwal.jadwal_to_rute.tujuan_awals.nama_dermaga + " - " + detail_jadwal.jadwal_to_rute.tujuan_akhirs.nama_dermaga,
        ticket_desc: "<p>tujuan_awal : "+detail_jadwal.jadwal_to_rute.tujuan_awals.nama_dermaga+"</p>\r\r<p>lokasi_awal : "+detail_jadwal.jadwal_to_rute.tujuan_awals.lokasi+"</p>\r\r<p>tujuan_akhir : "+detail_jadwal.jadwal_to_rute.tujuan_akhirs.nama_dermaga+"</p>\r\r<p>lokasi_akhir : "+detail_jadwal.jadwal_to_rute.tujuan_akhirs.lokasi+"</p>",
        ticket_type: "nusantara",
        price_adult: tiket_domestik[0].harga,
        price_child: tiket_domestik[1].harga,
        label_child: "Anak-Anak",
        label_adult: "Dewasa",
        id_kapal_sw: detail_jadwal.jadwal_to_kapal.id_kapal,
        idtiket_siwalatri_adult: tiket_domestik[0].id,
        idtiket_siwalatri_child: tiket_domestik[1].id,
        idjadwal_siwalatri: detail_jadwal.id_jadwal,
        kapasitas: detail_jadwal.jadwal_to_kapal.kapasitas_penumpang
    }
      let head = {
        headers: {
            'X-AVATAR-KEY':'f3abeb0e61e6eee899082c1d1ead359ab458258dbcddac3647b4cd16f7a7812c',
        }
      }
      axios.post('http://dev.avatarsoftware.id:3007/api/tickets',data_mancanegara, head)
      .then((res) => {
          if(res.data.message === 'SUCCESS'){
              axios.post('http://dev.avatarsoftware.id:3007/api/tickets',data_nusantara, head)
              .then((rest) => {
                if(rest.data.message === 'SUCCESS'){
                    //update jadwal status send
                    setTitle("Kirim Jadwal Ke Atix Berhasil")
                    setMessage("Data telah berhasil dikirim!")
                    setColor("bg-success text-white")
                    setModalSecond(!modalsec)
                    fetchData();
                    addToast()
                    setTimeout(() =>{window.location.reload()},1500)
                }
              })
          }
      })
    }else{
        setTitle("Kirim Jadwal Gagal")
        setMessage("Data Tiket harus tersedia mancanegara dan domestik")
        setColor("bg-danger text-white")
        setModalSecond(!modalsec)
        fetchData();
        addToast()
    }


  }



  return(
    <>
    <Toast toasters={toasters} message={message} title={title} color={color}/>
          <div className='row'>
              <div className='col-xs-6 col-sm-6 col-md-6'>
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
              </div>
              <div className='col-xs-6 col-sm-6 col-md-6' style={{textAlign:'end'}}>
                  {(() => {
                    if(detail_jadwal.status_kirim_mitra === 0){
                        return(
                            <CButton
                              color="success"
                              variant="outline"
                              shape="square"
                              size="sm" 
                              style={{margin:'10px 0'}}
                              onClick={() => 
                                  {
                                      setModalSecond(true)
                                  }}
                              >
                              Kirim Jadwal Ke Atix
                          </CButton>
                        )
                      }
                  })()}
              </div>
          </div>
         
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
                        
                          <CModal 
                          show={modalsec} 
                          onClose={() => setModalSecond(!modalsec)}
                          color='info'
                          >
                              <CModalHeader closeButton>
                                  <CModalTitle>Konfirmasi</CModalTitle>
                              </CModalHeader>
                              <CModalBody>
                                  <p>Apakah anda yakin untuk mengirim jadwal ini ke Atix?</p>
                              </CModalBody>
                              <CModalFooter>
                                  <CButton type="submit" color="primary" onClick={() => sendAtixHandler()}>
                                      <CIcon name="cil-scrubber" /> Ya
                                  </CButton>{' '}
                                  <CButton color="secondary" onClick={() => setModalSecond(!modalsec)}>Batalkan</CButton>
                              </CModalFooter>
                          </CModal>

    </>
  )


}

export default TiketKeberangkatan;