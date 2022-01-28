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
import Moment from 'react-moment';
import 'moment-timezone';
import moment from 'moment';

import suny from './../../../assets/cuaca/sunny.png'
import partly_cloudy from './../../../assets/cuaca/partly_cloudy.png'
import cloudy from './../../../assets/cuaca/cloudy.png'
import rain_light from './../../../assets/cuaca/rain_light.png'
import rain_s_cloudy from './../../../assets/cuaca/rain_s_cloudy.png'
import thunderstorms from './../../../assets/cuaca/thunderstorms.png'

Moment.globalTimezone = 'Asia/Makassar';
export default function Login({ setToken }) {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [message, setMessage] = useState("");
  const [visible, setVisible] = useState(0)
  const [data_jadwal, setDataJadwal] = useState([]);
  const [pengumumans, setPengumuman] = useState([]);
  const [wisatas, setWisata] = useState([]);
  const [modal, setModal] = useState(false) 
  const [data_weather, setWeatherData] = useState([]);

  const header = {
    headers: {
        'Access-Control-Allow-Origin': "*",
        'Access-Control-Allow-Headers': "Origin, X-Requested-With, Content-Type, Accept"
      }
  }

  const fetchData = async () => {
    const jad = await axios.get(apiUrl + 'jadwal_keberangkatan')
    setDataJadwal(jad.data)

    const peng = await axios.get(apiUrl + 'pengumuman')
    setPengumuman(peng.data.data.pengumumans)

    const wisa = await axios.get(apiUrl + 'wisata')
    setWisata(wisa.data.data.wisatas)

    axios.get(apiUrl + 'xml-to-json')
    .then((res) => {
      setWeatherData(res.data.forecast.area[6].parameter[6].timerange)
      console.log(res.data.forecast.area[6].parameter[6].timerange)
     })
  }

  useEffect(() => {
      fetchData()
      // eslint-disable-next-line
  }, [])

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    
  }, []);

  const submitHandler = async e => {
      e.preventDefault();
      const login = {
        type: 'admin',
        email: email,
        password: password
      }
      setLoading(true);
      await axios.post(apiUrl + 'auth/login', login)
      .then((res) => {
        setToken(res.data)
        setLoading(false);
      })
      .catch(error => {
        setVisible(10);
        setLoading(false);
        setMessage(error.response.data.message);
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

  const settingsAnnounce = {
    arrows: false,
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    speed: 3000,
    autoplaySpeed: 3000,
  };

  const settingsWeather = {
    arrows: false,
    dots: false,
    infinite: true,
    // centerPadding: "60px",
    slidesToShow: 2,
    speed: 500,
    rows: 2,
    slidesPerRow: 1,
    autoplay: true,
    speed: 3000,
    autoplaySpeed: 3000,
  };

  const getBadge = (status)=>{
    switch (status) {
      case 'Berlayar': return 'success'
      case 'Sandar': return 'secondary'
      case 'Persiapan': return 'warning'
      default: return 'primary'
    }
  }

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
                                  src={'avatars/7.jpg'}
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
                <ul className="content scroll" style={{overflow:'hidden'}}>
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
                                                          <CBadge className="badge-custom" color={getBadge(data.status)}>{data.status}</CBadge>
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
              <CCol xs="12" md="6" style={{padding:'10px 37px 10px 10px'}}>
                <div className='slick-for-wisatas'>
                      <Slider {...settingsWisata}>
                          {
                              wisatas.map((data,index) => {
                                  return(
                                        <div key={index} className='card-slider'>
                                                      <img src={data.path} alt={data.judul} title={data.judul} style={{maxHeight:'450px',borderRadius:'5px',width:'100%'}} /> 
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
          <CRow>
            <CCol xs="12" md="6" style={{padding:'10px 10px 10px 37px'}}>
              <div className='slick-for-bmkg'>
              <Slider {...settingsWeather}>
                    {
                      data_weather.map((data,index) => {
                        return(
                            <div key={index} className='item-bmkg-weather'>
                                          {(() => {
                                            if(data.value === 0){
                                              return(
                                                <>
                                                  <img className='image-weather' src={suny}></img>
                                                  <b>Cerah</b>
                                                </>
                                              )
                                            }else if(data.value == 1){
                                              return(
                                                <>
                                                  <img className='image-weather' src={partly_cloudy}></img>
                                                  <b>Cerah Berawan</b>
                                                </>
                                              )
                                            }else if(data.value == 2){
                                              return(
                                                <>
                                                  <img className='image-weather' src={partly_cloudy}></img>
                                                  <b>Cerah Berawan</b>
                                                </>
                                              )
                                            }else if(data.value == 3){
                                              return(
                                                <>
                                                  <img className='image-weather' src={cloudy}></img>
                                                  <b>Berawan</b>
                                                </>
                                              )
                                            }else if(data.value == 4){
                                              return(
                                                <>
                                                  <img className='image-weather' src={cloudy}></img>
                                                  <b>Berawan Tebal</b>                                               
                                                </>
                                              )
                                            }else if(data.value == 5){
                                              return(
                                              <img className='image-weather' src={cloudy}></img>
                                              )
                                            }else if(data.value == 10){
                                              return(
                                              <img className='image-weather' src={cloudy}></img>
                                              )
                                            }else if(data.value == 45){
                                              return(
                                              <img className='image-weather' src={cloudy}></img>
                                              )
                                            }else if(data.value == 60){
                                              return(
                                              <>
                                                <img className='image-weather' src={rain_light}></img>
                                                <b>Hujan Ringan</b>
                                              </>
                                              )
                                            }else if(data.value == 61){
                                              return(
                                                <>
                                                  <img className='image-weather' src={rain_light}></img>
                                                  <b>Hujan Sedang</b>
                                                </>
                                              )
                                            }else if(data.value == 63){
                                              return(
                                                <>
                                                    <img className='image-weather' src={rain_light}></img>
                                                    <b>Hujan Lebat</b>
                                                </>
                                              )
                                            }else if(data.value == 80){
                                              return(
                                                <>
                                                  <img className='image-weather' src={rain_s_cloudy}></img>
                                                  <b>Hujan Lokal</b>
                                                </>
                                              )
                                            }else if(data.value == 95){
                                              return(
                                                <>
                                                  <img className='image-weather' src={thunderstorms}></img>
                                                  <b>Hujan Petir</b>
                                                </>
                                              )
                                            }else if(data.value == 97){
                                              return(
                                                <>
                                                   <img className='image-weather' src={thunderstorms}></img>
                                                  <b>Hujan Petir</b>
                                                </>
                                              )
                                            }
                                          })()}
                                          <p className='no-margin'>{data['@attributes'].datetime}</p>
                                          {/* <p className='no-margin'><Moment format="H:i">{data['@attributes'].datetime}</Moment></p> */}
                            </div>
                          )
                      })
                    }
              </Slider>
              </div>
            </CCol>
            <CCol xs="12" md="6" className="slick-for-announce" style={{padding:'10px 35px 10px 10px'}}>
              <Slider {...settingsAnnounce}>
                  {
                      pengumumans.map((data,index) => {
                          return(
                            <div key={index} className='padd-card'>
                              <div className='card-announce'>
                                  <div className='title-annouce'><CIcon name="cil-bullhorn" className="mfe-2" /><b>{data.judul}</b></div>
                                  <div className='content-annouce'>
                                        <p>{data.deskripsi.substring(0,50)}</p>
                                  </div>
                              </div>
                            </div>
                          )
                    })
                  }
              </Slider>
            </CCol>
          </CRow>
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
