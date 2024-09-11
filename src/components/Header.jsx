import React from 'react'
import Container from './Container'

const Header = () => {
  return (
    <header className='mb-5'>
        <Container>
            <h1 className='text-3xl font-bold text-blue-700'>Karz</h1>
            <p className='text-1xl font-bold text-blue-700 '>Voucher App</p>
        </Container>
    </header>
  )
}

export default Header