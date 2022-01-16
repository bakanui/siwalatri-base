import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  CBadge,
  CCardBody,
  CCardFooter,
  CCol,
  CHeader,
  CDataTable,
  CLink,
  CWidgetIcon,
  CRow,
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
  CSelect
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import useToken from '../../../src/useToken';
import Moment from 'react-moment';
import { apiUrl } from './../../reusable/constants'
import 'moment-timezone';
import { Link } from 'react-router-dom';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import dayjs from 'dayjs';
Moment.globalTimezone = 'Asia/Makassar';


const LaporanManifest = () => {
    const todays = new Date()
    const { token,id } = useToken();
    const headers = {
        headers: {
          'Authorization': "bearer " + token 
        },
    }
    useEffect(() => {
        fetchData(todays,false)
    }, [])

    const [filter, setFilter] = useState(false)
    const [dateFilter, setDateFilter] = useState(new Date());
    const [reports, setReport] = useState([]);

    const fetchData = async (dates,filter) => {
        
        let head = {
            headers: {
                'Authorization': "bearer " + token 
            },
            params: {
                tanggal: dayjs(todays).format('YYYY-MM-DD')
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
        
        const result = await axios.get(apiUrl + 'laporan/manifest/armada/'+id, head)
        .catch(function (error) {
          if(error.response?.status === 401){
              localStorage.removeItem('access_token')
              window.location.reload()
          }
        })
        console.log(result.data)
        setReport(result.data)
    }
    
    function handleDateChange(date){
        setDateFilter(date);
        fetchData(date,true)
    }

    const fields = [
        { key: 'no', _style: { width: '1%'} },
        { key: 'nama_kapal', _style: { width: '15%'} },
        { key: 'jadwal', _style: { width: '10%'} },
        { key: 'keberangkatan', _style: { width: '20%'} },
        { key: 'jml_penumpang', _style: { width: '5%'} },
        { key: 'detail', _style: { width: '1%'} },
      ]

    return(
        <>
            <DatePicker
                className='form-date'
                selected={dateFilter}
                onChange={(date) => handleDateChange(date)} //only when value has changed
            />
            <div className='grey-thead'>
            <CDataTable
                items={reports}
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
                    'keberangkatan':
                    (item)=>(
                    <td>
                        {item.tujuan_awal}  <CBadge color="warning">{item.lokasi_awal}</CBadge> <CIcon name="cil-arrow-right" className="mfe-2" /> {item.tujuan_akhir} <CBadge color="warning">{item.lokasi_akhir}</CBadge>
                    </td>
                    ),
                    'jml_penumpang':
                    (item)=>(
                    <td>
                        {item.total ? item.total : 0}
                    </td>
                    ),
                    'detail':
                    (item)=>(
                    <td>
                       <Link to={"/detail-manifest/"+item.id_jadwal+"/"+dayjs(dateFilter).format('YYYY-MM-DD')}>
                        <CButton
                            color="primary"
                            variant="outline"
                            shape="square"
                            size="sm"
                        >
                            Details
                        </CButton>
                        </Link>
                    </td>
                    ),
                }}
            />
            </div>
        </>
    )
}

export default LaporanManifest