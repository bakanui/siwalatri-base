import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  CBadge,
  CDataTable,
  CButton,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import useToken from '../../../src/useToken';
import Moment from 'react-moment';
import { apiUrl } from './../../reusable/constants'
import 'moment-timezone';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import dayjs from 'dayjs';
import { Link } from 'react-router-dom';

Moment.globalTimezone = 'Asia/Makassar';

const HarianOperator = () => {

    const todays = new Date()
    const { token } = useToken();

    useEffect(() => {
        fetchData(todays,false)
        // eslint-disable-next-line
    }, [])

    const [reports, setReport] = useState([]);
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
        console.log(result.data.penumpang)
        setReport(result.data.penumpang)
    }

    function handleDateChange(date){
        setDateFilter(date);
        fetchData(date,true)
    }

    const getBadge = (status)=>{
        switch (status) {
          case 'Berlayar': return 'success'
          case 'Sandar': return 'secondary'
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
            {/* <PDFDownloadLink document={<MyDoc />} fileName="somename.pdf">
                {({ blob, url, loading, error }) => (loading ? 'Mohon menunggu...' : <CButton color="primary">
                <CIcon name="cil-scrubber" /> Download sebagai PDF
            </CButton>)}
            </PDFDownloadLink> */}
            
            <CDataTable
                items={reports}
                fields={[
                { key: 'no', label:'No. ', _style: { width: '1%'} },   
                { key: 'nama_armada', label:'Nama Operator', _style: { width: '10%'}},
                { key: 'nama_kapal', _style: { width: '10%'} },
                { key: 'nama_nahkoda', _style: { width: '10%'} },
                { key: 'keberangkatan', label:'Keberangkatan', _style: { width: '10%'} },
                { key: 'status', _style: { width: '1%'} },
                { key: 'jml_penumpang', label:'Jml Penumpang', _style: { width: '1%'} },
                { key: 'tanggal_berangkat', label:'Waktu Berangkat', _style: { width: '5%'} },
                { key: 'tanggal_sampai', label:'Waktu Sampai', _style: { width: '5%'} },
                { key: 'aksi', label:'#', _style: { width: '1%'} },
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
                    'no':
                    (item, index)=>(
                        <td>
                            {index + 1}
                        </td>
                    ),
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
                    'aksi':
                    (item)=>(
                        <td>
                            <Link to={"/detail-keberangkatan-petugas/"+item.id_jadwal+"/"+dayjs(dateFilter).format('YYYY-MM-DD')}>
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
        </>
    )
}

export default HarianOperator