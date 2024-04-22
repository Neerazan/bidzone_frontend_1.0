import React from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { useQuery } from 'react-query'

const getCollection = async () => {
    try {
        const response = await axios.get('http://127.0.0.1:8000/auction/collections')
        console.log(`Collections: ${response.data[0]}`);
        return response.data;
    } catch (error) {
        throw error
    }
}

function CollectionSider() {
    const { data, isLoading, isError } = useQuery('collections', getCollection)

    // Handling loading state
    if (isLoading) {
        return <div>Loading...</div>;
    }

    // Handling error state
    if (isError) {
        return <div>Error fetching collections: {isError.message}</div>;
    }


    return (
        <div className='col-span-1 bg-white mt-5 rounded-md'>
            <ul className='pt-2'>
                {data?.map((collection) => (
                    <li key={collection.id} className='hover:bg-slate-200 flex cursor-pointer'>
                        <Link to={`/collections/${collection.id}`} className='text-zinc-500 px-4 py-1'>{collection.title} 
                        </Link>
                        <span className='text-sm font-semibold text-white bg-red-500 rounded-full ml-auto'></span>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default CollectionSider