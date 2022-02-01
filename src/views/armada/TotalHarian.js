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
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import useToken from '../../useToken';
import Moment from 'react-moment';
import { apiUrl } from '../../reusable/constants'
import 'moment-timezone';
import dayjs from 'dayjs';
import { Link } from 'react-router-dom';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import _ from "lodash";

Moment.globalTimezone = 'Asia/Makassar';
const TotalHarian = () => {
    const [filter, setFilter] = useState(false)
    const [dateFilter, setDateFilter] = useState(new Date());
    const todays = new Date()
    const { token,type,id,id_armada } = useToken();
    const [total_harian, setTotalHarian] = useState([]);
    const headers = {
        headers: {
          'Authorization': "bearer " + token 
        },
        timeout: 10000 
      }
    
    const [typeModal, setTypeModal] = useState() 
    const [modal, setModal] = useState(false) 
    const [delmodal, setModalDelete] = useState(false)
    const [noData, setModalNoData] = useState(false)

      useEffect(() => {
        fetchData(todays,false)
        // eslint-disable-next-line
      }, [])
    
    const fetchData = async (dates,filter) => {
        let head = {
            headers: {
                'Authorization': "bearer " + token 
            },
            // params: {
            //     tanggal: dayjs(todays).format('YYYY-MM-DD')
            // },
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

        let id_user = id

        if(type === 'loket'){
            id_user = id_armada
        }

        const result = await axios.get(apiUrl + 'penumpang/view_harian/'+id_user, head)
        .catch(function (error) {
        if(error.response?.status === 401){
            localStorage.removeItem('access_token')
            window.location.reload()
        }
        })
        setTotalHarian(result.data)
        console.log(result)
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

      function money(amount){
        return Number(amount)
            .toFixed(2)
            .replace(/\d(?=(\d{3})+\.)/g, '$&,');
    };
    

    return(
        <>
                <div className='grey-thead'>
                        <DatePicker
                            className='form-date'
                            selected={dateFilter}
                            onChange={(date) => handleDateChange(date)} //only when value has changed
                        />
                        <CDataTable
                            items={total_harian}
                            fields={[
                                { key: 'nama_kapal', _style: { width: '15%'}},
                                { key: 'jadwal', _style: { width: '10%'} },
                                { key: 'keberangkatan', _style: { width: '25%'} },
                                { key: 'kapasitas_penumpang', _style: { width: '1%'} },
                                { key: 'jenis', _style: { width: '5%'} },
                                { key: 'status', _style: { width: '5%'} },
                                { key: 'pendapatan', _style: { width: '10%'}, sorter: false, filter: false  },
                                { key: 'aksi', _style: { width: '1%'}, sorter: false, filter: false  },
                            ]}
                            columnFilter
                            // tableFilter
                            button
                            hover
                            pagination
                            bordered
                            striped
                            size="sm"
                            itemsPerPage={10}
                            scopedSlots = {{
                                'keberangkatan':
                                (item)=>(
                                <td>
                                    {item.tujuan_awal}  <CBadge color="warning">{item.lokasi_awal}</CBadge> <CIcon name="cil-arrow-right" className="mfe-2" /> {item.tujuan_akhir} <CBadge color="warning">{item.lokasi_akhir}</CBadge>
                                </td>
                                ),
                                'kapasitas_penumpang':
                                (item)=>(
                                <td>
                                    {item.total ? item.total : 0} / {item.kapasitas_penumpang}
                                </td>
                                ),
                                'jenis':
                                (item)=>(
                                <td>
                                    {item.ekstra === 0 ? 'UMUM' : 'EXTRA'}
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
                                'pendapatan':
                                (item)=>(
                                <td>
                                          {item.harga_total ? Number(item.harga_total).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,') : 0}
                                </td>
                                ),
                                'aksi':
                                (item) => (
                                    <td>
                                        {(() => {
                                             if(item.id_jadwal){
                                                    return(
                                                        <Link to={"/detail-keberangkatan/"+item.id_jadwal+"/"+dayjs(dateFilter).format('YYYY-MM-DD')}>
                                                        <CButton
                                                            color="primary"
                                                            variant="outline"
                                                            shape="square"
                                                            size="sm"
                                                        >
                                                            Details
                                                        </CButton>
                                                        </Link>
                                                    )
                                             }else{
                                                return(
                                                    <CButton
                                                        color="primary"
                                                        variant="outline"
                                                        shape="square"
                                                        size="sm"
                                                        onClick={()=>{
                                                            setModalNoData(true)
                                                        }}
                                                    >
                                                        Details
                                                    </CButton>
                                                )

                                             }
                                        })()}
                                    </td>
                                )
                                // 'edit':
                                // (item)=>(
                                //     <td className="py-2">
                                //         <CButton
                                //         color="primary"
                                //         variant="outline"
                                //         shape="square"
                                //         size="sm"
                                //         onClick={()=>{
                                //             setTypeModal('Edit')
                                //             setNama(item.nama_nahkoda)
                                //             setNoHP(item.no_hp)
                                //             setIdKecakapan(item.id_kecakapan)
                                //             setIdNahkoda(item.id_nahkoda)
                                //             setModal(!modal)
                                //         }}
                                //         >
                                //         Edit
                                //         </CButton>
                                //     </td>
                                // ),
                                // 'delete':
                                // (item) =>(
                                //         <td className="py-2">
                                //             <CButton
                                //             color="danger"
                                //             variant="outline"
                                //             shape="square"
                                //             size="sm"
                                //             onClick={()=>{
                                //                 setTypeModal('Delete')
                                //                 setIdNahkoda(item.id_nahkoda)
                                //                 setModalDelete(!delmodal)
                                //             }}
                                //             >
                                //             Hapus
                                //             </CButton>
                                //         </td>
                                // )
                            }}
                        />
                        <div className='pull-right' style={{padding:'1rem',float:'right'}}>
                            <h4><b>{"Rp. "+ total_harian.reduce((prev,current) => {
                                return prev + (Number(current.harga_total));
                            },0).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}</b></h4>
                        </div>
                </div>

                <CModal 
                    show={noData} 
                    onClose={() => setModalNoData(false)}
                    color='info'
                    >
                    <CModalHeader closeButton>
                        <CModalTitle>Pemberitahuan</CModalTitle>
                    </CModalHeader>
                    <CModalBody>
                          <h5>Data Keberangkatan tidak ada</h5>
                    </CModalBody>
                </CModal>
        </>
    )


}

export default TotalHarian