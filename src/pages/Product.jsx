import React from 'react'
import Breadcrumb from '../components/Breadcrumb'
import Container from '../components/Container'
import ProductList from './ProductList'

const Product = () => {
  return (
    <section>
        <Container>
            <Breadcrumb currentPageTitle="Product"/>
                <ProductList/>  
        </Container>
    </section>
  )
}

export default Product
