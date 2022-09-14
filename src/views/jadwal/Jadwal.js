import React, { useEffect, useState, useRef } from 'react'
import {
  CButton,
  CCard,
  CCardBody,
  CCol,
  CRow,
  CDropdown,
  CDropdownToggle,
  CDropdownMenu,
  CButtonGroup,
  CDropdownItem,
  CModal,
  CModalHeader,
  CModalBody,
  CModalTitle,
  CToast,
  CToaster,
  CToastBody,
  CToastHeader,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilWarning } from '@coreui/icons'
import { Calendar } from 'react-date-range'
import { format } from 'date-fns'
import 'react-date-range/dist/styles.css' // main style file
import 'react-date-range/dist/theme/default.css' // theme css file
import idIDLocale from 'date-fns/locale/id';
import axios from 'axios'
import md5 from 'md5'

const Jadwal = () => {
  const [tableData, setTableData] = useState([])
  const [passengers, setPassengers] = useState([])
  const [ctt, setCtt] = useState(5899)
  const [spId, setspId] = useState(3282)
  const today = new Date()
  const [date, setDate] = useState(today)
  const signatureString = 'BALI' + format(today, 'dd/MM/yyyy') + '18U78PN3P2'
  const [modal, setModal] = useState(false)
  const [load, setLoad] = useState(true)
  const [toast, addToast] = useState(0)
  const toaster = useRef()

  function fetchData(ctt, spId, date) {
    setLoad(true)
    let departDate = format(date, 'yyyy-MM-dd')
    let query =
      'http://ebkferryidapi.easybook.com/api/FerryManifest?cttId=' +
      ctt +
      '&spId=' +
      spId +
      '&departureDate=' +
      departDate
    const headers = {
      headers: {
        Signature: md5(signatureString),
        'Operator-Code': 'BALI',
      },
    }
    axios
      .get(query, headers)
      .then((res) => {
        if (res.data.DailySchedules) {
          setTableData(res.data.DailySchedules)
          setLoad(false)
        }
      })
      .catch((error) => {
        setLoad(false)
        let message = ''
        if (error.message === 'Network Error') {
          message = 'Harap tunggu selama 30 detik sebelum menekan tombol filter.'
        } else {
          message = error.message
        }
        console.log(message)
        const errorToast = (
          <CToast title="An error has occurred">
            <CToastHeader closeButton>
              <CIcon className="rounded me-2" icon={cilWarning} />
              <strong className="me-auto">Sebuah kesalahan telah terjadi</strong>
            </CToastHeader>
            <CToastBody>{message}</CToastBody>
          </CToast>
        )
        const dummy = [
          {
              ScheduleID: 1969488,
              DepartureDate: "2022-07-12",
              DepartureTime: "07:00",
              Departure: "Pelabuhan Buyuk",
              Destination: "Pelabuhan Tribuana",
              CompanyName: "Gangga Express",
              ShipName: "Gangga Express 7",
              Nakhoda: [],
              Passengers: [
              {
              Name: "KD KAESA (1BT)",
              Contact: "",
              NRIC: "",
              Passport: "",
              Category: "ADULT",
              Nationality: "ID",
              Gender: " ",
              TicketId: 1968072
              },
              {
              Name: "KD SUASTAWAN (1BT)",
              Contact: "",
              NRIC: "",
              Passport: "",
              Category: "ADULT",
              Nationality: "ID",
              Gender: " ",
              TicketId: 1968088
              },
              {
              Name: "KD LASTRA (1BT)",
              Contact: "",
              NRIC: "",
              Passport: "",
              Category: "ADULT",
              Nationality: "ID",
              Gender: " ",
              TicketId: 1968099
              },
              {
              Name: "INDRA (2PP)",
              Contact: "",
              NRIC: "",
              Passport: "",
              Category: "ADULT",
              Nationality: "ID",
              Gender: " ",
              TicketId: 1968107
              },
              {
              Name: "INDRA (2PP)",
              Contact: "",
              NRIC: "",
              Passport: "",
              Category: "ADULT",
              Nationality: "ID",
              Gender: " ",
              TicketId: 1968108
              }
              ]
          },
          {
              ScheduleID: 1969426,
              DepartureDate: "2022-07-12",
              DepartureTime: "16:00",
              Departure: "Pelabuhan Buyuk",
              Destination: "Pelabuhan Tribuana",
              CompanyName: "Gangga Express",
              ShipName: "Gangga Express",
              Nakhoda: [],
              Passengers: [
              {
              Name: "wawan ( 3 pax )",
              Contact: "",
              NRIC: "",
              Passport: "",
              Category: "ADULT",
              Nationality: "ID",
              Gender: " ",
              TicketId: 1975747
              },
              {
              Name: "wawan ( 3 pax )",
              Contact: "",
              NRIC: "",
              Passport: "",
              Category: "ADULT",
              Nationality: "ID",
              Gender: " ",
              TicketId: 1975748
              },
              {
              Name: "wawan ( 3 pax )",
              Contact: "",
              NRIC: "",
              Passport: "",
              Category: "ADULT",
              Nationality: "ID",
              Gender: " ",
              TicketId: 1975749
              },
              {
              Name: "diana ( 5 pax )",
              Contact: "",
              NRIC: "",
              Passport: "",
              Category: "ADULT",
              Nationality: "ID",
              Gender: " ",
              TicketId: 1975750
              },
              {
              Name: "diana ( 5 pax )",
              Contact: "",
              NRIC: "",
              Passport: "",
              Category: "ADULT",
              Nationality: "ID",
              Gender: " ",
              TicketId: 1975751
              },
              {
              Name: "diana ( 5 pax )",
              Contact: "",
              NRIC: "",
              Passport: "",
              Category: "ADULT",
              Nationality: "ID",
              Gender: " ",
              TicketId: 1975752
              },
              {
              Name: "diana ( 5 pax )",
              Contact: "",
              NRIC: "",
              Passport: "",
              Category: "ADULT",
              Nationality: "ID",
              Gender: " ",
              TicketId: 1975753
              },
              {
              Name: "diana ( 5 pax )",
              Contact: "",
              NRIC: "",
              Passport: "",
              Category: "ADULT",
              
              Nationality: "ID",
              Gender: " ",
              TicketId: 1975754
              },
              {
              Name: "dsk gd siti",
              Contact: "",
              NRIC: "",
              Passport: "",
              Category: "ADULT",
              Nationality: "ID",
              Gender: " ",
              TicketId: 1975760
              }
              ]
          }
      ]
        addToast(errorToast)
        setTableData(dummy)
      })
  }

  function cttList(id) {
    switch (id) {
      case 5897:
        return 'CTT Banjar Nyuh'
      case 5959:
        return 'CTT Kusamba'
      case 5899:
        return 'CTT Buyuk'
      case 5898:
        return 'CTT Sampalan'
    }
  }

  function departList(id) {
    switch (id) {
      case 801:
        return 'Pelabuhan Banjar Nyuh'
      case 3281:
        return 'Kusamba Pier'
      case 3282:
        return 'Pelabuhan Buyuk'
      case 3398:
        return 'Pelabuhan Sampalan'
      case 3402:
        return 'Maruti Harbour'
      case 3409:
        return 'Pelabuhan Tribuana'
      case 3432:
        return 'Pelabuhan Banjar Bias'
    }
  }

  useEffect(() => {
    fetchData(ctt, spId, date)
  }, [])

  const DetailModal = (data, visible, setVisible) => {
    return (
      <>
        <CModal
          size="xl"
          show={visible}
          onClose={() => setVisible(false)}
        >
          <CModalHeader>
            <CModalTitle>Passenger List</CModalTitle>
          </CModalHeader>
          <CModalBody>
            <table className="table table-hover table-outline mb-0 d-none d-sm-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Category</th>
                  <th>Gender</th>
                  <th>Nationality</th>
                  <th>NRIC</th>
                  <th>Passport</th>
                </tr>
              </thead>
              <tbody>
                {data.map((item, index) => (
                  <tr v-for="item in tableItems" key={index}>
                    <td>
                      <div>{item.Name}</div>
                      <div className="small text-medium-emphasis">
                        ID: <span>{item.TicketID}</span> |&nbsp;
                        {item.Contact !== '' ? item.Contact : 'N/A'}
                      </div>
                    </td>
                    <td>
                      <div>{item.Category !== '' ? item.Category : 'N/A'}</div>
                    </td>
                    <td>
                      <div>{item.Gender !== ' ' ? item.Gender : 'N/A'}</div>
                    </td>
                    <td>
                      <div>{item.Nationality !== '' ? item.Nationality : 'N/A'}</div>
                    </td>
                    <td>
                      <div>{item.NRIC !== '' ? item.NRIC : 'N/A'}</div>
                    </td>
                    <td>
                      <div>{item.Passport !== '' ? item.Passport : 'N/A'}</div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </CModalBody>
        </CModal>
      </>
    )
  }

  const tableContents = (tableData, passengers, setPassengers, modal, setModal) => {
    if (load === true) {
      return (
        <>
        <tr v-for="item in tableItems" key="load">
            <td></td>
            <td></td>
            <td>
                <div className="m-5 text-center">
                    <div className="spinner-border text-danger"></div>
                </div>
            </td>
            <td></td>
            <td></td>
        </tr>
        </>
      )
    } else {
      if (tableData.length !== 0) {
        return tableData.map((item, index) => (
          <tr v-for="item in tableItems" key={index}>
            <td>
              <div>{item.ShipName !== '' ? item.ShipName : 'Unnamed Ship'}</div>
              <div className="small text-medium-emphasis">
                ID: <span>{item.ScheduleID}</span> | {item.CompanyName}
              </div>
            </td>
            <td>
              <div>{item.Departure} <CIcon name="cil-arrow-right" className="mfe-2" /> {item.Destination}</div>
            </td>
            <td>
              <div>
                {(() => {
                  let departTime = new Date(item.DepartureDate + ' ' + item.DepartureTime)
                  let formattedTime =
                    format(new Date(departTime), 'EEEE, dd MMMM yyyy HH:mm', {locale: idIDLocale}) + ' WITA'
                  return formattedTime
                })()}
              </div>
            </td>
            <td>
              <div>{item.Passengers.length}</div>
            </td>
            <td>
              <CButton
                color="primary"
                variant="outline"
                key={index}
                onClick={() => {
                  setModal(!modal)
                  setPassengers(item.Passengers)
                }}
              >
                Daftar Penumpang
              </CButton>
            </td>
            {DetailModal(passengers, modal, setModal)}
          </tr>
        ))
      } else {
        return (
          <>
            <tr v-for="item in tableItems" key="load">
                <td></td>
                <td></td>
                <td>
                    <div className="m-5 text-center">
                        <p>No data</p>
                    </div>
                </td>
                <td></td>
                <td></td>
            </tr>
          </>
        )
      }
    }
  }

  return (
    <>
      <CToaster ref={toaster} push={toast} placement="top-end" />
      <CCard className="mb-4">
        <CCardBody>
          <CRow>
            <CCol sm={5}>
              <h4 id="traffic" className="card-title mb-0">
                Jadwal Keberangkatan
              </h4>
              <div className="small text-medium-emphasis">
                {format(new Date(date), 'dd MMMM yyyy', {locale: idIDLocale})} | {cttList(ctt)} | {departList(spId)}
              </div>
            </CCol>
            <CCol sm={7} className="d-none d-md-block">
              <CButtonGroup className="float-right mr-3">
                <CButton
                  color="primary"
                  className="mx-0"
                  onClick={() => {
                    fetchData(ctt, spId, date)
                  }}
                >
                  Filter
                </CButton>
                <CButton
                  color="outline-secondary"
                  className="mx-0"
                  onClick={() => {
                    fetchData(5899, 3282, today)
                  }}
                >
                  Reset
                </CButton>
              </CButtonGroup>
              <CButtonGroup className="float-right mr-1">
                <CDropdown>
                  <CDropdownToggle className="form-control" color="secondary">
                    {format(new Date(date), 'dd MMMM yyyy')}
                  </CDropdownToggle>
                  <CDropdownMenu>
                    <Calendar
                      date={date}
                      onChange={(e) => {
                        setDate(e)
                      }}
                    />
                  </CDropdownMenu>
                </CDropdown>
                <CDropdown>
                  <CDropdownToggle className="form-control" color="secondary">
                    {cttList(ctt)}
                  </CDropdownToggle>
                  <CDropdownMenu>
                    <CDropdownItem
                      onClick={() => {
                        setCtt(5897)
                      }}
                    >
                      CTT Banjar Nyuh
                    </CDropdownItem>
                    <CDropdownItem
                      onClick={() => {
                        setCtt(5959)
                      }}
                    >
                      CTT Kusamba
                    </CDropdownItem>
                    <CDropdownItem
                      onClick={() => {
                        setCtt(5899)
                      }}
                    >
                      CTT Banyuk
                    </CDropdownItem>
                    <CDropdownItem
                      onClick={() => {
                        setCtt(5898)
                      }}
                    >
                      CTT Sampalan
                    </CDropdownItem>
                  </CDropdownMenu>
                </CDropdown>
                <CDropdown>
                  <CDropdownToggle className="form-control" color="secondary">
                    {departList(spId)}
                  </CDropdownToggle>
                  <CDropdownMenu>
                    <CDropdownItem
                      onClick={() => {
                        setspId(801)
                      }}
                    >
                      Pelabuhan Banjar Nyuh
                    </CDropdownItem>
                    <CDropdownItem
                      onClick={() => {
                        setspId(3281)
                      }}
                    >
                      Kusamba Pier
                    </CDropdownItem>
                    <CDropdownItem
                      onClick={() => {
                        setspId(3282)
                      }}
                    >
                      Pelabuhan Sampalan
                    </CDropdownItem>
                    <CDropdownItem
                      onClick={() => {
                        setspId(3398)
                      }}
                    >
                      Pelabuhan Buyuk
                    </CDropdownItem>
                    <CDropdownItem
                      onClick={() => {
                        setspId(3402)
                      }}
                    >
                      Maruti Harbour
                    </CDropdownItem>
                    <CDropdownItem
                      onClick={() => {
                        setspId(3409)
                      }}
                    >
                      Pelabuhan Tribuana
                    </CDropdownItem>
                    <CDropdownItem
                      onClick={() => {
                        setspId(3432)
                      }}
                    >
                      Pelabuhan Banjar Bias
                    </CDropdownItem>
                  </CDropdownMenu>
                </CDropdown>
              </CButtonGroup>
            </CCol>
          </CRow>
          <br />
          <table className="table table-hover table-outline mb-0 d-none d-sm-table">
            <thead>
              <tr>
                <th>Kapal</th>
                <th>Keberangkatan</th>
                <th>Tanggal Keberangkatan</th>
                <th>Jumlah Penumpang</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {tableContents(tableData, passengers, setPassengers, modal, setModal)}
            </tbody>
          </table>
        </CCardBody>
      </CCard>
    </>
  )
}

export default Jadwal
