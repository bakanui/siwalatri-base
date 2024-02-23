import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  CBadge,
  CDataTable,
  CButton,
  CPagination,
  CLabel,
  CFormGroup,
  CDropdown,
  CDropdownToggle,
  CDropdownMenu,
  CDropdownItem,
  CRow,
  CCol,
  CContainer,
  CSelect
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import useToken from '../../useToken';
import Moment from 'react-moment';
import { apiUrl } from '../../reusable/constants'
import 'moment-timezone';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import dayjs from 'dayjs';
import { Link } from 'react-router-dom';
import 'moment-timezone';
import { format, setDayOfYear } from 'date-fns'
import { DateRangePicker } from 'react-date-range';
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
import _ from "lodash";
import CsvDownloader from 'react-csv-downloader';

Moment.globalTimezone = 'Asia/Makassar';

const VA = () => {

    const { token } = useToken();
    const today = new Date()
    const [selectionRange, setSelectionRange] = useState([
      {
        startDate: today,
        endDate: today,
        key: 'selection'
      }
    ])
    const [reports, setReport] = useState([])
    const [exports, setExport] = useState([])
    const [totalPages, setTotalPages] = useState(1)
    const [curPage, setCurPage] = useState(1)
    const [limit, setLimit] = useState(10)
    const [orderBy, setOrderBy] = useState("id")
    const [order, setOrder] = useState(true)
    const [status, setStatus] = useState("semua")
    const [reversal, setReversal] = useState("semua")
    const [exporter, setExporter] = useState(false)

    useEffect(() => {
        fetchData(limit, curPage, selectionRange[0], orderBy, order, status, reversal)
        // eslint-disable-next-line
    }, [])

    function money (amount) {
        return Number(amount)
            .toFixed(2)
            .replace(/\d(?=(\d{3})+\.)/g, '$&,');
    }

    function ExportAsCSV(sts, expdata){
        // if(sts === false){
        //   return(
        //     <CButton style={{marginTop: "28px", marginLeft: "5px"}} color="primary" onClick={() => {
        //         fetchDataReport(orderBy, order, status, reversal);
        //         setExporter(true)
        //     }}>Export as .csv</CButton>
        //   )
        // }
        // else if(sts === true){
        //   if(expdata.length === undefined){
        //     return(
        //       <CButton style={{marginTop: "28px", marginLeft: "5px"}} color="secondary" disabled>Please wait...</CButton>
        //     )
        //   }else{
            if(expdata.length > 0){
                let name = "Rekonsiliasi_VA" + format(new Date(selectionRange[0].startDate), 'MMMddyyyy') + "-" + format(new Date(selectionRange[0].endDate), 'MMMddyyyy')
              return(
                <CsvDownloader
                filename={name}
                extension=".csv"
                separator=";"
                wrapColumnChar=""
                columns={[
                    {
                        id: 'id',
                        displayName: 'Invoice ID',
                    },
                    {
                        id: 'jenis_pembayaran',
                        displayName: 'jenis_pembayaran',
                    },
                    {
                        id: 'jenis_tiket',
                        displayName: 'jenis_tiket',
                    },
                    {
                        id: 'jumlah_tiket',
                        displayName: 'jumlah_tiket',
                    },
                    {
                        id: 'no_tagihan',
                        displayName: 'no_tagihan',
                    },
                    {
                        id: 'operator',
                        displayName: 'operator',
                    },
                    {
                        id: 'tanggal_keberangkatan',
                        displayName: 'tanggal_keberangkatan',
                    },
                    {
                        id: 'tanggal_pembelian_tiket',
                        displayName: 'tanggal_pembelian_tiket',
                    },
                    {
                        id: 'tujuan',
                        displayName: 'tujuan',
                    },
                    {
                        id: 'instansi',
                        displayName: 'instansi',
                    },
                    {
                        id: 'kd_user',
                        displayName: 'kd_user',
                    },
                    {
                        id: 'nama',
                        displayName: 'nama',
                    },
                    {
                        id: 'recordId',
                        displayName: 'recordId',
                    },
                    {
                        id: 'sts_bayar',
                        displayName: 'sts_bayar',
                    },
                    {
                        id: 'sts_reversal',
                        displayName: 'sts_reversal',
                    },
                    {
                        id: 'tagihan',
                        displayName: 'tagihan',
                    },
                    {
                        id: 'tgl_upd',
                        displayName: 'tgl_upd',
                    },
                    {
                        id: 'no_bukti',
                        displayName: 'no_bukti',
                    }
                ]}
                datas={expdata}>
                  <CButton style={{marginTop: "28px", marginLeft: "5px"}} color="danger" onClick={() => {setExporter(false)}}>Download .csv</CButton>
                </CsvDownloader>
              )
            }
        //   }
        // }
      }

    const fetchData = async (limit, curPage, date, orderBy, order, status, reversal) => {
        let ord = ''
        if(order === true){
            ord = 'asc'
        }else{
            ord = 'desc'
        }
        let head = {
            headers: {
                'Authorization': "bearer " + token 
            },
            params: {
                orderBy: orderBy,
                order: ord,
                limit: limit,
                page: curPage,
                fromDate: format(new Date(date.startDate), 'yyyy-MM-dd'),
                endDate: format(new Date(date.endDate), 'yyyy-MM-dd'),
                status: status,
                reversal: reversal
            },
        }
        
        const result = await axios.get(apiUrl + 'invoice/va', head)
        .catch(function (error) {
          if(error.response?.status === 401){
              localStorage.removeItem('access_token')
              window.location.reload()
          }
        })
        setCurPage(result.data.current_page)
        setTotalPages(result.data.last_page)
        if(result.data.data.length > 0){
            let final = []
            result.data.data.map((r)=>{
                let drand = r.tagihan.split(".")
                let insert = r
                insert = {...insert, tagihan: drand[0]}
                final.push(insert)
            })
            setReport(final)
        }else{
            setReport(result.data.data)
        }
    }

    const fetchDataReport = async (date, orderBy, order, status, reversal) => {
        let ord = ''
        if(order === true){
            ord = 'asc'
        }else{
            ord = 'desc'
        }
        let head = {
            headers: {
                'Authorization': "bearer " + token 
            },
            params: {
                orderBy: orderBy,
                order: ord,
                fromDate: format(new Date(date.startDate), 'yyyy-MM-dd'),
                endDate: format(new Date(date.endDate), 'yyyy-MM-dd'),
                status: status,
                reversal: reversal
            },
        }
        
        const result = await axios.get(apiUrl + 'invoice/va', head)
        .catch(function (error) {
          if(error.response?.status === 401){
              localStorage.removeItem('access_token')
              window.location.reload()
          }
        })
        if(result.data.data.length > 0){
            let final = []
            result.data.data.map((r)=>{
                let drand = r.tagihan.split(".")
                let insert = r
                insert = {...insert, tagihan: drand[0]}
                final.push(insert)
            })
            setExport(final)
        }else{
            setExport(result.data.data)
        }
    }

    function handlePageChange(page){
        setCurPage(page)
        fetchData(limit, page, selectionRange[0], orderBy, order, status, reversal)
    }

    function handleSorterChange(sort){
        setOrderBy(sort.column)
        setOrder(sort.asc)
        fetchData(limit, curPage, selectionRange[0], sort.column, sort.asc, status, reversal)
    }

    const getBadge = (status)=>{
        switch (status) {
          case "1": return 'success'
          case "0": return 'secondary'
          default: return 'primary'
        }
    }

    const getBadgeReversal = (status)=>{
        switch (status) {
          case "0": return 'secondary'
          case "1": return 'danger'
          default: return 'secondary'
        }
    }

    return(
        <CCol>
            <CRow style={{marginLeft: "-22px", marginRight: "-22px", marginBottom: "12px"}}>
                <CCol>
                    <div className="flex-date-range-filter">
                        <CLabel htmlFor="tahun">Pilih Tanggal</CLabel>
                        <CDropdown>
                        <CDropdownToggle className="form-control" color="secondary">
                            {format(new Date(selectionRange[0].startDate), 'dd/MM')+' - '+format(new Date(selectionRange[0].endDate), 'dd/MM')}
                        </CDropdownToggle>
                        <CDropdownMenu>
                            <DateRangePicker
                                onChange={item => 
                                    setSelectionRange([item.selection])
                                }
                                showSelectionPreview={true}
                                showDateDisplay={true}
                                showMonthAndYearPickers={true}
                                showPreview={false}
                                moveRangeOnFirstSelection={false}
                                ranges={selectionRange}
                                direction="horizontal"
                            />
                        </CDropdownMenu>
                        </CDropdown>
                    </div>
                </CCol>
                <CCol>
                    <CLabel htmlFor="status">Status</CLabel>
                    <CSelect onChange={(e)=>{setStatus(e.target.value)}} value={status} custom name="status" id="status">
                        <option value="semua">Semua</option>
                        <option value="1">Terbayar</option>
                        <option value="0">Belum Terbayar</option>
                    </CSelect>
                </CCol>
                <CCol>
                    <CLabel htmlFor="reversal">Reversal</CLabel>
                    <CSelect onChange={(e)=>{setReversal(e.target.value)}} value={reversal} custom name="reversal" id="reversal">
                        <option value="semua">Semua</option>
                        <option value="1">Ya</option>
                        <option value="0">Tidak</option>
                    </CSelect>
                </CCol>
                <CCol>
                    <CLabel htmlFor="limit">Limit</CLabel>
                    <CSelect onChange={(e)=>{setLimit(e.target.value)}} value={limit} custom name="limit" id="limit">
                        <option value="5">5</option>
                        <option value="10">10</option>
                        <option value="20">20</option>
                        <option value="50">50</option>
                        <option value="100">100</option>
                    </CSelect>
                </CCol>
                <CCol style={{paddingLeft: "0px"}}>
                    <CButton
                        style={{marginTop: "28px"}}
                        color="primary"
                        onClick={()=> {
                            fetchData(limit, curPage, selectionRange[0], orderBy, order, status, reversal);
                        }}
                    >Filter
                    </CButton>
                </CCol>
                <CCol style={{textAlign: "right"}}>
                    {ExportAsCSV(exporter,reports)}
                </CCol>
            </CRow>
            <CRow>
                <CDataTable
                    items={reports}
                    fields={[
                    { key: 'id', label:'No. ', _style: { width: '1%'} },  
                    { key: 'operator', _style: { width: '10%'}}, 
                    { key: 'nama', _style: { width: '10%'}},   
                    { key: 'no_tagihan', _style: { width: '10%'}},
                    { key: 'no_bukti', _style: { width: '10%'}},
                    { key: 'tujuan', _style: { width: '10%'}},
                    { key: 'tagihan', label:'Grand Total', _style: { width: '10%'} },
                    { key: 'sts_bayar', _style: { width: '1%'} },
                    { key: 'sts_reversal', label:"Reversal", _style: { width: '1%'} },
                    { key: 'tanggal_pembelian_tiket', label:"Tanggal Pembelian", _style: { width: '10%'} },
                    // { key: 'aksi', label:'#', _style: { width: '1%'} },
                    ]}
                    button
                    hover
                    bordered
                    striped
                    size="sm"
                    onSorterValueChange={(e)=>{handleSorterChange(e)}}
                    sorter
                    itemsPerPage={limit}
                    scopedSlots = {{
                        'sts_bayar':
                        (item)=>(
                            <td>
                                <CBadge color={getBadge(item.sts_bayar)}>
                                    {item.sts_bayar == 1 ? "Terbayar" : "Belum Terbayar"}
                                </CBadge>
                            </td>
                        ),
                        'no_bukti':
                        (item)=>(
                            <td>
                                {item.no_bukti !== null ? item.no_bukti : "N/A"}
                            </td>
                        ),
                        'sts_reversal':
                        (item)=>(
                            <td>
                                <CBadge color={getBadgeReversal(item.sts_reversal)}>
                                    {item.sts_reversal == 1 ? "Ya" : "Tidak"}
                                </CBadge>
                            </td>
                        ),
                        'tagihan':
                        (item)=>(
                            <td>
                                Rp {money(item.tagihan)}
                            </td>
                        ),
                        // 'tanggal_pembelian_tiket':
                        // (item)=>(
                        //     <td>
                        //         <Moment format="D/MM/Y H:mm:ss">{item.created_at}</Moment>
                        //     </td>
                        // ),
                        // 'aksi':
                        // (item)=>(
                        //     <td>
                        //         <Link to={"/detail-keberangkatan-petugas/"+item.id_jadwal+"/"+dayjs(dateFilter).format('YYYY-MM-DD')}>
                        //             <CButton
                        //                 color="primary"
                        //                 variant="outline"
                        //                 shape="square"
                        //                 size="sm"
                        //             >
                        //                 Details
                        //             </CButton>
                        //         </Link>
                        //     </td>
                        // ),
                    }}
                />
                <CPagination
                    style={{textAlign: 'right'}}
                    activePage={curPage}
                    pages={totalPages}
                    onActivePageChange={handlePageChange}
                />
            </CRow>
        </CCol>
    )
}

export default VA