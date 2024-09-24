import React from 'react'
import Container from '../components/Container'
import Breadcrumb from '../components/Breadcrumb'
import NewProductCard from '../components/NewProductCard'
import { HiCircleStack } from 'react-icons/hi2'

const AddNewProduct = () => {
  return (
    <section>
        <Container>
            <Breadcrumb currentPageTitle={"AddNewProduct"} links={[{previous_title:"Product",path:"/product"}]} icons={<HiCircleStack className='size-4'/>}></Breadcrumb>
            <NewProductCard/>
        </Container>
    </section>
  )
}

export default AddNewProduct