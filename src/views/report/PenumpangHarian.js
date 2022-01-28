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
// import { Link } from 'react-router-dom';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import dayjs from 'dayjs';
import { 
    PDFDownloadLink, 
    Page, 
    Document, 
    StyleSheet,
} from '@react-pdf/renderer';
import { 
    Table,
    TableHeader,
    TableCell,
    TableBody,
    DataTableCell 
} from '@david.kucsai/react-pdf-table'
import { TableRow } from '@david.kucsai/react-pdf-table/lib/TableRow';
Moment.globalTimezone = 'Asia/Makassar';

const PenumpangHarian = () => {
    const [dateFilter, setDateFilter] = useState(new Date());
    const todays = new Date()
    const { token } = useToken();

    const headers = {
        headers: {
          'Authorization': "bearer " + token 
        },
    }
    const [laporan, setLaporan] = useState([]);
    // const [kapal, setKapal] = useState();
    // const ref = React.createRef();

    const styles = StyleSheet.create({
        page: {
            orientation: 'landscape',
        },
        section: {
          margin: 10,
          padding: 20,
          width: '100%',
        }
      });

    useEffect(() => {
        fetchData(todays,false)
        // eslint-disable-next-line
    }, [])


    const MyDoc = () => (
        <Document  >
            <Page size="A4" style={styles.page} wrap>
                <Table
                    data={laporan}
                >
                    <TableHeader textAlign={"center"}>
                        <TableRow>
                            <TableCell rowSpan="3">No</TableCell>
                            <TableCell rowSpan="3">Nama Kapal Jenis Pelayaran</TableCell>
                            <TableCell rowSpan="3">Bendera</TableCell>
                            <TableCell rowSpan="3">Pemilik/Agent</TableCell>
                            <TableCell colSpan="3">Ukuran</TableCell>
                            <TableCell colSpan="3">Tiba</TableCell>
                            <TableCell colSpan="3">Tambat</TableCell>
                            <TableCell colSpan="3">Berangkat</TableCell>
                            <TableCell colSpan="4">Perdagangan Dalam Negeri</TableCell>
                            <TableCell colSpan="4">Perdagangan Luar Negeri</TableCell>
                            <TableCell colSpan="2">Penumpang</TableCell>
                            <TableCell rowSpan="3">Ket/Trip</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell rowSpan="2">Panjang Kapal</TableCell>
                            <TableCell rowSpan="2">GRT</TableCell>
                            <TableCell rowSpan="2">DWT</TableCell>
                            <TableCell rowSpan="2">Tgl</TableCell>
                            <TableCell rowSpan="2">Jam</TableCell>
                            <TableCell rowSpan="2">Pelabuhan Asal</TableCell>
                            <TableCell rowSpan="2">Tgl</TableCell>
                            <TableCell rowSpan="2">Jam</TableCell>
                            <TableCell rowSpan="2">Jenis</TableCell>
                            <TableCell rowSpan="2">Tgl</TableCell>
                            <TableCell rowSpan="2">Jam</TableCell>
                            <TableCell rowSpan="2">Pelabuhan Tujuan</TableCell>
                            <TableCell colSpan="2">Bongkar</TableCell>
                            <TableCell colSpan="2">Muat</TableCell>
                            <TableCell colSpan="2">Import</TableCell>
                            <TableCell colSpan="2">Export</TableCell>
                            <TableCell rowSpan="2">Debar Kasi (Naik)</TableCell>
                            <TableCell rowSpan="2">Embar Kasi (Turun)</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>Jenis Brg/Hewan</TableCell>
                            <TableCell>Jenis Kemasan</TableCell>
                            <TableCell>Jenis Brg/Hewan</TableCell>
                            <TableCell>Jenis Kemasan</TableCell>
                            <TableCell>Jenis Brg/Hewan</TableCell>
                            <TableCell>Jenis Kemasan</TableCell>
                            <TableCell>Jenis Brg/Hewan</TableCell>
                            <TableCell>Jenis Kemasan</TableCell>
                        </TableRow>
                    </TableHeader>
                    {/* <TableBody>
                        <DataTableCell getContent={(r) => r.no}/>
                        <DataTableCell getContent={(r) => r.nama_operator}/>
                        <DataTableCell getContent={(r) => r.nama_kapal}/>
                        <DataTableCell getContent={(r) => r.nama_nahkoda}/>
                        <DataTableCell getContent={(r) => r.keberangkatan}/>
                        <DataTableCell getContent={(r) => r.status}/>
                        <DataTableCell getContent={(r) => r.jml_penumpang}/>
                        <DataTableCell getContent={(r) => r.waktu_berangkat}/>
                        <DataTableCell getContent={(r) => r.waktu_sampai}/>
                    </TableBody> */}
                </Table>
            </Page>
        </Document>
    );

    const fetchData = async (dates,filter) => {
        
        let tanggal = dayjs(todays).format('YYYY-MM-DD')

        if(filter){
            tanggal = dayjs(dates).format('YYYY-MM-DD')
        }
        
        const result = await axios.get(apiUrl + 'laporan/harian_armada/detail?tanggal='+tanggal, headers)
        .catch(function (error) {
          if(error.response?.status === 401){
              localStorage.removeItem('access_token')
              window.location.reload()
          }
        })
        let results = result.data
        // console.log(results)
        let tmp = []
        if(results.details.length > 0){
            results.details.map((det)=>{
                // let det_kap = getKapals(det.id_kapal)
                // console.log(det_kap);
                let det_lap = det
                results.dermagas.map((derma) => {
                    if(det.tujuan_awal === derma.id_dermaga){
                        det_lap = {...det_lap, tujuan_awal_name: derma.nama_dermaga, tanggal_laporan:tanggal}
                    }else if(det.tujuan_akhir === derma.id_dermaga){
                        det_lap = {...det_lap, tujuan_akhir_name: derma.nama_dermaga, tanggal_laporan:tanggal}
                    }
                    return( <></> )
                })
                // console.log(kapal.dwt);
                // det_lap = {...det_lap,  dwt: kapal.dwt, grt: kapal.grt, panjang_kapal: kapal.panjang}
                tmp.push(det_lap)
                return( <></> )
            })
        }
        console.log(tmp)
        setLaporan(tmp)
        // setLaporan(result.data)
    }

    // const getKapals = async (id_kapal) => {
    //      const datas_kapal = await axios.get(apiUrl + 'kapal/profile/'+id_kapal, headers)
    //      return datas_kapal.data
    // }
    function handleDateChange(date){
        setDateFilter(date);
        fetchData(date,true)
    }


    return(
        <>
        <div>
            <DatePicker
                className='form-date'
                selected={dateFilter}
                onChange={(date) => handleDateChange(date)} //only when value has changed
            />
            {(() => {
                if(laporan.length !== 0){
                    return(
                        <div className='pull-right'>
                        <PDFDownloadLink document={<MyDoc />} fileName="laporan_harian.pdf">
                            {({ blob, url, loading, error }) => (loading ? 'Mohon menunggu...' : <CButton color="info">
                            <CIcon name="cil-scrubber" /> Download sebagai PDF
                            </CButton>)}
                        </PDFDownloadLink>
                        </div>
                    )
                }
            })()}
            
            <div className='card' style={{padding:'10px'}}>
                <table className="table table-bordered table-hover table-responsive">
                    <thead>
                        <tr>
                            <th rowSpan="3">No</th>
                            <th rowSpan="3">Nama Kapal Jenis Pelayaran</th>
                            <th rowSpan="3">Bendera</th>
                            <th rowSpan="3">Pemilik/Agent</th>
                            <th colSpan="3">Ukuran</th>
                            <th colSpan="3">Tiba</th>
                            <th colSpan="3">Tambat</th>
                            <th colSpan="3">Berangkat</th>
                            <th colSpan="4">Perdagangan Dalam Negeri</th>
                            <th colSpan="4">Perdagangan Luar Negeri</th>
                            <th colSpan="2">Penumpang</th>
                            <th rowSpan="3">Ket/Trip</th>
                        </tr>
                        <tr>
                            <th rowSpan="2">Panjang Kapal</th>
                            <th rowSpan="2">GRT</th>
                            <th rowSpan="2">DWT</th>
                            <th rowSpan="2">Tgl</th>
                            <th rowSpan="2">Jam</th>
                            <th rowSpan="2">Pelabuhan Asal</th>
                            <th rowSpan="2">Tgl</th>
                            <th rowSpan="2">Jam</th>
                            <th rowSpan="2">Jenis</th>
                            <th rowSpan="2">Tgl</th>
                            <th rowSpan="2">Jam</th>
                            <th rowSpan="2">Pelabuhan Tujuan</th>
                            <th colSpan="2">Bongkar</th>
                            <th colSpan="2">Muat</th>
                            <th colSpan="2">Import</th>
                            <th colSpan="2">Export</th>
                            <th rowSpan="2">Debar Kasi (Naik)</th>
                            <th rowSpan="2">Embar Kasi (Turun)</th>

                        </tr>
                        <tr>
                            <th>Jenis Brg/Hewan</th>
                            <th>Jenis Kemasan</th>
                            <th>Jenis Brg/Hewan</th>
                            <th>Jenis Kemasan</th>
                            <th>Jenis Brg/Hewan</th>
                            <th>Jenis Kemasan</th>
                            <th>Jenis Brg/Hewan</th>
                            <th>Jenis Kemasan</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            laporan.map((lap,index) => {
                                return(
                                    <tr key={index}>
                                        <td>{index+1}</td>
                                        <td>Nama Kapal</td>
                                        <td>RI</td>
                                        <td>{lap.nama_armada}</td>
                                        <td>panjang</td>
                                        <td>lebar</td>
                                        <td>panjang</td>
                                        <td>{lap.tanggal_laporan}</td>
                                        <td>-</td>
                                        <td>{lap.tujuan_awal_name}</td>
                                        <td>-</td>
                                        <td>-</td>
                                        <td>-</td>
                                        <td>{lap.tanggal_laporan}</td>
                                        <td>-</td>
                                        <td>{lap.tujuan_akhir_name}</td>
                                        <td>-</td>
                                        <td>-</td>
                                        <td>-</td>
                                        <td>-</td>
                                        <td>-</td>
                                        <td>-</td>
                                        <td>-</td>
                                        <td>-</td>
                                        <td>{lap.jml_penumpang}</td>
                                        <td>{lap.jml_penumpang}</td>
                                        <td>-</td>
                                    </tr>

                                )
                            })
                        }
                    </tbody>
                </table>
            </div>
            
        </div>
            
        </>
    )


}

export default PenumpangHarian