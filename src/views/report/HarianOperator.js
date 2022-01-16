import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  CBadge,
//   CCardBody,
//   CCardFooter,
//   CCol,
//   CHeader,
  CDataTable,
//   CLink,
//   CWidgetIcon,
//   CRow,
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
//   CTextarea, 
//   CSelect
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import useToken from '../../../src/useToken';
import Moment from 'react-moment';
import { apiUrl } from './../../reusable/constants'
import 'moment-timezone';
// import { Link } from 'react-router-dom';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import dayjs from 'dayjs';
Moment.globalTimezone = 'Asia/Makassar';


const HarianOperator = () => {
    const todays = new Date()
    const { token } = useToken();

    // const headers = {
    //     headers: {
    //       'Authorization': "bearer " + token 
    //     },
    // }
    useEffect(() => {
        fetchData(todays,false)
        // eslint-disable-next-line
    }, [])

    const [reports, setReport] = useState([]);
    // const [filter, setFilter] = useState(false)
    const [dateFilter, setDateFilter] = useState(new Date());

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
        
        const result = await axios.get(apiUrl + 'laporan/harian_armada', head)
        .catch(function (error) {
          if(error.response?.status === 401){
              localStorage.removeItem('access_token')
              window.location.reload()
          }
        })
        setReport(result.data.penumpang)
    }

    function handleDateChange(date){
        setDateFilter(date);
        fetchData(date,true)
    }

    const getBadge = (status)=>{
        switch (status) {
          case 'Berlayar': return 'success'
          case 'Nyandar': return 'secondary'
          case 'Persiapan': return 'warning'
          default: return 'primary'
        }
      }

    return(
        <>
            <DatePicker
                className='form-date'
                selected={dateFilter}
                onChange={(date) => handleDateChange(date)} //only when value has changed
            />
            <CDataTable
                items={reports}
                fields={[
                { key: 'nama_armada', label:'Nama Operator', _style: { width: '10%'}},
                { key: 'nama_kapal', _style: { width: '10%'} },
                { key: 'nama_nahkoda', _style: { width: '10%'} },
                { key: 'keberangkatan', label:'Keberangkatan', _style: { width: '10%'} },
                { key: 'status', _style: { width: '1%'} },
                { key: 'jml_penumpang', label:'Jml Penumpang', _style: { width: '1%'} },
                { key: 'tanggal_berangkat', label:'Waktu Berangkat', _style: { width: '5%'} },
                { key: 'tanggal_sampai', label:'Waktu Sampai', _style: { width: '5%'} },
                ]}
                columnFilter
                button
                hover
                pagination
                bordered
                striped
                size="sm"
                itemsPerPage={10}
                scopedSlots = {{
                    'status':
                    (item)=>(
                        <td>
                            <CBadge color={getBadge(item.status)}>
                                {item.status}
                            </CBadge>
                        </td>
                    ),
                    'keberangkatan':
                    (item)=>(
                    <td>
                       {item.tujuan_awal}  <CIcon name="cil-arrow-right" className="mfe-2" /> {item.tujuan_akhir} 
                    </td>
                    ),
                }}
            />
        </>
    )
}

export default HarianOperator