import React from 'react'
import {
  CToast,
  CToastBody,
  CToastHeader,
  CToaster,
  CRow,
  CCol,
} from '@coreui/react'

export default function Toast({toasters, message, title, color}){
  return (
    <CRow>
        <CCol sm="12" lg="6">
            {Object.keys(toasters).map((toasterKey) => (
            <CToaster
                position={toasterKey}
                key={'toaster' + toasterKey}
            >
                {
                toasters[toasterKey].map((toast, key)=>{
                return(
                    <CToast
                    key={'toast' + key}
                    show={true}
                    autohide={toast.autohide}
                    fade={toast.fade}
                    >
                    <CToastHeader className={color} closeButton={toast.closeButton}>
                        { title }
                    </CToastHeader>
                    <CToastBody>
                        { message }
                    </CToastBody>
                    </CToast>
                )
                })
                }
            </CToaster>
            ))}
        </CCol>
    </CRow>
  )
}