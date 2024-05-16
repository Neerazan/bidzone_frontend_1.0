import React from 'react'
import { Profile as UserProfile, Address, BalanceDetails } from '../../components'

function Profile() {
    return (
        <div className='mt-4 bg-gray-50 p-4 rounded-md'>
            <div className='grid grid-cols-2 gap-4'>
                <Address/>
                <BalanceDetails />
            </div>
        </div>
    )
}

export default Profile