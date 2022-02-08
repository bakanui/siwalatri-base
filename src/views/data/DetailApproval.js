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
import useToken from '../../../src/useToken';
import Moment from 'react-moment';
import { useParams } from 'react-router-dom';
import { apiUrl } from '../../reusable/constants'
import dayjs from 'dayjs';
import 'moment-timezone';
import Toast from '../../reusable/toast'
import ToastMaker from '../../reusable/toastMaker'
import database from 'src/firebase_init';
import { ref, update } from "firebase/database";

Moment.globalTimezone = 'Asia/Makassar';
const DetailApproval = () => {
    const { id_jadwal, total_penumpang, id_approval } = useParams();
    const { token, id } = useToken();
    const [modal, setModal] = useState(false)
    const todays = new Date()
    
    //Toast
    const { toasters, addToast } = ToastMaker()
    const [title, setTitle] = useState("")
    const [message, setMessage] = useState("")
    const [color, setColor] = useState("")

    const [approval_data, setApproval] = useState([]);
    const [datas, setData] = useState([]);
    const [undatas, setUnData] = useState([]);
    const [tujuan, setTotTujuan] = useState([]);
    const [jenis, setTotJenis] = useState([]);

    const headers = {
        headers: {
          'Authorization': "bearer " + token 
        }
    }

    const fetchData = async () => {
        const result = await axios.get(apiUrl + 'jadwal_keberangkatan/view/detail/approval/' + id_jadwal, headers)
        .catch(function (error) {
          if(error.response?.status === 401){
              localStorage.removeItem('access_token')
              window.location.reload()
          }
        })
        setApproval(result.data)
        let head = {
            headers: {
                'Authorization': "bearer " + token 
            },
            params: {
                tanggal: dayjs(todays).format('YYYY-MM-DD')
            },
        }

        const results = await axios.get(apiUrl + 'laporan/harian_armada/detail/'+id_jadwal, head)
        .catch(function (error) {
          if(error.response?.status === 401){
              localStorage.removeItem('access_token')
               window.location.reload()
          }
        })
        setData(results.data.datas)
        setUnData(results.data.detail2)
        setTotTujuan(results.data.tujuans)
        setTotJenis(results.data.jenis)
    }
    
    useEffect(() => {
        fetchData()
    }, [])

    const submitHandler = (e) => {
        let datas = {
            id: id_approval,
        }
        axios.post(apiUrl + 'jadwal_keberangkatan/proses/approval',datas, headers)
        .then(async(res) => {
                //approve to firebase database
                await update(ref(database, 'rute_approval/' + id_jadwal), {
                    status: 'approve'
                });
                setTitle("Approval berhasil")
                setMessage("Data telah berhasil diupdate!")
                setColor("bg-success text-white")
                fetchData();
                addToast()
                setModal(false)
                // window.location.reload("")
        })

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
      ]

    function getCardHeadApproval(datas){
        return(
            <div className='card' style={{padding:'15px'}}>
                <dl className="row no-margin-bottom">
                    <dt className="col-sm-4">Nama Operator</dt>
                    <dd className="col-sm-8 no-margin-bottom">
                        : {datas.jadwal_to_armada.nama_armada}
                    </dd>
                </dl>
                <dl className="row no-margin-bottom">
                    <dt className="col-sm-4">Kapal</dt>
                    <dd className="col-sm-8 no-margin-bottom">
                        : {datas.jadwal_to_kapal.nama_kapal}
                    </dd>
                </dl>
                <dl className="row no-margin-bottom">
                    <dt className="col-sm-4">Nahkoda</dt>
                    <dd className="col-sm-8 no-margin-bottom">
                        : {datas.jadwal_to_nahkoda.nama_nahkoda}
                    </dd>
                </dl>
                <dl className="row no-margin-bottom">
                    <dt className="col-sm-4">Keberangkatan</dt>
                    <dd className="col-sm-8 no-margin-bottom">
                        : {datas.jadwal}
                    </dd>
                </dl>
                <dl className="row no-margin-bottom">
                    <dt className="col-sm-4">Dari</dt>
                    <dd className="col-sm-8 no-margin-bottom">
                        : {datas.jadwal_to_rute.tujuan_awals.nama_dermaga}
                    </dd>
                </dl>   
                <dl className="row no-margin-bottom">
                    <dt className="col-sm-4">Tujuan</dt>
                    <dd className="col-sm-8 no-margin-bottom">
                        : {datas.jadwal_to_rute.tujuan_akhirs.nama_dermaga}
                    </dd>
                </dl>    
                <dl className="row no-margin-bottom">
                    <dt className="col-sm-4">Total Penumpang</dt>
                    <dd className="col-sm-8 no-margin-bottom">
                        : {total_penumpang}
                    </dd>
                </dl>    
            </div>    
        )
    }

    return(
        <>
        <Toast toasters={toasters} message={message} title={title} color={color}/>
            {approval_data.jadwal ? getCardHeadApproval(approval_data.jadwal) : ''}
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
            </div>
            <CRow>
                    <CCol>
                        <CCard style={{padding:'1rem 1rem'}}>
                            <h5 className="heading-text">List Penumpang </h5>
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
            <CRow>
                    <CCol>
                        <CCard style={{padding:'1rem 1rem'}}>
                            <h5 className="heading-text">SOP Keberangkatan </h5>
                            <CDataTable
                                items={approval_data.sop}
                                fields={[
                                    { key: 'no', _style: { width: '1%'} },
                                    { key: 'sop', _style: { width: '100%'} },
                                ]}
                                hover
                                striped
                                bordered
                                size="sm"
                                itemsPerPage={15}
                                pagination
                                scopedSlots = {{
                                'no':
                                (item,index)=>(
                                <td key={index}>
                                    {index+1}
                                </td>
                                ),
                                'sop':
                                    (item)=>(
                                        <td>
                                            {item.description} 
                                        </td>
                                    ),
                                }}
                            />
                    </CCard>
                </CCol>
            </CRow>

            <div style={{justifyContent:'center', display:'flex', margin:'30px 10px'}}>
                <CButton color="primary" variant="outline" shape="square" size="lg"  onClick={()=>{ setModal(true) }} >
                    APPROVE KEBERANGAKTAN
                </CButton>
            </div>


                    <CModal 
                    show={modal} 
                    onClose={() => setModal(!modal)}
                    color='info'
                    >
                        <CModalHeader closeButton>
                            <CModalTitle>Konfirmasi</CModalTitle>
                        </CModalHeader>
                        <CModalBody>
                            <p>Apakah anda yakin untuk memberikan approval kepada keberangkatan ini?</p>
                        </CModalBody>
                        <CModalFooter>
                            <CButton type="submit" color="primary" onClick={() => submitHandler()}>
                                <CIcon name="cil-scrubber" /> Ya
                            </CButton>{' '}
                            <CButton color="secondary" onClick={() => setModal(!modal)}>Batalkan</CButton>
                        </CModalFooter>
                    </CModal>
        </>
    )


}

export default DetailApproval