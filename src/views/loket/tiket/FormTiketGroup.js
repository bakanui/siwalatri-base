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
  CTextarea, 
  CSelect,
  CCollapse,
  CInputCheckbox,
  CRow
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import useToken from '../../../../src/useToken';
import Moment from 'react-moment';
import { apiUrl } from './../../../reusable/constants'
import { useParams } from 'react-router-dom';
import dayjs from 'dayjs';
import 'moment-timezone';
import Toast from './../../../reusable/toast';
import ToastMaker from './../../../reusable/toastMaker';


Moment.globalTimezone = 'Asia/Makassar';

const FormTiketGroup = () => {

    
        return(
            <>
            </>
        )

}

export default FormTiketGroup