import React, { useState } from 'react'
import {
    CButton,
    CCard,
    CCardBody,
    CCardFooter,
    CCardHeader,
    CCol,
    CAlert,
    CForm,
    CInput,
    CInputGroup,
    CInputGroupPrepend,
    CInputGroupText
} from '@coreui/react'
import CIcon from '@coreui/icons-react';
import useToken from '../../useToken';
import { apiUrl } from '../../reusable/constants'
import axios from 'axios';
import Toast from './../../reusable/toast';
import ToastMaker from './../../reusable/toastMaker';

const ManageAccount = () => {
    // const [emails, setEmail] = useState();
    const [password, setPassword] = useState();
    // const [idUser, setId] = useState()
    // const [data, setData] = useState({data : []})
    const { email,token } = useToken();
    const [visible, setVisible] = useState(10)
    const [code, setCode] = useState()

    //Toast
    const { toasters, addToast } = ToastMaker()
    const [title, setTitle] = useState("")
    const [message, setMessage] = useState("")
    const [color, setColor] = useState("")

    const [newPassword, setNewPassword] = useState();
    const [confirmNewPass, setConfirmNewPassword] = useState();

    const headers = {
      headers: {
        'Authorization': "bearer " + token 
      } 
    }

    // const fetchData = async () => {
    //   const result = await axios.get(apiUrl + 'users/' + localStorage.getItem('id'), {
    //     headers: {
    //       'Authorization': "bearer " + token 
    //     }
    //   }).catch(function (error) {
    //         if(error.response.status === 401){
    //             localStorage.removeItem('access_token')
    //             window.location.reload()
    //         }
    //      });
    //      setEmail(result.data.email);
    //      setId(result.data.id)
    // };

    // const onEditorStateChange = (editorState) => {
    //   // console.log('this = ', editorState)
    //   setEditorState(editorState);
    // };

    

    // useEffect(() => {
    //     fetchData()
    //   }, [])
    
      const submitHandler = (e) => {
        // const form = new FormData(e.target);
                e.preventDefault();
                if(confirmNewPass && newPassword){
                    let pass = {
                            email: email,
                            password:newPassword,
                            password_confirmation: confirmNewPass,
                    }
                    console.log(pass)
                    axios.post(apiUrl + 'auth/change-password', pass ,headers)
                          .then(statusAPI)
                          .then(setVisible(10))
                          .then((res) => {
                            setConfirmNewPassword('')
                            setNewPassword('')
                            setTitle("Perubahan Password berhasil diupdate")
                            setMessage("Perubahan Data telah berhasil diupdate!")
                            setColor("bg-success text-white")
                            addToast()
                          }).catch(function (error) {
                            if(error?.response?.status === 500){
                                statusAPI(error.response);
                                // fetchData();
                            }else{
                                statusAPI(error.response);
                            //   fetchData();
                            }
                      })
                }else{
                    // fetchData();
                    setCode(403)
                    setVisible(10)
                }
            //   })
        //       .catch(function (error) {
        //             if(error?.response?.status === 500){
        //                 statusAPI(error.response);
        //                 fetchData();
        //             }else{
        //               setCode(402)
        //               fetchData();
        //             }
        //       })
        // }
        
        
      }

      function statusAPI(res) {
        setCode(res.status)
        // console.log( "Status: " + res.status )
        return res;
      }
      

      const errorHandler = (code) => {
        if(code !== undefined){
          switch(code){
            case 200 : return(
              <CAlert
                    color="success"
                    show={visible}
                    closeButton
                    onShowChange={setVisible}
                  >
                    Edit successfully saved!
                  </CAlert>
            )
            case 404 : return(
              <CAlert
                    color="danger"
                    show={visible}
                    closeButton
                    onShowChange={setVisible}
                  >
                    Network error, check your internet connection.
              </CAlert>
            )
            case 400 : return(
                <CAlert
                      color="danger"
                      show={visible}
                      closeButton
                      onShowChange={setVisible}
                    >
                      Inccorect Password
                </CAlert>
              )
              case 402 : return(
                <CAlert
                      color="danger"
                      show={visible}
                      closeButton
                      onShowChange={setVisible}
                    >
                      The new password confirmation doesn`t match
                </CAlert>
              )
              case 403 : return(
                <CAlert
                      color="danger"
                      show={visible}
                      closeButton
                      onShowChange={setVisible}
                    >
                      Incorrect Passing Data!
                </CAlert>
              )
              default: return(
                <></>
              )
          }
        
        }
          
      }

  return (
      
    <>
    <Toast toasters={toasters} message={message} title={title} color={color}/>
                <div>
                    <CCol xs="12" sm="12">
                        {errorHandler(code)}
                        <CCard>

                            <CForm onSubmit={submitHandler}  method="put" encType="multipart/form-data" className="form-horizontal">
                                <CCardHeader>
                                Change Password
                                </CCardHeader>
                                <CCardBody>
                                    {/* <CInputGroup className="mb-3">
                                    <CInputGroupPrepend>
                                        <CInputGroupText>
                                            <CIcon name="cil-user" />
                                        </CInputGroupText>
                                        </CInputGroupPrepend>
                                        <CInput type="text" onChange={(e) => { setEmail(e.target.value); }} id="email" placeholder="example@bago.co.id" autoComplete="email" value={email} required/>
                                    </CInputGroup> */}
                                    <CInputGroup className="mb-4">
                                        <CInputGroupPrepend>
                                        <CInputGroupText>
                                            <CIcon name="cil-lock-locked" />
                                        </CInputGroupText>
                                        </CInputGroupPrepend>
                                        <CInput type="password" onChange={(e) => { setNewPassword(e.target.value); }}  id="password" placeholder="New Password" value={newPassword} autoComplete="new-password" required/>
                                    </CInputGroup>
                                    <CInputGroup className="mb-4">
                                        <CInputGroupPrepend>
                                        <CInputGroupText>
                                            <CIcon name="cil-lock-locked" />
                                        </CInputGroupText>
                                        </CInputGroupPrepend>
                                        <CInput type="password" onChange={(e) => { setConfirmNewPassword(e.target.value); }}  id="password" placeholder="Confirm New Password" value={confirmNewPass} autoComplete="confrim-password" required/>
                                    </CInputGroup>
                                </CCardBody>
                                <CCardFooter>
                                <CButton type="submit" color="primary">
                                    <CIcon name="cil-scrubber" /> Save
                                </CButton>
                            </CCardFooter>  
                            </CForm>
                        </CCard>
                    </CCol>

                    
                </div>
    </>
  )
}

export default ManageAccount
