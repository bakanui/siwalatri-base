import { React, useState } from 'react'
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
  CRow
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { apiUrl } from '../../../reusable/constants'
import axios from 'axios';

export default function Login({ setToken }) {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [message, setMessage] = useState("");
  const [visible, setVisible] = useState(0)

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
    <div className="c-app c-default-layout flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md="8">
            <CCardGroup>
              <CCard className="p-4">
                <CCardBody>
                  <CAlert
                    color="danger"
                    show={visible}
                    closeButton
                    onShowChange={setVisible}
                  >
                    {message}
                  </CAlert>
                  <CForm onSubmit={submitHandler} method="post" encType="multipart/form-data" className="form-horizontal">
                    <h1>Login</h1>
                    <p className="text-muted">Sign In to your account</p>
                    <CInputGroup className="mb-3">
                      <CInputGroupPrepend>
                        <CInputGroupText>
                          <CIcon name="cil-user" />
                        </CInputGroupText>
                      </CInputGroupPrepend>
                      <CInput type="text" onChange={(e) => { setEmail(e.target.value); }} id="email" placeholder="example@bago.co.id" autoComplete="email" />
                    </CInputGroup>
                    <CInputGroup className="mb-4">
                      <CInputGroupPrepend>
                        <CInputGroupText>
                          <CIcon name="cil-lock-locked" />
                        </CInputGroupText>
                      </CInputGroupPrepend>
                      <CInput type="password" onChange={(e) => { setPassword(e.target.value); }}  id="password" placeholder="Password" autoComplete="current-password" />
                    </CInputGroup>
                    <CRow>
                      <CCol xs="6">
                        <CButton color="primary" type="submit" className="px-4">Login</CButton>
                      </CCol>
                      <CCol xs="6" className="text-right">
                        <CButton color="link" className="px-0">Forgot password?</CButton>
                      </CCol>
                    </CRow>
                  </CForm>
                </CCardBody>
              </CCard>
            </CCardGroup>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}

Login.propTypes = {
  setToken: PropTypes.func.isRequired
}
