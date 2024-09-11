import React from 'react'
import Breadcrumb from '../components/Breadcrumb'
import Container from '../components/Container'
import VoucherList from './VoucherList'


const Voucher = () => {
  return (
    <div>
        <Container>
        <Breadcrumb currentPageTitle={"Voucher"}/>
        <VoucherList/>
        </Container>
    </div>
  )
}

export default Voucher