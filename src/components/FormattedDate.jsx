import React from 'react'

function FormattedDate({date}) {

    // Convert starting time string to Date object
    const startDate = new Date(date)

    // Define options for formatting the date
    const options = {
        day: "numeric",
        month: "short",
        year: "numeric",
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
    }

    // Format the date using Intl.DateTimeFormat
    const formattedDate = new Intl.DateTimeFormat("en-US", options).format(
        startDate
    )

    return <span>{formattedDate}</span>
}

export default FormattedDate