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
  CInput, 
  CTextarea, 
  CSelect,
  CCollapse,
  CInputCheckbox,
  CRow
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import useToken from '../../../../src/useToken';
import Moment from 'react-moment';
import { apiUrl } from './../../../reusable/constants'
import { useParams } from 'react-router-dom';
import dayjs from 'dayjs';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAnchor, faShip, faUser } from '@fortawesome/free-solid-svg-icons'
import 'moment-timezone';
import Toast from './../../../reusable/toast';
import ToastMaker from './../../../reusable/toastMaker';


Moment.globalTimezone = 'Asia/Makassar';

const FormTiket = () => {
    const todays = new Date()
    const { token, id_armada } = useToken();
    const { id_jadwal, kapasitas_penumpang } = useParams();

    const headers = {
      headers: {
        'Authorization': "bearer " + token 
      },
      params: {
        tanggal: dayjs(todays).format('YYYY-MM-DD')
      },
    }

    const header = {
      headers: {
        'Authorization': "bearer " + token 
      },
    }
    useEffect(() => {
        fetchData()
        // eslint-disable-next-line
    }, [])

    const postJadwal = 
          {
            "id_jadwal": "",
            "jadwal": "",
            "status": "",
            "harga": 0,
            "id_armada": "",
            "id_nahkoda": "",
            "id_kapal": "",
            "id_rute": "",
            "ekstra": 0,
            "id_loket": 88,
            "created_at": "2021-09-08T01:40:21.000000Z",
            "updated_at": "2022-01-12T02:43:38.000000Z",
            "deleted_at": null,
            "jadwal_to_armada": {
                "id_armada": "60dff1192581b",
                "id_user": "49",
                "nama_armada": "Gangga Express",
                "kontak": "089663617345",
                "alamat": "Dusun Pande Mas, Desa Kamasan",
                "description": "Kami melayani setulus hati",
                "created_at": "2021-07-03T05:09:45.000000Z",
                "updated_at": "2021-07-03T05:09:45.000000Z",
                "deleted_at": null
            },
            "jadwal_to_nahkoda": {
                "id_nahkoda": 100,
                "nama_nahkoda": "Gungde Maiharta",
                "no_hp": "0812991829111",
                "id_armada": "60dff1192581b",
                "id_kecakapan": 4,
                "created_at": "2021-12-20T13:26:35.000000Z",
                "updated_at": "2021-12-20T13:26:35.000000Z",
                "deleted_at": null
            },
            "jadwal_to_kapal": {
                "id_kapal": "60dff46f200dc",
                "nama_kapal": "Gangga Express 5",
                "mesin": "SUZUKI 5 x 250 PK",
                "panjang": "17.5",
                "lebar": "3.2",
                "dimension": "1.2",
                "grt": 0,
                "dwt": 0,
                "kapasitas_penumpang": 86,
                "kapasitas_crew": 6,
                "kilometer": 0,
                "id_armada": "60dff1192581b",
                "id_jenis": 4,
                "id_status": 1,
                "created_at": "2021-07-03T05:23:59.000000Z",
                "updated_at": "2021-10-12T03:54:18.000000Z",
                "deleted_at": null
            },
            "jadwal_to_rute": {
                "id_rute": 0,
                "tujuan_awal": 0,
                "tujuan_akhir": 0,
                "jarak": 0,
                "created_at": "2021-03-11T12:45:26.000000Z",
                "updated_at": "2021-06-09T06:18:03.000000Z",
                "deleted_at": null,
                "tujuan_awals": {
                    "id_dermaga": 1,
                    "nama_dermaga": "",
                    "lokasi": "",
                    "id_syahbandar": 41,
                    "created_at": "2021-01-15T10:31:08.000000Z",
                    "updated_at": "2021-06-02T07:16:40.000000Z",
                    "deleted_at": null
                },
                "tujuan_akhirs": {
                    "id_dermaga": 2,
                    "nama_dermaga": "",
                    "lokasi": "",
                    "id_syahbandar": 0,
                    "created_at": "2021-01-15T10:31:46.000000Z",
                    "updated_at": "2021-06-27T13:36:53.000000Z",
                    "deleted_at": null
                }
            }
        }

    //Toast
    const { toasters, addToast } = ToastMaker()
    const [title, setTitle] = useState("")
    const [message, setMessage] = useState("")
    const [color, setColor] = useState("")

    const [jenisPenumpang, setJenisPenumpang] = useState([]);
    const [jenisTujuan, setJenisTujuan] = useState([]);
    const [tiketJadwal, setTikets] = useState([]);
    const [data_penumpang, setDataPenumpang] = useState([]);
    const [detail_jadwal, setDetailJadwal] = useState(postJadwal);
    
    //form
    const [tiket_data, setTiketData] = useState();
    const [nama, setNama] = useState('');
    const [alamat, setAlamat] = useState('');
    const [jenis_kelamin, setJenisKelamin] = useState(0);
    const [id_jenis_penum, setIdJenisPenum] = useState(0);
    const [id_tujuan, setIdTujuan] = useState(0);
    const [id_tiket, setIdTiket] = useState(0);
    const [no_identitas, setNoIdentitas] = useState('');

    const [view_total, setTotalView] = useState(0);
    const [harga_tiket, setHargaTiket] = useState(0);
    const [showFreePass, setShowFreePass] = useState(false)
    const [free_pass, setFreePass] = useState(0)
    const [free_pass_harga, setFreePassHarga] = useState(0)
    const [ket_free_pass, setKetFreePass] = useState('');

    

    const fetchData = async () => {

      const jad = await axios.get(apiUrl + 'jadwal_keberangkatan/view/'+id_jadwal, header)
      setDetailJadwal(jad.data)

      const jenis = await axios.get(apiUrl + 'jenis_penumpang', header)
      .catch(function (error) {
        if(error.response?.status === 401){
            localStorage.removeItem('access_token')
            window.location.reload()
        }
      })
      setJenisPenumpang(jenis.data)

      const tujuan = await axios.get(apiUrl + 'jenis_tujuan', header)
        .catch(function (error) {
          if(error.response?.status === 401){
              localStorage.removeItem('access_token')
              window.location.reload()
          }
        })
        setJenisTujuan(tujuan.data)


        const tik = await axios.get(apiUrl + 'jadwal_keberangkatan/view/tiket/'+id_jadwal, header)
        setTikets(tik.data)

        const result = await axios.get(apiUrl + 'laporan/harian_armada/detail/'+id_jadwal, headers)
        .catch(function (error) {
          if(error.response?.status === 401){
              localStorage.removeItem('access_token')
              window.location.reload()
          }
        })
        setDataPenumpang(result.data.datas)
        console.log(result.data)
        
  }

  function setTotalTiket (datas){
    if(!free_pass){
      let nilai = datas.split('|');
      setIdJenisPenum(nilai[0]);
      setIdTiket(nilai[1])
      setHargaTiket(nilai[2]);
      setTotalView(nilai[2]);
      setFreePassHarga(nilai[2]);
    }
  }


    const collapseHandler = (value) => {
      if(value){
          setShowFreePass(true)
          setFreePass(1)
          setTotalView(free_pass_harga)
          console.log(free_pass_harga);
      }else{
          console.log('au');
          console.log(harga_tiket);
          setShowFreePass(false)
          setFreePass(0)
          setTotalView(harga_tiket)
      }
    }

    const handleFreePassHarga = (value) => {
        if(free_pass){
            setFreePassHarga(value)
            // setHargaTiket(value)
            setTotalView(value)
        }
    }

    const submitHandler = (e) => {
      const form = new FormData(e.target);
      e.preventDefault();
      
      let value_freepass = 0;
      let harga_tiketnya = harga_tiket;
      if(free_pass){
        value_freepass = 1
        harga_tiketnya = free_pass_harga
      }

      let datas = {
        tanggal: form.get('tanggal'),
        nama_penumpang: form.get('nama'),
        no_identitas: form.get('no_identitas'),
        id_jns_penum: id_jenis_penum,
        id_tujuan: form.get('id_tujuan'),
        id_tiket: id_tiket,
        id_jadwal: id_jadwal,
        jenis_kelamin:form.get('jenis_kelamin'),
        alamat:form.get('alamat'),
        status_verif:1,
        freepass: value_freepass,
        harga_tiket:harga_tiketnya,
        ket_freepass:ket_free_pass
      }

      axios.get(apiUrl + 'penumpang/total/'+id_jadwal, header)
      .then((res) => {
          if(res.data[0].total < kapasitas_penumpang){
            axios.post(apiUrl + 'penumpang', datas, header)
            .then((res) => {
              setTitle("Penambahan data penumpang berhasil")
              setMessage("Data telah berhasil ditambahkan!")
              setColor("bg-success text-white")
              clearState()
              fetchData();
              addToast()
            }).catch((error) => {
              setTitle("Terjadi kesalahan")
              setMessage(error?.response?.data?.message)
              setColor("bg-danger text-white")
              clearState()
              fetchData()
              addToast()
            })
          }
      })
    }

    function clearState(){
      setNama('')
      setJenisKelamin()
      // setIdTujuan()
      setNoIdentitas('')
      // setIdTiket(0)
      // setIdJenisPenum(0)
      // setFreePass(0)
      // setKetFreePass()
    }


    return(
        <>
          <Toast toasters={toasters} message={message} title={title} color={color}/>
            <CRow>
                <CCol xs="12" sm="3" md="3" className="column-card">
                      <div className="boardingPass-header">
                          <h4 className="boardingPass-airline">{detail_jadwal.jadwal}</h4>
                      </div>
                      <div className="card">
                          <div className="row-custome-tiket" style={{justifyContent:'center'}}>
                              <section className="boardingPass-departur col-xs">
                                  <span className="section-label-child">{detail_jadwal.jadwal_to_rute.tujuan_awals.lokasi}</span>
                                  <span className="boardingPass-departur-IATA">{detail_jadwal.jadwal_to_rute.tujuan_awals.nama_dermaga}</span>	
                              </section>
                              <section className="boardingPass-transport boardingPass-icon col-xs">
                                <FontAwesomeIcon icon={faShip} />
                              </section>
                              <section className="boardingPass-arrival col-xs">
                                  <span className="section-label-child">{detail_jadwal.jadwal_to_rute.tujuan_akhirs.nama_dermaga}</span>
                                  <span className="boardingPass-arrival-IATA">{detail_jadwal.jadwal_to_rute.tujuan_akhirs.nama_dermaga}</span>	
                              </section>
                          </div>
                          <hr className="tiket-hr" />
                          <div className="row-custome-tiket">
                              <section className="boardingPass-icon col-xs-pessanger">
                                <FontAwesomeIcon icon={faUser} />
                              </section>
                              <section className="boardingPass-passenger col-xs-pessanger">
                                  <span className="section-label-child">Nahkoda</span>
                                  <span>{detail_jadwal.jadwal_to_nahkoda.nama_nahkoda}</span>	
                              </section>
                              <section className="boardingPass-seat col-xs-pessanger">
                                  <span className="section-label-child">No HP</span>
                                  <span>{detail_jadwal.jadwal_to_nahkoda.no_hp}</span>	
                              </section>
                          </div>
                          <hr className="tiket-hr" />
                          <div className="row-custome-tiket">
                              <section className="boardingPass-icon col-xs-pessanger">
                                <FontAwesomeIcon icon={faAnchor} />
                              </section>
                              <section className="boardingPass-passenger col-xs-pessanger">
                                  <span className="section-label-child">Kapal</span>
                                  <span>{detail_jadwal.jadwal_to_kapal.nama_kapal}</span>	
                              </section>
                              <section className="boardingPass-seat col-xs-pessanger">
                                  <span className="section-label-child">Kapasitas</span>
                                  <span>{detail_jadwal.jadwal_to_kapal.kapasitas_penumpang}</span>	
                              </section>
                          </div>
                      </div>
                </CCol>
                <CCol xs="12" sm="9" md="9">
                      <div className='card' style={{padding:'10px 15px'}}>
                        <CForm onSubmit={submitHandler}  method="post" encType="multipart/form-data" className="form-horizontal">
                          <CFormGroup row> 
                            <CCol md="3">
                              <CLabel htmlFor="statusLabel">Tanggal</CLabel>
                                <CInput className="form-control" id="tanggal" name="tanggal" placeholder="MM/DD/YYY" value={dayjs(todays).format('YYYY-MM-DD')} type="date" required/>
                            </CCol>
                            <CCol md="3">
                                  <CLabel htmlFor="statusLabel">Jenis Penumpang</CLabel>
                                  <CSelect custom name="tiket_data" id={"statusLabel"} onChange={(e) => { setTiketData(e.target.value); setTotalTiket(e.target.value) }} required>
                                      <option >-</option>
                                      {
                                          tiketJadwal.map((data,index) => {
                                                  return(
                                                      <option key={index} value={data.id_jns_penum+'|'+data.id+'|'+data.harga}>{data.nama_jns_penum} - {data.nama_tiket} | {data.harga}</option>
                                                  )
                                          })
                                      }
                                  </CSelect>
                            </CCol>
                            <CCol xs="12" md="3">
                                <CLabel htmlFor="nameLabel">Nama  Penumpang</CLabel>
                                <CInput id={"nameInput"} placeholder="Nama  Penumpang"
                                onChange={(e) => { setNama(e.target.value); }}
                                name="nama" value={nama} required/>
                            </CCol>
                            <CCol md="3">
                                  <CLabel htmlFor="statusLabel">Jenis Kelamin</CLabel>
                                  <CSelect custom name="jenis_kelamin"  id={"statusLabel"} onChange={(e) => { setJenisKelamin(e.target.value); }} required>
                                      <option value="0">Laki Laki</option>
                                      <option value="1">Wanita</option>
                                  </CSelect>
                            </CCol>
                          </CFormGroup>
                          <CFormGroup row>
                              <CCol xs="12" md="4">
                                  <CLabel htmlFor="nameLabel">Alamat</CLabel>
                                  <CTextarea required rows="4" value={alamat} placeholder="...." name="alamat" onChange={(e) => { setAlamat(e.target.value); }} >
                                  </CTextarea>
                              </CCol>
                              <CCol md="4">
                                  <CLabel htmlFor="statusLabel">Kepentingan Penumpang</CLabel>
                                  <CSelect custom name="id_tujuan" id={"statusLabel"} onChange={(e) => { setIdTujuan(e.target.value); }}>
                                      {
                                          jenisTujuan.map((data,index) => {
                                                  return(
                                                      <option key={index} value={data.id_tujuan}>{data.nama_tujuan}</option>
                                                  )
                                          })
                                      }
                                  </CSelect>
                            </CCol>
                            <CCol xs="12" md="4">
                                <CLabel htmlFor="nameLabel">No Identitas (No KTP/No Paspor)</CLabel>
                                <CInput id={"nameInput"} placeholder="No Identitas"
                                onChange={(e) => { setNoIdentitas(e.target.value); }}
                                name="no_identitas" value={no_identitas} required/>
                            </CCol>
                          </CFormGroup>
                          <CFormGroup row>
                            <CCol xs="12" md="6">
                                <CInputCheckbox 
                                  style={{position:'relative', margin:'10px 5px'}}
                                  custom
                                  id="freePass" 
                                  name="freePass" 
                                  onChange={(e) => { collapseHandler(e.target.checked); }} 
                                />
                                <CLabel variant="custom-checkbox" htmlFor="freePass">Free Pass Tiket</CLabel>
                            </CCol>
                          </CFormGroup>
                          <CCollapse show={showFreePass}>
                            <CFormGroup row>
                              <CCol xs="12" md="4">
                                <CInput className="form-control" name="free_pass_harga" placeholder='Masukan Harga Tiket Freepass'  value={free_pass_harga}  onChange={(e) => { handleFreePassHarga(e.target.value); }} type="text"/>
                                <CInput className="form-control" name="ket_free_pass" placeholder='Masukan Keterangan Freepass'  value={ket_free_pass} onChange={(e) => { setKetFreePass(e.target.value); }} type="text" style={{margin:'10px 0'}}/>
                                  </CCol>
                            </CFormGroup>
                          </CCollapse>
                          <div className='pull-right' style={{padding:'1rem',float:'right'}}>
                                <CButton type="submit" size='lg' color="primary">
                                        <CIcon name="cil-scrubber" /> Submit
                                </CButton>
                          </div>
                        </CForm>
                        <div className='pull-right' style={{padding:'1rem',float:'right'}}>
                            <h4><b>{"Rp. "+ (Number(view_total)).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}</b></h4>
                        </div>
                      </div>
                </CCol>
            </CRow>
            
            <div className='card'>
                          <CDataTable
                            items={data_penumpang}
                            fields={[
                                { key: 'no', _style: { width: '1%'}},
                                { key: 'nama_penumpang', _style: { width: '10%'} },
                                { key: 'no_identitas', _style: { width: '10%'} },
                                { key: 'alamat', _style: { width: '15%'} },
                                { key: 'harga_tiket', _style: { width: '5%'} },
                                { key: 'jenis_kelamin', _style: { width: '5%'} },
                                { key: 'nama_jns_penum', label:'Jenis Penumpang' , _style: { width: '10%'} },
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
                                'no':
                                  (item,index)=>(
                                  <td key={index}>
                                      {index+1}
                                  </td>
                                  ),
                                  'jenis_kelamin':
                                  (item) => (
                                    <td>
                                      {item.jenis_kelamin == 0 ? 'Laki Laki' : 'Wanita'}
                                    </td>
                                  )
                            }}
                          />
            </div>
         
        </>
    )

}
export default FormTiket