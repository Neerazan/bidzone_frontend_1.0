import React from 'react'
import { Profile as UserProfile, Address, BalanceDetails, UserDetails } from '../../components'

function Profile() {
    return (
        <div className='mt-4 bg-gray-50 px-6 py-4 rounded-md profile-page h-[90vh] overflow-y-scroll'>
            <div className='grid grid-cols-2 gap-4'>
                <Address/>
                <BalanceDetails />
            </div>
            <UserDetails />
        </div>
    )
}

export default Profile