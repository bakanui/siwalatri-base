import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
//   CBadge,
//   CCardBody,
//   CCardFooter,
  CCol,
//   CHeader,
  CDataTable,
//   CLink,
//   CWidgetIcon,
//   CRow,
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
  CSelect,
  CCollapse,
  CInputCheckbox,
  CRow
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import useToken from '../../../../src/useToken';
import Moment from 'react-moment';
import { apiUrl } from './../../../reusable/constants'
import { useParams } from 'react-router-dom';
import dayjs from 'dayjs';
import 'moment-timezone';
import Toast from './../../../reusable/toast';
import ToastMaker from './../../../reusable/toastMaker';


Moment.globalTimezone = 'Asia/Makassar';

const FormTiketGroup = () => {
  const todays = new Date()
  const { token, id_armada } = useToken();
  const { id_jadwal, kapasitas_penumpang } = useParams();
  
  const header = {
    headers: {
      'Authorization': "bearer " + token 
    },
  }

  const headers = {
    headers: {
      'Authorization': "bearer " + token 
    },
    params: {
      tanggal: dayjs(todays).format('YYYY-MM-DD')
    },
  }

  const postJadwal = 
          {
            "id_jadwal": "",
            "jadwal": "",
            "status": "",
            "harga": 0,
            "id_armada": "",
            "id_nahkoda": "",
            "id_kapal": "",
            "id_rute": "",
            "ekstra": 0,
            "id_loket": 88,
            "created_at": "2021-09-08T01:40:21.000000Z",
            "updated_at": "2022-01-12T02:43:38.000000Z",
            "deleted_at": null,
            "jadwal_to_armada": {
                "id_armada": "60dff1192581b",
                "id_user": "49",
                "nama_armada": "Gangga Express",
                "kontak": "089663617345",
                "alamat": "Dusun Pande Mas, Desa Kamasan",
                "description": "Kami melayani setulus hati",
                "created_at": "2021-07-03T05:09:45.000000Z",
                "updated_at": "2021-07-03T05:09:45.000000Z",
                "deleted_at": null
            },
            "jadwal_to_nahkoda": {
                "id_nahkoda": 100,
                "nama_nahkoda": "Gungde Maiharta",
                "no_hp": "0812991829111",
                "id_armada": "60dff1192581b",
                "id_kecakapan": 4,
                "created_at": "2021-12-20T13:26:35.000000Z",
                "updated_at": "2021-12-20T13:26:35.000000Z",
                "deleted_at": null
            },
            "jadwal_to_kapal": {
                "id_kapal": "60dff46f200dc",
                "nama_kapal": "Gangga Express 5",
                "mesin": "SUZUKI 5 x 250 PK",
                "panjang": "17.5",
                "lebar": "3.2",
                "dimension": "1.2",
                "grt": 0,
                "dwt": 0,
                "kapasitas_penumpang": 86,
                "kapasitas_crew": 6,
                "kilometer": 0,
                "id_armada": "60dff1192581b",
                "id_jenis": 4,
                "id_status": 1,
                "created_at": "2021-07-03T05:23:59.000000Z",
                "updated_at": "2021-10-12T03:54:18.000000Z",
                "deleted_at": null
            },
            "jadwal_to_rute": {
                "id_rute": 0,
                "tujuan_awal": 0,
                "tujuan_akhir": 0,
                "jarak": 0,
                "created_at": "2021-03-11T12:45:26.000000Z",
                "updated_at": "2021-06-09T06:18:03.000000Z",
                "deleted_at": null,
                "tujuan_awals": {
                    "id_dermaga": 1,
                    "nama_dermaga": "",
                    "lokasi": "",
                    "id_syahbandar": 41,
                    "created_at": "2021-01-15T10:31:08.000000Z",
                    "updated_at": "2021-06-02T07:16:40.000000Z",
                    "deleted_at": null
                },
                "tujuan_akhirs": {
                    "id_dermaga": 2,
                    "nama_dermaga": "",
                    "lokasi": "",
                    "id_syahbandar": 0,
                    "created_at": "2021-01-15T10:31:46.000000Z",
                    "updated_at": "2021-06-27T13:36:53.000000Z",
                    "deleted_at": null
                }
            }
        }

    //Toast
    const { toasters, addToast } = ToastMaker()
    const [title, setTitle] = useState("")
    const [message, setMessage] = useState("")
    const [color, setColor] = useState("")

    const [jenisPenumpang, setJenisPenumpang] = useState([]);
    const [jenisTujuan, setJenisTujuan] = useState([]);
    const [tiketJadwal, setTikets] = useState([]);
    const [data_penumpang, setDataPenumpang] = useState([]);
    const [detail_jadwal, setDetailJadwal] = useState(postJadwal);
    
    //form
    const [tiket_data, setTiketData] = useState();
    const [nama, setNama] = useState('');
    const [alamat, setAlamat] = useState('');
    const [jenis_kelamin, setJenisKelamin] = useState(0);
    const [id_jenis_penum, setIdJenisPenum] = useState(0);
    const [id_tujuan, setIdTujuan] = useState(0);
    const [id_tiket, setIdTiket] = useState(0);
    const [no_identitas, setNoIdentitas] = useState('');

    const [view_total, setTotalView] = useState(0);
    const [harga_tiket, setHargaTiket] = useState(0);
    const [showFreePass, setShowFreePass] = useState(false)
    const [free_pass, setFreePass] = useState(0)
    const [free_pass_harga, setFreePassHarga] = useState(0)
    const [ket_free_pass, setKetFreePass] = useState('');

    
    const fetchData = async () => {

      const jad = await axios.get(apiUrl + 'jadwal_keberangkatan/view/'+id_jadwal, header)
      setDetailJadwal(jad.data)

      const jenis = await axios.get(apiUrl + 'jenis_penumpang', header)
      .catch(function (error) {
        if(error.response?.status === 401){
            localStorage.removeItem('access_token')
            window.location.reload()
        }
      })
      setJenisPenumpang(jenis.data)

      const tujuan = await axios.get(apiUrl + 'jenis_tujuan', header)
        .catch(function (error) {
          if(error.response?.status === 401){
              localStorage.removeItem('access_token')
              window.location.reload()
          }
        })
        setJenisTujuan(tujuan.data)


        const tik = await axios.get(apiUrl + 'jadwal_keberangkatan/view/tiket/'+id_jadwal, header)
        setTikets(tik.data)

        const result = await axios.get(apiUrl + 'laporan/harian_armada/detail/'+id_jadwal, headers)
        .catch(function (error) {
          if(error.response?.status === 401){
              localStorage.removeItem('access_token')
              window.location.reload()
          }
        })
        setDataPenumpang(result.data.datas)
        console.log(result.data)
        
  }

  useEffect(() => {
      fetchData()
      // eslint-disable-next-line
  }, [])

        return(
            <>
            <Toast toasters={toasters} message={message} title={title} color={color}/>
            </>
        )

}

export default FormTiketGroup