import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  CDataTable,
  CButton,
  CModal, 
  CModalHeader, 
  CModalTitle, 
  CModalBody, 
  CModalFooter
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import useToken from '../../../src/useToken';
import Moment from 'react-moment';
import { apiUrl } from '../../reusable/constants'
import 'moment-timezone';
import Toast from '../../reusable/toast'
import ToastMaker from '../../reusable/toastMaker'

Moment.globalTimezone = 'Asia/Makassar';

const Approval = () => {

    const { token, id } = useToken();
    const [pid, setId] = useState(0)
    // const [judul, setJudul] = useState('')
    // const [deskripsi, setDeskripsi] = useState('')
    // const [typeModal, setTypeModal] = useState()  
    const [modal, setModal] = useState(false)

    //Toast
    const { toasters, addToast } = ToastMaker()
    const [title, setTitle] = useState("")
    const [message, setMessage] = useState("")
    const [color, setColor] = useState("")

    const headers = {
        headers: {
          'Authorization': "bearer " + token 
        }
    }

    const [wisatas, setWisata] = useState();

    const fetchData = async (id) => {
        const result = await axios.get(apiUrl + 'jadwal_keberangkatan/view/approval/' + id + "/0", headers)
        .catch(function (error) {
          if(error.response?.status === 401){
              localStorage.removeItem('access_token')
              window.location.reload()
          }
        })
        setWisata(result.data.data)
    }
    
    useEffect(() => {
        fetchData(id)
        // eslint-disable-next-line
    }, [])

    const submitHandler = (e) => {
        const form = new FormData(e.target);
        e.preventDefault();
        let datas = {
            judul: form.get('judul'),
            deskripsi: form.get('deskripsi'),
          }
        axios.post(apiUrl + 'wisata/'+pid+'/update', datas, headers)
        .then(() => {
            setTitle("Perubahan data berhasil")
            setMessage("Data telah berhasil dirubah!")
            setColor("bg-success text-white")
            setModal(!modal)
            clearState()
            fetchData();
            addToast()
        }).catch((error) => {
            setTitle("Terjadi kesalahan")
            setMessage(error?.response?.data?.message)
            setColor("bg-danger text-white")
            setModal(!modal)
            clearState()
            fetchData()
            addToast()
        })
        
      }

      function clearState(){
        setId()
    }

    return(
        <>
                <Toast toasters={toasters} message={message} title={title} color={color}/>
                <div className='card grey-thead'>
                      <CDataTable
                      items={wisatas}
                      fields={[
                        { key: 'no', label:'No. ', _style: { width: '5%'}, filter: false },
                        { key: 'operator', label:'Operator', _style: { width: '20%'}},
                        { key: 'jam', label:'Jam', _style: { width: '20%'}},
                        { key: 'tujuan_keberangkatan', label:'Tujuan Keberangkatan', _style: { width: '20%'}},
                        { key: 'kapal', label:'kapal', _style: { width: '20%'}},
                        { key: 'total_penumpang', label:'Total Penumpang', _style: { width: '20%'}},
                        { key: 'created_at', _style: { width: '10%'} },
                        { key: 'edit', label:'', _style: { width: '5%'}, sorter: false, filter: false },
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
                        'created_at':
                          (item)=>(
                            <td>
                                <Moment format="D/MM/Y H:m a">{item.created_at}</Moment>
                            </td>
                          ),
                          'edit':
                          (item)=>(
                                <td className="py-2">
                                    <CButton
                                    color="primary"
                                    variant="outline"
                                    shape="square"
                                    size="sm"
                                    onClick={()=>{
                                        setModal(!modal)
                                    }}
                                    >
                                    Edit
                                    </CButton>
                                </td>
                            ),
                      }}
                    />

                    <CModal 
                    show={modal} 
                    onClose={() => setModal(!modal)}
                    color='info'
                    >
                        <CModalHeader closeButton>
                            <CModalTitle>Konfirmasi</CModalTitle>
                        </CModalHeader>
                        <CModalBody>
                            <p>Apakah anda yakin untuk memberikan approval kepada trip ini?</p>
                        </CModalBody>
                        <CModalFooter>
                            <CButton type="submit" color="primary" onClick={() => submitHandler}>
                                <CIcon name="cil-scrubber" /> Ya
                            </CButton>{' '}
                            <CButton color="secondary" onClick={() => setModal(!modal)}>Batalkan</CButton>
                        </CModalFooter>
                    </CModal>
            </div>
        </>
    )

}

export default Approval