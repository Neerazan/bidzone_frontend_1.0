import React from "react"

function Balance() {
    return (
        <li className="ml-2 lg:ml-4 relative inline-block">
            <div className="ml-4 hidden lg:flex flex-col font-bold border border-slate-700 px-2 rounded-md">
                <span className="text-xs text-gray-700">Balance</span>
                <span>2,650,59</span>
            </div>
        </li>
    )
}

export default Balance
