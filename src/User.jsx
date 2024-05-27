import React from 'react'
import { Outlet } from 'react-router-dom'
import { Sidebar, Container } from './components'

function User() {
    return (
        <Container>
            <div className='grid grid-cols-5 gap-5'>
                <div className='md:col-span-1'>
                    <Sidebar />
                </div>
                <div className='col-span-5 md:col-span-4'>
                    <Outlet />
                </div>
            </div>
        </Container>
    )
}

export default User