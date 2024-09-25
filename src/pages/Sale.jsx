import React from 'react'
import Breadcrumb from '../components/Breadcrumb'
import Container from '../components/Container'
import VoucherInfo from '../components/VoucherInfo'

const Sale = () => {
  return (
    <section>
        <Container>
        <Breadcrumb currentPageTitle={"Sale"}/>
        <VoucherInfo/>
        </Container>
    </section>
  )
}

export default Sale