import { React,useEffect, useState } from 'react'
import PropTypes from 'prop-types';
import {
  CAlert,
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CForm,
  CInput,
  CInputGroup,
  CInputGroupPrepend,
  CInputGroupText,
  CRow,
  CDropdown,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
  CImg,
  CModal, 
  CModalHeader, 
  CModalTitle, 
  CModalBody, 
  CModalFooter,
  CBadge, 
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { apiUrl } from '../../../reusable/constants'
import axios from 'axios';
import logos from './../../../assets/logo.png';
import './../../../assets/css/style.css';
import Slider from "react-slick";

export default function Login({ setToken }) {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [message, setMessage] = useState("");
  const [visible, setVisible] = useState(0)
  const [data_jadwal, setDataJadwal] = useState([]);
  const [pengumumans, setPengumuman] = useState([]);
  const [wisatas, setWisata] = useState([]);
  const [modal, setModal] = useState(false) 

  const fetchData = async () => {
    const jad = await axios.get(apiUrl + 'jadwal_keberangkatan')
    setDataJadwal(jad.data)
    console.log(jad.data);

    const peng = await axios.get(apiUrl + 'pengumuman')
    setPengumuman(peng.data)
    console.log(peng.data);

    const wisa = await axios.get(apiUrl + 'wisata')
    setWisata(wisa.data.data.wisatas)
    console.log(wisa.data);
  }

  useEffect(() => {
      fetchData()
      // eslint-disable-next-line
  }, [])


  const submitHandler = async e => {
      e.preventDefault();
      const login = {
        type: 'admin',
        email: email,
        password: password
      }
      await axios.post(apiUrl + 'auth/login', login)
      .then((res) => {
        setToken(res.data)
      })
      .catch(error => {
        setVisible(10)
        setMessage(error.response.data.message)
      })
        
  }

  const settings = {
    arrows: false,
    dots: false,
    infinite: true,
    slidesToShow: 4,
    slidesToScroll: 1,
    vertical: true,
    autoplay: true,
    speed: 2000,
    autoplaySpeed: 2000,
    verticalSwiping: true,
    pauseOnHover: true
  };

  const settingsWisata = {
    arrows: false,
    dots: false,
    infinite: true,
    fade: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    speed: 3000,
    autoplaySpeed: 3000,
  };

  return (
    <>

        <div className='nav'>
              <div className='component-nav'>
                      <div className='logo-component' style={{padding:'1rem 3.2rem'}}>
                            <img alt="SIWALATRI" src={logos} style={{width:'100%',height:'35px'}}/>
                      </div>
                      <div className='auth-component'>
                          <CDropdown
                            inNav
                            className="c-header-nav-items mx-2"
                            direction="down"
                          >
                            <CDropdownToggle className="c-header-nav-link" caret={false}>
                              <div className="c-avatar">
                                <CImg
                                  src={'avatars/6.jpg'}
                                  className="c-avatar-img"
                                  alt="admin@bootstrapmaster.com"
                                />
                              </div>
                            </CDropdownToggle>
                            <CDropdownMenu className="pt-0" placement="bottom-end">
                                <CDropdownItem onClick={()=>{setModal(!modal)}}>
                                  <CIcon name="cil-lock-locked" className="mfe-2" />
                                      Login 
                                </CDropdownItem>
                            </CDropdownMenu>
                          </CDropdown>
                      </div>
              </div>
        </div>
        <div className='content'>
          <div className='row'>
              <CCol xs="12" md="6">
                <ul className="content scroll" style={{overflowX:'hidden'}}>
                <Slider {...settings}>
                  {
                        data_jadwal.map((data,index) => {
                            return(
                              <div key={index} className="card card-schedule-public"> 
                                  <div className="row">
                                      <div className="col-xs-12 col-sm-12 col-md-4 col-lg-3" style={{display:'flex',alignItems:'center', justifyContent:'center'}}>
                                          <h4 style={{fontFamily:'sans-serif',fontWeight:700}}>{data.jadwal}</h4>
                                      </div>
                                      <div className="col-xs-12 col-sm-12 col-md-8 col-lg-9">
                                              <div className="row-custome-tiket" style={{justifyContent:'center'}}>
                                                  <section className="boardingPass-departur col-xs">
                                                      <span className="section-label-child">{data.lokasi_awal}</span>
                                                      <span className="boardingPass-departur-IATA">{data.tujuan_awal}</span>	
                                                  </section>
                                                  <section className="boardingPass-transport boardingPass-icon col-xs" style={{display:'flex',alignItems:'center', justifyContent:'center',flexDirection:'column'}}>
                                                      <i className="fas fa-ship"></i>
                                                      <span className="section-label-child">Menuju</span>
                                                  </section>
                                                  <section className="boardingPass-arrival col-xs">
                                                      <span className="section-label-child">{data.lokasi_akhir}</span>
                                                      <span className="boardingPass-arrival-IATA">{data.tujuan_akhir}</span>	
                                                  </section>
                                              </div>
                                              <div className="dashed-tiket"></div>
                                              <div className="row-custome-tiket">
                                                      <section className="boardingPass-departur col-xs">
                                                          <i className="fas fa-anchor" ></i>
                                                          <span>{data.nama_kapal}</span>	
                                                      </section>
                                                      <section className="boardingPass-transport boardingPass-icon col-xs" style={{display:'flex',alignItems:'center', justifyContent:'center',flexDirection:'column'}}>
                                                          <CBadge color='primary'>{data.status}</CBadge>
                                                      </section>
                                              </div>
                                      </div>
                                  </div>
                              </div>
                            )
                        })
                  }
                  </Slider>
                </ul>
              </CCol>
              <CCol xs="12" md="6" style={{padding:'10px 37px'}}>
                <div className='slick-for-wisatas'>
                      <Slider {...settingsWisata}>
                          {
                              wisatas.map((data,index) => {
                                  return(
                                        <div key={index} className='card-slider'>
                                                      <img src={data.path} alt="bali" title="bali" style={{maxHeight:'450px',borderRadius:'5px',width:'100%'}} /> 
                                                      <div className="CCzVr">
                                                          <span className="hbFQhX" data-qa-id="title">{data.judul}</span>
                                                          <span className="csca" data-qa-id="title">{data.deskripsi}</span>
                                                      </div>
                                        </div>
                                  )
                              })
                          }
                    </Slider>
                </div>
              </CCol>
          </div>
        </div>

                  <CModal 
                    show={modal} 
                    onClose={() => setModal(!modal)}
                    color='white'
                    className="modal-login"
                    >
                        <CModalHeader closeButton>
                            <CModalTitle className="login-text-modal">Login</CModalTitle>
                        </CModalHeader>
                        <CAlert
                          color="danger"
                          show={visible}
                          closeButton
                          onShowChange={setVisible}
                        >
                          {message}
                        </CAlert>
                        <CForm onSubmit={submitHandler} method="post" encType="multipart/form-data" className="form-horizontal">
                        <CModalBody>
                          <CInputGroup className="mb-3">
                            <CInputGroupPrepend>
                              <CInputGroupText>
                                <CIcon name="cil-user" />
                              </CInputGroupText>
                            </CInputGroupPrepend>
                            <CInput type="text" onChange={(e) => { setEmail(e.target.value); }} id="email" placeholder="example@mail.com" autoComplete="email" />
                          </CInputGroup>
                          <CInputGroup className="mb-4">
                            <CInputGroupPrepend>
                              <CInputGroupText>
                                <CIcon name="cil-lock-locked" />
                              </CInputGroupText>
                            </CInputGroupPrepend>
                            <CInput type="password" onChange={(e) => { setPassword(e.target.value); }}  id="password" placeholder="Password" autoComplete="current-password" />
                          </CInputGroup>
                        </CModalBody>
                        <div>
                            <CButton type="submit" className="btn-login">
                               Login
                            </CButton>
                        </div>
                           {' '}
                        </CForm>
                    </CModal>
    </>
  )
}

Login.propTypes = {
  setToken: PropTypes.func.isRequired
}
