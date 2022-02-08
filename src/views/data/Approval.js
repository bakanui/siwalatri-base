import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  CDataTable,
  CButton,
  CModal, 
  CModalHeader, 
  CModalTitle, 
  CModalBody, 
  CModalFooter,
  CBadge
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import useToken from '../../../src/useToken';
import Moment from 'react-moment';
import { apiUrl } from '../../reusable/constants'
import 'moment-timezone';
import Toast from '../../reusable/toast'
import ToastMaker from '../../reusable/toastMaker'
import { Link } from 'react-router-dom';

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
        console.log(result.data)
        setWisata(result.data)
    }
    
    useEffect(() => {
        fetchData(id)
        // eslint-disable-next-line
    }, [])

      function clearState(){
        setId()
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
                <Toast toasters={toasters} message={message} title={title} color={color}/>
                <div className='card grey-thead'>
                      <CDataTable
                      items={wisatas}
                      fields={[
                        { key: 'no', label:'No. ', _style: { width: '5%'}, filter: false },
                        { key: 'operator', label:'Operator', _style: { width: '20%'}},
                        { key: 'jadwal', label:'Jadwal', _style: { width: '20%'}},
                        { key: 'keberangkatan', label:'Keberangkatan', _style: { width: '20%'}},
                        { key: 'nama_kapal', label:'Kapal', _style: { width: '20%'}},
                        { key: 'status', label:'Status', _style: { width: '5%'}},
                        { key: 'total', label:'Total Penumpang', _style: { width: '5%'}},
                        { key: 'created_at', _style: { width: '10%'} },
                        { key: 'edit', label:'', _style: { width: '5%'}, sorter: false, filter: false },
                      ]}
                    //   columnFilter
                      button
                      hover
                      pagination
                      bordered
                      striped
                      size="sm"
                      itemsPerPage={10}
                      scopedSlots = {{
                        'no':
                        (item,index)=>(
                        <td key={index}>
                            {index+1}
                        </td>
                        ),
                        'operator':
                        (item)=>(
                          <td>
                             {item.nama_armada}
                          </td>
                        ),
                        'keberangkatan':
                                (item)=>(
                                <td>
                                    {item.tujuan_awal}  <CIcon name="cil-arrow-right" className="mfe-2" /> {item.tujuan_akhir}
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
                        'total':
                        (item)=>(
                        <td>
                                    {item.total ? item.total : '0'}
                        </td>
                        ),
                        'created_at':
                          (item)=>(
                            <td>
                                <Moment format="D/MM/Y H:m a">{item.created_at}</Moment>
                            </td>
                          ),
                          'edit':
                          (item)=>(
                                <td className="py-2">
                                    <Link to={"/detail-approval/"+item.id_jadwal+'/'+item.total+'/'+item.id}>
                                        <CButton
                                        color="primary"
                                        variant="outline"
                                        shape="square"
                                        size="sm"
                                        >
                                        Detail
                                        </CButton>
                                    </Link>
                                </td>
                            ),
                      }}
                    />

                    {/* <CModal 
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
                    </CModal> */}
            </div>
        </>
    )

}

export default Approval