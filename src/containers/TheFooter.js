import React from 'react'
import { CFooter } from '@coreui/react'

const TheFooter = () => {
  return (
    <CFooter fixed={false}>
      <div>
        {/* <a href="https://coreui.io" target="_blank" rel="noopener noreferrer">CoreUI</a> */}
        <span className="ml-1">&copy; 2022 Pemerintahan Kabupaten Klungkung.</span>
      </div>
      <div className="mfs-auto">
        <span className="mr-1">Powered by MaiHarta</span>
        {/* <a href="https://coreui.io/react" target="_blank" rel="noopener noreferrer">PemKab Klungkung</a> */}
      </div>
    </CFooter>
  )
}

export default React.memo(TheFooter)
