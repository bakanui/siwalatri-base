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
Moment.globalTimezone = 'Asia/Makassar';

const PenumpangHarian = () => {
    const [dateFilter, setDateFilter] = useState(new Date());
    const todays = new Date()
    const { token } = useToken();
    const [link_pdf, setLinkPdf] = useState('');

    const headers = {
        headers: {
          'Authorization': "bearer " + token 
        },
    }
    const [laporan, setLaporan] = useState([]);
    // const [kapal, setKapal] = useState();
    // const ref = React.createRef();

    useEffect(() => {
        fetchData(todays,false)
        // eslint-disable-next-line
    }, [])


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
        // console.log(result)
        let tmp = []
        // console.log(result.data)
        // if(results.message !== 'no data'){
            // if(results.details.length > 0){
            //     results.details.map((det)=>{
            //         // let det_kap = getKapals(det.id_kapal)
            //         // console.log(det_kap);
            //         let det_lap = det
            //         results.dermagas.map((derma) => {
            //             if(det.tujuan_awal === derma.id_dermaga){
            //                 det_lap = {...det_lap, tujuan_awal_name: derma.nama_dermaga, tanggal_laporan:tanggal}
            //             }else if(det.tujuan_akhir === derma.id_dermaga){
            //                 det_lap = {...det_lap, tujuan_akhir_name: derma.nama_dermaga, tanggal_laporan:tanggal}
            //             }
            //             return( <></> )
            //         })
            //         tmp.push(det_lap)
            //         return( <></> )
            //     })
            // }
        // }
        // setLaporan(tmp)
        setLaporan(result.data.details)

        let links = apiUrl + 'laporan/harian_armada/detail/pdf?tanggal='+tanggal
        setLinkPdf(links)
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
            
            <div className='card' style={{padding:'10px'}}>
            {(() => {
                if(laporan.length !== 0){
                    return(
                        <div style={{textAlign:'end', margin:'10px 0'}}><a href={link_pdf} target="_blank"  className="btn c-link-pdf">Export Laporan Harian</a></div>
                    )
                }
            })()}
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
                                        <td>{lap.panjang}</td>
                                        <td>{lap.grt}</td>
                                        <td>{lap.dwt}</td>
                                        <td>{lap.created_at}</td>
                                        <td>-</td>
                                        <td>{lap.tujuan_awal_name}</td>
                                        <td>{lap.created_at}</td>
                                        <td>-</td>
                                        <td>-</td>
                                        <td>{lap.updated_at}</td>
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
                                        <td>{lap.count_trip}</td>
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