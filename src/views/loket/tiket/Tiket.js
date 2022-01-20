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
//   CTextarea, 
  CSelect,
  CRow
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import useToken from '../../../../src/useToken';
import Moment from 'react-moment';
import { apiUrl } from './../../../reusable/constants'
import 'moment-timezone';
import { Link } from 'react-router-dom';

Moment.globalTimezone = 'Asia/Makassar';

const Tiket = () => {

    const { token,type,id,id_armada } = useToken();
    const [jadwalnya, setJadwalnya] = useState([]);
    const [id_jadwal, setIdJadwal] = useState(0)
    const [kapasitas_penumpang, setKapPenum] = useState(0)
    const [modal, setModal] = useState(false) 
    const headers = {
        headers: {
          'Authorization': "bearer " + token 
        },
        timeout: 10000 
      }
      useEffect(() => {
        fetchData()
        // eslint-disable-next-line
      }, [])
    
      const getBadge = (status)=>{
        switch (status) {
          case 'Berlayar': return 'success'
          case 'Nyandar': return 'secondary'
          case 'Persiapan': return 'warning'
          default: return 'primary'
        }
      }
    
    
      const getBadgeStatus = (status)=>{
        switch (status) {
          case 'Active': return 'success'
          case 'Inactive': return 'danger'
          default: return 'info'
        }
    }

    const fetchData = async () => {
          const jad = await axios.get(apiUrl + 'jadwal_keberangkatan/index/'+id_armada, headers)
          setJadwalnya(jad.data.jadwal)
          console.log(jad.data)
      }

    return(
        <>
            <div className='column-card-container'>
                <CRow>
                    {
                        jadwalnya.map((data,index) =>
                            {
                                return(
                                        <CButton key={index} className="column-card"
                                        onClick={()=>{
                                            setIdJadwal(data.id_jadwal)
                                            setKapPenum(data.jadwal_to_kapal.kapasitas_penumpang)
                                            setModal(!modal)
                                        }}>
                                                    <div className="boardingPass-header"><h4 className="boardingPass-airline">{data.jadwal}</h4></div>
                                                    <div className="card">
                                                        <div className="row-custome-tiket" style={{justifyContent:'center'}}>
                                                            <section className="boardingPass-departur col-xs">
                                                                <span className="section-label-child">{data.jadwal_to_rute.tujuan_awals.lokasi}</span>
                                                                <span className="boardingPass-departur-IATA">{data.jadwal_to_rute.tujuan_awals.nama_dermaga}</span>	
                                                            </section>
                                                            <section className="boardingPass-transport boardingPass-icon col-xs">
                                                                <CIcon name="cil-scrubber" className="mfe-2" />
                                                            </section>
                                                            <section className="boardingPass-arrival col-xs">
                                                                <span className="section-label-child">{data.jadwal_to_rute.tujuan_akhirs.nama_dermaga}</span>
                                                                <span className="boardingPass-arrival-IATA">{data.jadwal_to_rute.tujuan_akhirs.nama_dermaga}</span>	
                                                            </section>
                                                        </div>
                                                        <hr className="tiket-hr" />
                                                        <div className="row-custome-tiket">
                                                            <section className="boardingPass-icon col-xs-pessanger">
                                                                <CIcon name="cil-user" className="mfe-2" />
                                                            </section>
                                                            <section className="boardingPass-passenger col-xs-pessanger">
                                                                <span className="section-label-child">Nahkoda</span>
                                                                <span>{data.jadwal_to_nahkoda.nama_nahkoda}</span>	
                                                            </section>
                                                            <section className="boardingPass-seat col-xs-pessanger">
                                                                <span className="section-label-child">No HP</span>
                                                                <span>{data.jadwal_to_nahkoda.no_hp}</span>	
                                                            </section>
                                                        </div>
                                                        <hr className="tiket-hr" />
                                                        <div className="row-custome-tiket">
                                                            <section className="boardingPass-icon col-xs-pessanger">
                                                                <CIcon name="cil-moon" className="mfe-2" />
                                                            </section>
                                                            <section className="boardingPass-passenger col-xs-pessanger">
                                                                <span className="section-label-child">Kapal</span>
                                                                <span>{data.jadwal_to_kapal.nama_kapal}</span>	
                                                            </section>
                                                            <section className="boardingPass-seat col-xs-pessanger">
                                                                <span className="section-label-child">Kapasitas</span>
                                                                <span>{data.jadwal_to_kapal.kapasitas_penumpang}</span>	
                                                            </section>
                                                        </div>
                                                    </div>
                                             
                                      </CButton>
                                    )
                            })
                    }
                </CRow>
            </div>

                <CModal 
                    show={modal} 
                    onClose={() => {setModal(!modal);}}
                    color='info'
                    >
                    <CModalHeader closeButton>
                        <CModalTitle>Pilih Tiket</CModalTitle>
                    </CModalHeader>
                    <CForm method="post" encType="multipart/form-data" className="form-horizontal">
                    <CModalBody>
                          <CRow>
                              <div className='col-xs-12 col-sm-12 xol-md-6 col-lg-6' style={{textAlign:'center'}}>
                                    <Link to={"/tiket/form-tiket/"+id_jadwal+"/"+kapasitas_penumpang}>
                                        <CButton
                                            color="primary"
                                            shape="square"
                                            size="lg"
                                        >
                                            Tiket Perorang
                                        </CButton>
                                    </Link>
                                </div>
                                <div className='col-xs-12 col-sm-12 xol-md-6 col-lg-6' style={{textAlign:'center'}}>
                                    <Link >
                                        <CButton
                                            color="warning"
                                            shape="square"
                                            size="lg"
                                        >
                                            Tiket Rombongan
                                        </CButton>
                                    </Link>
                                </div>
                          </CRow>
                    </CModalBody>
                    {/* <CModalFooter>
                        <CButton type="submit" color="primary">
                            <CIcon name="cil-scrubber" /> Submit
                        </CButton>{' '}
                        <CButton color="secondary" onClick={() => {setModal(!modal);}}>Cancel</CButton>
                    </CModalFooter> */}
                    </CForm>
                </CModal>
        </>
    )
}

export default Tiket