import React from 'react'
import axios from 'axios'
import { useQuery } from 'react-query'


const getCollection = async () => {
    try{
        const response = await axios.get('http://127.0.0.1:8000/auction/collections')
        return response.data
    } catch (error) {
        throw error
    }
}

function CollectionSider() {
    const { data, isLoading, isError } = useQuery('collections', getCollection)

    return (
        <div className=''>

        </div>
    )
}

export default CollectionSider