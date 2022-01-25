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
import { 
    PDFDownloadLink, 
    Page, 
    Document, 
    StyleSheet
} from '@react-pdf/renderer';
import { 
    Table,
    TableHeader,
    TableCell,
    TableBody,
    DataTableCell 
} from '@david.kucsai/react-pdf-table'

Moment.globalTimezone = 'Asia/Makassar';

const HarianOperator = () => {

    const styles = StyleSheet.create({
        page: {
            flexDirection: 'row',
            backgroundColor: '#E4E4E4'
        },
        section: {
            margin: 10,
            padding: 10,
            flexGrow: 1
        },
        judul : {
            fontSize: 10,
            textTransform: "uppercase",
            margin: 1
        }
    });

    const MyDoc = () => (
        <Document>
            <Page>
                <Table
                    data={reports}
                >
                    <TableHeader textAlign={"center"}>
                        <TableCell>
                            No.
                        </TableCell>
                        <TableCell>
                            Nama Operator
                        </TableCell>
                        <TableCell>
                            Nama Kapal
                        </TableCell>
                        <TableCell>
                            Nama Nahkoda
                        </TableCell>
                        <TableCell>
                            Keberangkatan
                        </TableCell>
                        <TableCell>
                            Status
                        </TableCell>
                        <TableCell>
                            Jml Penumpang
                        </TableCell>
                        <TableCell>
                            Waktu Berangkat
                        </TableCell>
                        <TableCell>
                            Waktu Sampai
                        </TableCell>
                    </TableHeader>
                    <TableBody>
                        <DataTableCell getContent={(r) => r.no}/>
                        <DataTableCell getContent={(r) => r.nama_operator}/>
                        <DataTableCell getContent={(r) => r.nama_kapal}/>
                        <DataTableCell getContent={(r) => r.nama_nahkoda}/>
                        <DataTableCell getContent={(r) => r.keberangkatan}/>
                        <DataTableCell getContent={(r) => r.status}/>
                        <DataTableCell getContent={(r) => r.jml_penumpang}/>
                        <DataTableCell getContent={(r) => r.waktu_berangkat}/>
                        <DataTableCell getContent={(r) => r.waktu_sampai}/>
                    </TableBody>
                </Table>
            </Page>
        </Document>
    );
    
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
            <PDFDownloadLink document={<MyDoc />} fileName="somename.pdf">
                {({ blob, url, loading, error }) => (loading ? 'Mohon menunggu...' : <CButton color="primary">
                <CIcon name="cil-scrubber" /> Download sebagai PDF
            </CButton>)}
            </PDFDownloadLink>
            
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
                }}
            />
        </>
    )
}

export default HarianOperator