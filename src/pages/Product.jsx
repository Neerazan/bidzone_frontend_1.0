import React from 'react'
import { ProductDetails, Container } from '../components'
import { useParams } from 'react-router-dom'

function Product() {

    const { slug } = useParams()

    return (
        <Container>
            <ProductDetails slug={slug}/>
        </Container>
    )
}

export default Product