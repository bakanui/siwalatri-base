import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  CBadge,
  CCardBody,
  CCardFooter,
  CCol,
  CHeader,
  CDataTable,
  CLink,
  CWidgetIcon,
  CRow,
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
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import useToken from '../../../src/useToken';
import Moment from 'react-moment';
import { apiUrl } from './../../reusable/constants'
import 'moment-timezone';
import { Link } from 'react-router-dom';

Moment.globalTimezone = 'Asia/Makassar';

const Petugas = () => {

    return(
        <>
        </>
    )

}

export default Petugas;