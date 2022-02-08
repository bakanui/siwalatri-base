import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
//   CBadge,
//   CCardBody,
//   CCardFooter,
  CCol,
//   CHeader,
  CDataTable,
  CLink,
  CWidgetIcon,
  CRow,
  CCard,
//   CCardHeader,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import useToken from '../../src/useToken';
import { apiUrl } from './../reusable/constants'
import dayjs from 'dayjs';


const Penumpangs = () => {

    const posPenumpang = [
            {
                "id_penumpang": 0,
                "nama_penumpang": "",
                "no_identitas": "",
                "id_jns_penum": 2,
                "id_tujuan": 3,
                "jenis_kelamin": 0,
                "alamat": "",
                "nomer_kendaraan": null,
                "tanggal": null,
                "status_verif": 1,
                "freepass": 0,
                "ket_freepass": null,
                "harga_tiket": "",
                "created_at": "2021-12-20 06:21:42",
                "updated_at": "2021-12-20 06:21:42",
                "deleted_at": null,
                "nama_jns_penum": "",
                "nama_dermaga": ""
            },
    ]

    const posUniqTotal = [
                {
                    "id_tujuan": 1,
                    "nama_tujuan": "Pulang",
                    "total": null
                },
                {
                    "id_tujuan": 2,
                    "nama_tujuan": "Tirtayatra",
                    "total": null
                },
                {
                    "id_tujuan": 3,
                    "nama_tujuan": "Liburan",
                    "total": null
                },
                {
                    "id_tujuan": 5,
                    "nama_tujuan": "Expedisi",
                    "total": null
                },
                {
                    "id_tujuan": 6,
                    "nama_tujuan": "Kedinasan",
                    "total": null
                }
    ]

    const posUniqJenis = [
        {
            "id_jns_penum": 3,
            "nama_jns_penum": "Lokal",
            "total": null
        },
        {
            "id_jns_penum": 2,
            "nama_jns_penum": "Mancanegara",
            "total": null
        },
        {
            "id_jns_penum": 1,
            "nama_jns_penum": "Domestik",
            "total": null
        }
]

    const { token } = useToken();
    const [penumpangs, setPenumpangs] = useState({penumpangs : posPenumpang});
    const [total, setTotPenum] = useState({total : posUniqTotal});
    const [jenis, setTotJenis] = useState({jenis : posUniqJenis});
    const headers = {
      headers: {
        'Authorization': "bearer " + token 
      }
    }
    


    const fetchData = async () => {
        var date = new Date();
        var today = dayjs(date).format('YYYY-MM-DD')

        const result = await axios.get(apiUrl + 'get-penumpang-tanggal/'+today, headers)
        .catch(function (error) {
            if(error.response?.status === 401){
                localStorage.removeItem('access_token')
                window.location.reload()
            }
        })
        // console.log(result);
        setPenumpangs(result.data)

        let datas = {
            'tanggal' : today
        }
        const laporan = await axios.get(apiUrl + 'laporan/harian_armada',datas, headers)
        .catch(function (error) {
            if(error.response?.status === 401){
                localStorage.removeItem('access_token')
                window.location.reload()
            }
        });
        // console.log(laporan);
        setTotPenum(laporan.data)
        setTotJenis(laporan.data)
        // console.log(total);
    }
    
    useEffect(() => {
      fetchData()
      // eslint-disable-next-line
    }, [])

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
        { key: 'nama_penumpang', _style: { width: '15%'} },
        { key: 'no_identitas', _style: { width: '20%'} },
        { key: 'nama_jns_penum', _style: { width: '20%'} },
        { key: 'alamat', _style: { width: '10%'} },
        { key: 'harga_tiket', _style: { width: '10%'} },
        { key: 'created_at', _style: { width: '10%'} },
      ]

      return ( 
        <>
           <div>
                <CRow>
                        {
                        total.total.map((data,index) =>
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
                        jenis.jenis.map((data,index) =>
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
                            <h5 className="heading-text">List Penumpang hari ini</h5>
                            <CDataTable
                                items={penumpangs.penumpangs}
                                fields={fields}
                                hover
                                striped
                                bordered
                                size="sm"
                                itemsPerPage={10}
                                pagination
                                scopedSlots = {{
                                    'nama_penumpang':
                                      (item, index)=>(
                                        <td key={index}>
                                          {item.nama_penumpang}
                                        </td>
                                      ),
                                }}
                            />
                    </CCard>
                </CCol>
                </CRow>
            </div>
        </>
    )
}

export default Penumpangs