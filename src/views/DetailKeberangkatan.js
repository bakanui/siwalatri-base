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
  CWidgetIcon,
  CRow,
  CCard,
  CLink,
  CTextarea,
  CInputCheckbox,
  CCollapse
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import useToken from '../useToken';
import Moment from 'react-moment';
import { useParams } from 'react-router-dom';
import { apiUrl } from '../reusable/constants'
import dayjs from 'dayjs';
import 'moment-timezone';
import Toast from './../reusable/toast';
import ToastMaker from './../reusable/toastMaker';

Moment.globalTimezone = 'Asia/Makassar';
const DetailKeberangkatan = () => {
    const { id_keberangkatan, fil_date } = useParams();
    const todays = new Date()
    const { token,type,id, id_armada } = useToken();
    const [datas, setData] = useState([]);
    const [undatas, setUnData] = useState([]);
    const [tujuan, setTotTujuan] = useState([]);
    const [jenis, setTotJenis] = useState([]);
    const [typeModal, setTypeModal] = useState()  
    const [modal, setModal] = useState(false)
    const [jadwalnya, setJadwalnya] = useState([]);
    const [tiketJadwal, setTikets] = useState([]);
    const [link_pdf, setLinkPdf] = useState('');


    //Toast
    const { toasters, addToast } = ToastMaker()
    const [title, setTitle] = useState("")
    const [message, setMessage] = useState("")
    const [color, setColor] = useState("")

    //form
    const [id_jadwal, setIdJadwal] = useState(0);
    const [id_penumpang, setIdPenumpang] = useState(0);
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
    const [status_verif, setStatusVerif] = useState();
    const [tanggals, setTanggal] = useState(todays)

    const headers = {
        headers: {
          'Authorization': "bearer " + token 
        },
        timeout: 10000 
      }

    useEffect(() => {
      fetchData()
      // eslint-disable-next-line
    }, [])
  
  const fetchData = async () => {
      let head = {
          headers: {
              'Authorization': "bearer " + token 
          },
          params: {
              tanggal: fil_date
          },
      }
      let id_armadas = id;
      if(type === 'loket'){
        id_armadas = id_armada
      }
      
        const result = await axios.get(apiUrl + 'laporan/harian_armada/detail/'+id_keberangkatan, head)
        .catch(function (error) {
          if(error.response?.status === 401){
              localStorage.removeItem('access_token')
               window.location.reload()
          }
        })

        setData(result.data.datas)
        setUnData(result.data.detail2)
        setTotTujuan(result.data.tujuans)
        setTotJenis(result.data.jenis)

        const jad = await axios.get(apiUrl + 'jadwal_keberangkatan/index/'+id_armadas, headers)
        setJadwalnya(jad.data.jadwal)

        const tik = await axios.get(apiUrl + 'jadwal_keberangkatan/view/tiket/'+id_keberangkatan, headers)
        setTikets(tik.data)

        let links = apiUrl + 'laporan/harian_armada/detail-non-history/'+id_keberangkatan+'?tanggal='+fil_date
        setLinkPdf(links)
        console.log(links)
  }

  const getBadgeTujuan = (status)=>{
    switch (status) {
      case 'Pulang': return 'success'
      case 'Tirtayatra': return 'secondary'
      case 'Liburan': return 'warning'
      case 'Expedisi': return 'info'
      case 'Kedinasan': return 'primary'
      default: return 'primary'
    }
  }

  const getBadgeJenis = (status)=>{
    switch (status) {
      case 'Lokal': return 'danger'
      case 'Mancanegara': return 'primary'
      case 'Domestik': return 'info'
      default: return 'primary'
    }
  }

  const fields = [
    { key: 'no', _style: { width: '1%'} },
    { key: 'nama_penumpang', _style: { width: '15%'} },
    { key: 'no_identitas', _style: { width: '20%'} },
    { key: 'nama_jns_penum', _style: { width: '20%'} },
    { key: 'alamat', _style: { width: '10%'} },
    { key: 'harga_tiket', _style: { width: '10%'} },
    { key: 'created_at', _style: { width: '10%'} },
    { key: 'edit', _style: { width: '1%'} },
  ]

  const fields2 = [
    { key: 'no', _style: { width: '1%'} },
    { key: 'nama_penumpang', _style: { width: '15%'} },
    { key: 'no_identitas', _style: { width: '20%'} },
    { key: 'nama_jns_penum', _style: { width: '20%'} },
    { key: 'alamat', _style: { width: '10%'} },
    { key: 'harga_tiket', _style: { width: '10%'} },
    { key: 'created_at', _style: { width: '10%'} },
  ]

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


  const handleFreePassHarga = (value) => {
    if(free_pass){
        setFreePassHarga(value)
        // setHargaTiket(value)
        setTotalView(value)
    }
   }


    const getTiketData = async (id_jadwal) => {
        setTikets([])
        const tik = await axios.get(apiUrl + 'jadwal_keberangkatan/view/tiket/'+id_jadwal, headers)
        setTikets(tik.data)
        setIdTiket(0)
    }

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

    const updateHandler = (e) => {
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
        no_identitas: no_identitas,
        id_jns_penum: parseInt(id_jenis_penum),
        id_tujuan: parseInt(id_tujuan),
        id_tiket: parseInt(id_tiket),
        id_jadwal: id_jadwal,
        jenis_kelamin:form.get('jenis_kelamin'),
        alamat:form.get('alamat'),
        status_verif:status_verif,
        freepass: value_freepass,
        harga_tiket:harga_tiketnya,
        ket_freepass:ket_free_pass
      }
    //   console.log(id_penumpang);
    //   console.log(datas);

      if(id_penumpang){
        axios.post(apiUrl + 'penumpang/'+id_penumpang, datas, headers)
        .then((res) => {
          setTitle("Data penumpang berhasil diupdate")
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
      }
    
    }

    function clearState(){
        setNama('')
        setJenisKelamin()
        setIdTujuan()
        setNoIdentitas('')
        setIdTiket(0)
        setIdJenisPenum(0)
        setFreePass(0)
        setKetFreePass()
      }
  

    return(
        <>
          <Toast toasters={toasters} message={message} title={title} color={color}/>
          <div style={{textAlign:'end', margin:'10px 0'}}><a href={link_pdf} target="_blank"  className="btn c-link-pdf">Export Manifest</a><a href={link_pdf} target="_blank"  className="btn c-link-pdf">Export Manifest Loket</a></div>
          <div>
                  <CRow>
                        {
                        tujuan.map((data,index) =>
                            {
                                return(
                                    <div key={index} className='col-xs-6 col-sm-4 col-md-4 col-lg-3' >
                                        <CLink
                                        className="font-weight-bold font-xs btn-block text-muted"
                                        href="#"
                                        rel="noopener norefferer" 
                                        >
                                            <CWidgetIcon text={data.nama_tujuan} header={data.total ? data.total : 0} color={getBadgeTujuan(data.nama_tujuan)}>
                                                <CIcon width={31} name="cil-chart-pie"/>
                                            </CWidgetIcon>
                                        </CLink>
                                    </div>    
                                )
                            })
                        }
                </CRow>
                <CRow>
                        {
                        jenis.map((data,index) =>
                            {
                                return(
                                    <div key={index} className='col-xs-6 col-sm-4 col-md-4 col-lg-3 ' >
                                        <CLink
                                        className="font-weight-bold font-xs btn-block text-muted"
                                        href="#"
                                        rel="noopener norefferer" 
                                        >
                                            <CWidgetIcon text={data.nama_jns_penum} header={data.total ? data.total : 0} color={getBadgeJenis(data.nama_jns_penum)}>
                                                <CIcon width={31} name="cil-user"/>
                                            </CWidgetIcon>
                                        </CLink>
                                    </div>    
                                )
                            })
                        }
                </CRow>
                <CRow>
                    <CCol>
                        <CCard style={{padding:'1rem 1rem'}}>
                            <h5 className="heading-text">List Penumpang <CBadge color='success'>Sudah Bayar</CBadge></h5>
                            <CDataTable
                                items={datas}
                                fields={ type === 'loket' ? fields : fields2}
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
                                  'nama_penumpang':
                                    (item)=>(
                                        <td>
                                            {item.nama_penumpang} {item.freepass == 1 ? <div><CBadge color='primary'>FREEPASS</CBadge> <CBadge color='info'>{item.ket_freepass}</CBadge></div> : ''}
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
                                                setIdJadwal(item.id_jadwal)
                                                setIdPenumpang(item.id_penumpang)
                                                setIdTiket(item.id_tiket)
                                                setNama(item.nama_penumpang)
                                                setAlamat(item.alamat)
                                                setIdJenisPenum(item.id_jns_penum)
                                                setIdTujuan(item.id_tujuan)
                                                setJenisKelamin(item.jenis_kelamin)
                                                setNoIdentitas(item.no_identitas)
                                                setHargaTiket(item.harga_tiket)
                                                setFreePass(item.freepass)
                                                setKetFreePass(item.ket_freepass)
                                                setStatusVerif(item.status_verif)
                                                setTotalView(item.harga_tiket)
                                                setModal(true)
                                                setShowFreePass(item.freepass == 1 ? true : false)
                                                setFreePassHarga(item.freepass == 1 ? item.harga_tiket : 0)
                                            }}
                                            >
                                            Edit
                                            </CButton>
                                        </td>
                                    ),
                                }}
                            />
                    </CCard>
                </CCol>
                </CRow>
                <CRow>
                    <CCol>
                        <CCard style={{padding:'1rem 1rem'}}>
                            <h5 className="heading-text">List Penumpang <CBadge color='light'>Belum Bayar</CBadge></h5>
                            <CDataTable
                                items={undatas}
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
                                                setModal(true)
                                            }}
                                            >
                                            Edit
                                            </CButton>
                                        </td>
                                    ),
                                }}
                                    
                            />
                    </CCard>
                </CCol>
                </CRow>
                

          </div>

            <CModal 
                size="lg"
                  show={modal} 
                  onClose={() => setModal(!modal)}
                  color='info'
                  >
                      <CModalHeader closeButton>
                          <CModalTitle>{typeModal} Data Penumpang</CModalTitle>
                      </CModalHeader>
                      <CForm onSubmit={updateHandler} method="post" encType="multipart/form-data" className="form-horizontal">
                      <CModalBody>
                      <CFormGroup row> 
                            <CCol xs="12" md="4">
                              <CLabel htmlFor="statusLabel">Tanggal</CLabel>
                                <CInput className="form-control" id="tanggal" name="tanggal" placeholder="MM/DD/YYY" value={dayjs(tanggals).format('YYYY-MM-DD')} onChange={(e) => { setTanggal(e.target.value);}} type="date"/>
                            </CCol>
                            <CCol xs="12" md="8">
                                  <CLabel htmlFor="statusLabel">Jadwal</CLabel>
                                  <CSelect custom name="tiket_data" id={"statusLabel"} onChange={(e) => { setIdJadwal(e.target.value); getTiketData(e.target.value) }} required>
                                      {
                                          jadwalnya.map((data,index) => {
                                              if(id_jadwal && id_jadwal === data.id_jadwal){
                                                return(
                                                    <option key={index} value={data.id_jadwal} selected>{data.jadwal} | {data.jadwal_to_rute.tujuan_awals.nama_dermaga} -  {data.jadwal_to_rute.tujuan_akhirs.nama_dermaga}  </option>
                                                )
                                              }else{
                                                return(
                                                    <option key={index} value={data.id_jadwal}>{data.jadwal} | {data.jadwal_to_rute.tujuan_awals.nama_dermaga} -  {data.jadwal_to_rute.tujuan_akhirs.nama_dermaga} </option>
                                                )
                                              }
                                          })
                                      }
                                  </CSelect>
                            </CCol>
                        </CFormGroup>
                        <CFormGroup row> 
                            <CCol xs="12" md="6">
                                <CLabel htmlFor="nameLabel">Nama  Penumpang</CLabel>
                                <CInput id={"nameInput"} placeholder="Nama  Penumpang"
                                onChange={(e) => { setNama(e.target.value); }}
                                name="nama" value={nama} required/>
                            </CCol>
                            <CCol xs="12" md="6">
                                    <CLabel htmlFor="statusLabel">Tiket</CLabel>
                                    <CSelect custom name="tiket_data" id={"statusLabel"} onChange={(e) => { setTiketData(e.target.value); setTotalTiket(e.target.value) }} required>
                                        {
                                            tiketJadwal.map((data,index) => {
                                                if(id_tiket && id_tiket === data.id){
                                                    return(
                                                        <option key={index} value={data.id_jns_penum+'|'+data.id+'|'+data.harga} selected>{data.nama_jns_penum} - {data.nama_tiket} | {data.harga}</option>
                                                    )
                                                }else{
                                                    if(index == 0){
                                                        return(
                                                            <option key={index} value="">-</option>
                                                        )
                                                    }
                                                    return(
                                                        <option key={index} value={data.id_jns_penum+'|'+data.id+'|'+data.harga}>{data.nama_jns_penum} - {data.nama_tiket} | {data.harga}</option>
                                                    )
                                                }
                                            })
                                        }
                                    </CSelect>
                                </CCol>
                       </CFormGroup>
                       <CFormGroup row> 
                            <CCol xs="12" md="6">
                                  <CLabel htmlFor="statusLabel">Jenis Kelamin</CLabel>
                                  <CSelect custom name="jenis_kelamin"  id={"statusLabel"} onChange={(e) => { setJenisKelamin(e.target.value); }} required>
                                      <option value="0">Laki Laki</option>
                                      <option value="1">Wanita</option>
                                  </CSelect>
                            </CCol>
                            <CCol xs="12" md="6">
                                  <CLabel htmlFor="statusLabel">Status Penumpang</CLabel>
                                  <CSelect custom name="status_verif"  id={"statusLabel"} onChange={(e) => { setStatusVerif(e.target.value); }} required>
                                        {(() => {
                                            if(status_verif && status_verif === 1){
                                                return(
                                                    <>
                                                        <option value={1}>Sudah Bayar</option>
                                                        <option value={0}>Belum Bayar</option>  
                                                    </>
                                                )
                                            }else{
                                                return(
                                                    <>
                                                        <option value={1}>Sudah Bayar</option>
                                                        <option value={0}>Belum Bayar</option>  
                                                    </>
                                                )
                                            }
                                        })()}

                                  </CSelect>
                            </CCol>
                       </CFormGroup>
                       <CFormGroup row> 
                            <CCol xs="12" md="6">
                                  <CLabel htmlFor="statusLabel">Alamat</CLabel>
                                  <CTextarea required rows="3" value={alamat} placeholder="...." name="alamat" onChange={(e) => { setAlamat(e.target.value); }} required>
                                  </CTextarea>
                            </CCol>
                            <CCol xs="12" md="6">
                                 <CFormGroup row>
                                    <CCol xs="12" md="6">
                                        <CInputCheckbox 
                                        style={{position:'relative', margin:'10px 5px'}}
                                        custom
                                        id="freePass" 
                                        name="freePass" 
                                        onChange={(e) => { collapseHandler(e.target.checked); }} 
                                        checked={free_pass == 1 ? true : false }
                                        />
                                        <CLabel variant="custom-checkbox" htmlFor="freePass">Free Pass Tiket</CLabel>
                                    </CCol>
                                </CFormGroup>
                                <CCollapse show={showFreePass}>
                                    <CFormGroup row>
                                    <CCol xs="12">
                                        <CInput className="form-control" name="free_pass_harga" placeholder='Masukan Harga Tiket Freepass'  value={free_pass_harga}  onChange={(e) => { handleFreePassHarga(e.target.value); }} type="text"/>
                                        <CInput className="form-control" name="ket_free_pass" placeholder='Masukan Keterangan Freepass'  value={ket_free_pass} onChange={(e) => { setKetFreePass(e.target.value); }} type="text" style={{margin:'10px 0'}}/>
                                        </CCol>
                                    </CFormGroup>
                                </CCollapse>
                            </CCol>
                       </CFormGroup>
                       <hr/>
                       <div className='pull-right' style={{padding:'1rem'}}>
                            <h4><b>{"Rp. "+ (Number(view_total)).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}</b></h4>
                        </div>
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

export default DetailKeberangkatan;