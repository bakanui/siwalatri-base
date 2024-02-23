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
const DetailKeberangkatanOperator = () => {
    const { id_keberangkatan, fil_date } = useParams();
    const todays = new Date()
    const { token,type,id, id_armada } = useToken();
    const [data_keberangakatan, setDataKeberangkatan] = useState([]);
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
    const apiUrlImage = 'http://maiharta.com/api-simpel'

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
        console.log(result.data.detail)
        setDataKeberangkatan(result.data.detail[0])
        setData(result.data.datas)
        setUnData(result.data.detail2)
        setTotTujuan(result.data.tujuans)
        setTotJenis(result.data.jenis)

        const jad = await axios.get(apiUrl + 'jadwal_keberangkatan/index/'+id_armadas, headers)
        setJadwalnya(jad.data.jadwal)

        const tik = await axios.get(apiUrl + 'jadwal_keberangkatan/view/tiket/'+id_keberangkatan, headers)
        setTikets(tik.data)

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


  const fields2 = [
    { key: 'no', _style: { width: '1%'} },
    { key: 'nama_penumpang', _style: { width: '15%'} },
    { key: 'no_identitas', _style: { width: '20%'} },
    { key: 'nama_jns_penum', _style: { width: '20%'} },
    { key: 'alamat', _style: { width: '10%'} },
    { key: 'harga_tiket', _style: { width: '10%'} },
    { key: 'created_at', _style: { width: '10%'} },
  ]


    return(
        <>
          <Toast toasters={toasters} message={message} title={title} color={color}/>
          <div>
            <div className='row'>
                    <div className="col-xs-12 col-sm-6 col-md-6 col-lg-6">
                        <div className='card' style={{padding:'15px'}}>
                                <dl className="row no-margin-bottom">
                                    <dt className="col-sm-4">Nama Operator</dt>
                                    <dd className="col-sm-8 no-margin-bottom">
                                        : {data_keberangakatan.nama_armada}
                                    </dd>
                                </dl>
                                <dl className="row no-margin-bottom">
                                    <dt className="col-sm-4">Kapal</dt>
                                    <dd className="col-sm-8 no-margin-bottom">
                                        : {data_keberangakatan.nama_kapal}
                                    </dd>
                                </dl>
                                <dl className="row no-margin-bottom">
                                    <dt className="col-sm-4">Nahkoda</dt>
                                    <dd className="col-sm-8 no-margin-bottom">
                                        : {data_keberangakatan.nama_nahkoda}
                                    </dd>
                                </dl>
                                <dl className="row no-margin-bottom">
                                    <dt className="col-sm-4">Keberangkatan</dt>
                                    <dd className="col-sm-8 no-margin-bottom">
                                        : {data_keberangakatan.jadwal}
                                    </dd>
                                </dl>
                                <dl className="row no-margin-bottom">
                                    <dt className="col-sm-4">Keberangkatan</dt>
                                    <dd className="col-sm-8 no-margin-bottom">
                                        : {data_keberangakatan.tujuan_awal} {data_keberangakatan.tujuan_akhir}
                                    </dd>
                                </dl>   
                                <dl className="row no-margin-bottom">
                                    <dt className="col-sm-4">Berlayar Pada</dt>
                                    <dd className="col-sm-8 no-margin-bottom">
                                        : {data_keberangakatan.tanggal_berangkat}
                                    </dd>
                                </dl>
                                <dl className="row no-margin-bottom">
                                    <dt className="col-sm-4">Sandar Pada</dt>
                                    <dd className="col-sm-8 no-margin-bottom">
                                        : {data_keberangakatan.tanggal_sampai}
                                    </dd>
                                </dl>    
                                <dl className="row no-margin-bottom">
                                    <dt className="col-sm-4">Total Penumpang</dt>
                                    <dd className="col-sm-8 no-margin-bottom">
                                        : {datas ? datas.length : 0}
                                    </dd>
                                </dl>    
                            </div> 
                    </div>
                    {/* <div className="col-xs-12 col-sm-6 col-md-6 col-lg-6">
                        <div className='card' style={{padding:'15px'}}>
                                <dl className="row no-margin-bottom">
                                    <dt className="col-sm-4">Resume Perjalanan</dt>
                                    <dd className="col-sm-8 no-margin-bottom">
                                        : {data_keberangakatan.catatan}
                                    </dd>
                                </dl>
                                <dl className="row no-margin-bottom">
                                    <dd className="col-sm-12 no-margin-bottom">
                                        <img id="photo" style={{maxHeight:'400px'}} src={apiUrlImage+data_keberangakatan.photo} />
                                    </dd>
                                </dl>
                        </div>
                    </div> */}
                </div>
              
                  {/* <CRow>
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
                </CRow> */}
                {/* <CRow>
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
                </CRow> */}
                <CRow>
                    <CCol>
                        <CCard style={{padding:'1rem 1rem'}}>
                            <h5 className="heading-text">List Penumpang</h5>
                            <CDataTable
                                items={datas}
                                fields={fields2}
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
                                }}
                            />
                    </CCard>
                </CCol>
                </CRow>

          </div>
        </>
    )
}

export default DetailKeberangkatanOperator;