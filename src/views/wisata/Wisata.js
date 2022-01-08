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
  CTextarea, 
  CInputFile
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import useToken from '../../../src/useToken';
import Moment from 'react-moment';
import { apiUrl } from '../../reusable/constants'
import 'moment-timezone';
import basic from '../../../src/assets/basic.png'
import Toast from '../../reusable/toast'
import ToastMaker from '../../reusable/toastMaker'

Moment.globalTimezone = 'Asia/Makassar';

const Wisata = () => {

    const { token } = useToken();
    const [id, setId] = useState(0)
    const [foto, setFoto] = useState(basic)
    const [judul, setJudul] = useState('')
    const [deskripsi, setDeskripsi] = useState('')
    const [typeModal, setTypeModal] = useState()  
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

    const fetchData = async () => {
        const result = await axios.get(apiUrl + 'wisata', headers)
        .catch(function (error) {
          if(error.response?.status === 401){
              localStorage.removeItem('access_token')
              window.location.reload()
          }
        })
        setWisata(result.data.data.wisatas)
    }
    
    useEffect(() => {
        fetchData()
        // eslint-disable-next-line
    }, [])

    const onChangePicture = e => {
        if (e.target.files[0]) {
            const reader = new FileReader();
            reader.addEventListener("load", () => {
                setFoto(reader.result);
            });
            reader.readAsDataURL(e.target.files[0]);
        }
    };

    const submitHandler = (e) => {
        const form = new FormData(e.target);
        e.preventDefault();
        let datas = {
            path: foto,
            judul: form.get('judul'),
            deskripsi: form.get('deskripsi'),
          }
        if(typeModal === 'Tambah'){
          axios.post(apiUrl + 'wisata', datas, headers)
          .then((res) => {
            setTitle("Penambahan data berhasil")
            setMessage("Data telah berhasil ditambahkan!")
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
        }else{
            axios.post(apiUrl + 'wisata/'+id+'/update', datas, headers)
            .then((res) => {
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
      }

      function clearState(){
        setFoto(basic)
        setJudul('')
        setDeskripsi('')
        setId()
    }

    return(
        <>
                <Toast toasters={toasters} message={message} title={title} color={color}/>
                <div className='card grey-thead'>
                        <div className="left-right-component">
                            <CButton
                            color="info"
                            variant="outline"
                            shape="square"
                            size="sm" 
                            style={{margin:'5px 10px'}}
                            onClick={() => 
                                {
                                    setTypeModal('Tambah')
                                    setModal(true)
                                }}
                            >
                                Tambah Wisata
                            </CButton>
                    </div>
                    <hr/>
                      <CDataTable
                      items={wisatas}
                      fields={[
                        { key: 'path', label:'Gambar', _style: { width: '20%'}, sorter: false, filter: false },
                        { key: 'judul', label:'Judul', _style: { width: '20%'}},
                        { key: 'deskripsi', label:'Deskripsi', _style: { width: '20%'}},
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
                        'path':
                          (item)=>(
                            <td>
                                <img className="pratinjau-foto" alt={item.judul} src={item.path}></img>
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
                                    <CButton
                                    color="primary"
                                    variant="outline"
                                    shape="square"
                                    size="sm"
                                    onClick={()=>{
                                        setTypeModal('Edit')
                                        setId(item.id)
                                        setJudul(item.judul)
                                        setDeskripsi(item.deskripsi)
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
                            <CModalTitle>{typeModal} Wisata</CModalTitle>
                        </CModalHeader>
                        <CForm onSubmit={submitHandler}  method="post" encType="multipart/form-data" className="form-horizontal">
                        <CModalBody>
                                <CFormGroup row>
                                    <div className="pratinjau-foto">
                                        <img className="detil-foto" src={foto} alt="Pratinjau foto"></img>
                                    </div>
                                    <CCol xs="3"></CCol>
                                    <CCol xs="6">
                                        <CInputFile custom id="custom-file-input" type="file" onChange={onChangePicture} />
                                        <CLabel htmlFor="custom-file-input" variant="custom-file">
                                        Pilih Gambar...
                                        </CLabel>
                                    </CCol>
                                    <CCol xs="3"></CCol>
                                </CFormGroup>
                                <CFormGroup row>
                                    <CCol xs="12">
                                        <CLabel htmlFor="nameLabel">Judul</CLabel>
                                        <CInput id={"nameInput"} placeholder="Judul"
                                        onChange={(e) => { setJudul(e.target.value); }}
                                        name="judul" value={judul} required/>
                                    </CCol>
                                </CFormGroup>
                                <CFormGroup row>
                                    <CCol xs="12">
                                        <CLabel htmlFor="nameLabel">Deskripsi</CLabel>
                                        <CTextarea required rows="6" value={deskripsi} placeholder="...." name="deskripsi" onChange={(e) => { setDeskripsi(e.target.value); }}>
                                        </CTextarea>
                                    </CCol>
                                </CFormGroup>
                        </CModalBody>
                        <CModalFooter>
                            <CButton type="submit" color="primary">
                                <CIcon name="cil-scrubber" /> Submit
                            </CButton>{' '}
                            <CButton color="secondary" onClick={() => setModal(!modal)}>Cancel</CButton>
                        </CModalFooter>
                        </CForm>
                    </CModal>
            </div>
        </>
    )

}

export default Wisata