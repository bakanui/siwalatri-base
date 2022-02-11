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

const FormTiketGroup = () => {
  const todays = new Date()
  const { token, id_armada } = useToken();
  const { id_jadwal, kapasitas_penumpang } = useParams();
  const [accordion, setAccordion] = useState(-1)
  const header = {
    headers: {
      'Authorization': "bearer " + token 
    },
  }

  const headers = {
    headers: {
      'Authorization': "bearer " + token 
    },
    params: {
      tanggal: dayjs(todays).format('YYYY-MM-DD')
    },
  }

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
    const [checkeds, setChecked] = useState([false, false, false]);
    
    const [inputList, setInputList] = useState([
      {nama:'', jenis_kelamin:0, tiket_data:[], no_identitas:0, harga_tiket:0, free_pass:0, free_pass_harga:0, ket_free_pass:''}
    ])


    const handleAddFields = () => {
      const values = [...inputList];
      values.push({nama:'', jenis_kelamin:0, tiket_data:[], no_identitas:0, harga_tiket:0, free_pass:0, free_pass_harga:0, ket_free_pass:''})
      setInputList(values);
    };

    const handleRemoveFields = index => {
      const values = [...inputList];
      if(values.length > 1)  values.pop();
      setInputList(values);
    };

     // handle input change
      const handleInputChange = (e, index) => {
        const { name, value } = e.target;
        const list = [...inputList];
        list[index][name] = value;
        if(name == 'tiket_data'){
          let data_tiket = value.split('|')
          console.log(data_tiket[2])
        }
        setInputList(list);
      };

      const handleCheckboxChange = (e, index) => {
        // console.log(index)
        const { name, value, checked } = e.target;
        // console.log(checked)
        let checked_form = 0
        if(checked){
          checked_form = 1
        }
        const list = [...inputList];
        const _checked = [...checkeds];
        _checked[index] = checked;
        list[index][name] = checked_form;
        setInputList(list);
        // console.log(checkeds)
        // setAccordion(accordion === index ? null : index)
        setChecked(_checked);
      }
    
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
        // console.log(result.data)
        
  }

  useEffect(() => {
      fetchData()
      // eslint-disable-next-line
  }, [])

  const collapseHandler = (value) => {
    if(value){
        setShowFreePass(true)
        setFreePass(1)
        setTotalView(free_pass_harga)
        // console.log(free_pass_harga);
    }else{
        // console.log('au');
        // console.log(harga_tiket);
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

  const submitHandler = (e) => {
        const form = new FormData(e.target);
        e.preventDefault();
        let datas = []
        inputList.map((res) => {
            let data_tiket = res.tiket_data.split('|')
            let pos = {
                tanggal: form.get('tanggal'),
                nama_penumpang: res.nama,
                no_identitas: res.no_identitas,
                id_jns_penum: data_tiket[0],
                id_tujuan: form.get('id_tujuan'),
                id_tiket: data_tiket[1],
                id_jadwal: id_jadwal,
                jenis_kelamin:res.jenis_kelamin,
                alamat:form.get('alamat'),
                status_verif:1,
                freepass: 0,
                harga_tiket:data_tiket[2],
                ket_freepass:""
            }
            datas.push(pos)
        })
        console.log(datas)

        //api group post penumpang

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
                        <div>
                          <CForm onSubmit={submitHandler}  method="post" encType="multipart/form-data" className="form-horizontal">
                          <div className='card' style={{padding:'10px 15px'}}>
                              <CFormGroup row> 
                                  <CCol md="3">
                                    <CLabel htmlFor="statusLabel">Tanggal</CLabel>
                                      <CInput className="form-control" id="tanggal" name="tanggal" placeholder="MM/DD/YYY" value={dayjs(todays).format('YYYY-MM-DD')} type="date" required/>
                                  </CCol>
                                  <CCol xs="12" md="4">
                                        <CLabel htmlFor="nameLabel">Alamat</CLabel>
                                        <CTextarea required rows="4" value={alamat} placeholder="...." name="alamat" onChange={(e) => { setAlamat(e.target.value); }} required>
                                        </CTextarea>
                                    </CCol>
                                    <CCol md="4">
                                        <CLabel htmlFor="statusLabel">Kepentingan Penumpang</CLabel>
                                        <CSelect custom name="id_tujuan" id={"statusLabel"} value={id_tujuan} onChange={(e) => { setIdTujuan(e.target.value); }}>
                                            {
                                                jenisTujuan.map((data,index) => {
                                                        return(
                                                            <option key={index} value={data.id_tujuan}>{data.nama_tujuan}</option>
                                                        )
                                                })
                                            }
                                        </CSelect>
                                  </CCol>
                              </CFormGroup>
                           </div>
                          {inputList.map((data, index) => {
                            return (
                              <div className='card' style={{padding:'10px 15px'}} key={index}>
                                <CFormGroup row> 
                                  <CCol md="3">
                                        <CLabel htmlFor="statusLabel">Jenis Penumpang</CLabel>
                                        <CSelect custom name="tiket_data" id={"statusLabel"} value={data.id_jenis_penum} onChange={e => handleInputChange(e, index)} required>
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
                                      onChange={e => handleInputChange(e, index)}
                                      name="nama" value={data.nama} required/>
                                  </CCol>
                                  <CCol md="3">
                                        <CLabel htmlFor="statusLabel">Jenis Kelamin</CLabel>
                                        <CSelect custom name="jenis_kelamin" value={data.jenis_kelamin}  id={"statusLabel"} onChange={e => handleInputChange(e, index)} required>
                                            <option value="0">Laki Laki</option>
                                            <option value="1">Wanita</option>
                                        </CSelect>
                                  </CCol>
                                  <CCol xs="12" md="3">
                                      <CLabel htmlFor="nameLabel">No Identitas (No KTP/No Paspor)</CLabel>
                                      <CInput id={"nameInput"} placeholder="No Identitas"
                                      onChange={e => {handleInputChange(e, index); console.log(index) }}
                                      name="no_identitas" value={data.no_identitas} required/>
                                  </CCol>
                                </CFormGroup>
                                <CFormGroup row>
                                  <CCol xs="11" md="6">
                                      <input 
                                      type="checkbox"
                                        style={{position:'relative', margin:'10px 5px'}}
                                        id={'free_pass'+index} 
                                        checked={checkeds[index]}
                                        onChange={e => {handleCheckboxChange(e, index); console.log(index) }}
                                        name="free_pass" value={data.free_pass} 
                                      />
                                      <CLabel htmlFor={'free_pass'+index}>Free Pass Tiket</CLabel>
                                  </CCol>
                                  <CCol xs="hidden" md="5">
                                  </CCol>
                                  <CCol xs="1" md="1" style={{display:'flex',justifyContent:'flex-end'}}>
                                          <div className='circle-count' >{index+1}</div>
                                  </CCol>
                                </CFormGroup>
                                <CCollapse show={checkeds[index]}>
                                  <CFormGroup row>
                                    <CCol xs="12" md="4">
                                      <CInput className="form-control" name="free_pass_harga" placeholder='Masukan Harga Tiket Freepass'  value={data.free_pass_harga}  onChange={e => handleInputChange(e, index)} type="text"/>
                                      <CInput className="form-control" name="ket_free_pass" placeholder='Masukan Keterangan Freepass'  value={data.ket_free_pass} onChange={e => handleInputChange(e, index)} type="text" style={{margin:'10px 0'}}/>
                                        </CCol>
                                  </CFormGroup>
                                </CCollapse>
                              </div>
                            )}
                            )
                            }
                            {/* <div style={{ marginTop: 20 }}>{JSON.stringify(inputList)}</div> */}
                             <CRow>
                                <CCol className='pt-3 d-flex justify-content-between'>
                                  <CButton className="button-add"  onClick={handleAddFields}>Add More</CButton>
                                  <CButton className="button-remove"  onClick={handleRemoveFields}>Remove</CButton>
                                </CCol>
                            </CRow>
                            <hr style={{borderColor:'black', margin:'40px 0'}}></hr>
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
            </>
        )

}

export default FormTiketGroup