import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
//   CCol,
  CDataTable,
//   CButton,
//   CModal, 
//   CModalHeader, 
//   CModalTitle, 
//   CModalBody, 
//   CModalFooter, 
//   CForm, 
//   CFormGroup, 
//   CLabel, 
//   CInput, 
//   CSelect,
//   CBadge,
//   CWidgetIcon,
  CRow,
//   CCard,
//   CLink
} from '@coreui/react'
// import CIcon from '@coreui/icons-react'
import useToken from '../../../src/useToken';
import Moment from 'react-moment';
import { apiUrl } from './../../reusable/constants'
import { useParams } from 'react-router-dom';
// import { Link } from 'react-router-dom';
// import dayjs from 'dayjs';
import 'moment-timezone';

Moment.globalTimezone = 'Asia/Makassar';
const DetailManifest = () => {
    const { id_jadwals,fil_date } = useParams();
    const { token } = useToken();
 
    const [datas, setDatas] = useState([]);
    const [details, setDetails] = useState([]);
    // eslint-disable-next-line
    const [jenis, setJenis] = useState([]);
    const [link_pdf, setLinkPdf] = useState('');


    const fetchData = async () => {
        
        let head = {
            headers: {
                'Authorization': "bearer " + token 
            },
            params: {
                tanggal: fil_date
            },
        }

        const result = await axios.get(apiUrl + 'laporan/harian_armada/detail/'+id_jadwals, head)
        .catch(function (error) {
          if(error.response?.status === 401){
              localStorage.removeItem('access_token')
              window.location.reload()
          }
        })
        setDatas(result.data.datas)
        console.log(result.data.datas)
        setDetails(result.data.detail[0])
        setJenis(result.data.jenis)
        let links = apiUrl + 'laporan/harian_armada/detail-non-history/'+id_jadwals+'?tanggal='+fil_date
        setLinkPdf(links)
    }

    useEffect(() => {
        fetchData(fil_date,false)
        // eslint-disable-next-line
    }, [])

    const fields = [
        { key: 'no', _style: { width: '1%'} },
        { key: 'nama_penumpang', _style: { width: '15%'} },
        { key: 'no_identitas', _style: { width: '10%'} },
        { key: 'jenis_kelamin', _style: { width: '10%'} },
        { key: 'nama_tujuan', _style: { width: '10%'} },
      ]

    return(
        <>
            <div className='card inner-padd-report'>
                    <div style={{textAlign:'end'}}><a href={link_pdf} target="_blank"  className="btn c-link-pdf">Export PDF</a></div>
                    <h4 className='center-title bold-text'>Detail Penumpang Boat {details.nama_armada}</h4>
                    <CRow style={{margin:'1rem 0'}}>
                        <div className='col-xs-12 col-sm-6 col-md-6'>
                            <div className='row'>
                                    <div className='col-xs-6 col-sm-6 col-md-6'>
                                        <b>Total Penumpang</b>
                                    </div>
                                    <div className='col-xs-6 col-sm-6 col-md-6'>
                                        : {details.total ? details.total : 0}
                                    </div>
                            </div>
                        </div>
                        <div className='col-xs-12 col-sm-6 col-md-6'>
                            <div className='row'>
                                    <div className='col-xs-4 col-sm-4 col-md-4'>
                                        <b>Nama Kapal</b>
                                    </div>
                                    <div className='col-xs-8 col-sm-8 col-md-8'>
                                        : {details.nama_kapal}
                                    </div>
                            </div>
                            <div className='row'>
                                    <div className='col-xs-4 col-sm-4 col-md-4'>
                                        <b>Keberangkatan</b>
                                    </div>
                                    <div className='col-xs-8 col-sm-8 col-md-8'>
                                        : Dermaga {details.tujuan_akhir}
                                    </div>
                            </div>
                            <div className='row'>
                                    <div className='col-xs-4 col-sm-4 col-md-4'>
                                        <b>Jam</b>
                                    </div>
                                    <div className='col-xs-8 col-sm-8 col-md-8'>
                                        : {details.jadwal}
                                    </div>
                            </div>
                            <div className='row'>
                                    <div className='col-xs-4 col-sm-4 col-md-4'>
                                        <b>Tanggal</b>
                                    </div>
                                    <div className='col-xs-8 col-sm-8 col-md-8'>
                                        : <Moment format="d MMMM Y">{fil_date}</Moment>
                                    </div>
                            </div>
                        </div>
                    </CRow>
                    <div className='list-container table-bordered'>
                        <CDataTable
                            items={datas}
                            fields={fields}
                            hover
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
                                'jenis_kelamin':
                                (item,index)=>(
                                <td key={index}>
                                    {item.jenis_kelamin === 0 ? 'Laki Laki' : 'Wanita'}
                                </td>
                                ),
                            }}
                        />
                    </div>
            </div>
        </>
    )
}

export default DetailManifest;