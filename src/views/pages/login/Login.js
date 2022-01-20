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
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { apiUrl } from '../../../reusable/constants'
import axios from 'axios';
import logos from './../../../assets/logo.png';
import './../../../assets/css/style.css';

export default function Login({ setToken }) {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [message, setMessage] = useState("");
  const [visible, setVisible] = useState(0)
  const [data_jadwal, setDataJadwal] = useState([]);
  const [modal, setModal] = useState(false) 

  const fetchData = async () => {
    const jad = await axios.get(apiUrl + 'jadwal_keberangkatan')
    setDataJadwal(jad.data)
    console.log(jad.data);
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
