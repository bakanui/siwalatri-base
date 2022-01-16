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
  CLink
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import useToken from '../useToken';
import Moment from 'react-moment';
import { useParams } from 'react-router-dom';
import { apiUrl } from '../reusable/constants'
import dayjs from 'dayjs';
import 'moment-timezone';


Moment.globalTimezone = 'Asia/Makassar';
const DetailKeberangkatan = () => {
    const { id_keberangkatan } = useParams();
    const todays = new Date()
    const { token,type,id } = useToken();
    const [datas, setData] = useState([]);
    const [undatas, setUnData] = useState([]);
    const [tujuan, setTotTujuan] = useState([]);
    const [jenis, setTotJenis] = useState([]);
    const [typeModal, setTypeModal] = useState()  
    const [modal, setModal] = useState(false)

    useEffect(() => {
      fetchData()
      // eslint-disable-next-line
    }, [])
  
  const fetchData = async (dates,filter) => {
      let head = {
          headers: {
              'Authorization': "bearer " + token 
          },
          params: {
              tanggal: '2021-12-07'
          },
      }
      if(filter === true){
           head = {
              headers: {
                  'Authorization': "bearer " + token 
                },
                params: {
                    tanggal: dayjs(dates).format('YYYY-MM-DD')
                },
          }
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


    return(
        <>
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
                                fields={ type === 'Loket' ? fields : fields2}
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
                  show={modal} 
                  onClose={() => setModal(!modal)}
                  color='info'
                  >
                      <CModalHeader closeButton>
                          <CModalTitle>{typeModal} Data Penumpang</CModalTitle>
                      </CModalHeader>
                      <CForm  method="post" encType="multipart/form-data" className="form-horizontal">
                      <CModalBody>
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