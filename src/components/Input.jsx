import React, {useId} from 'react'

const Input = React.forwardRef( function Input({
    label,
    type="text",
    className="",
    ...props
}, ref){
    const id = useId()

    return(
        <div className='w-full'>
            { label&&<label className="block mb-2 text-sm font-semibold text-gray-900" htmlFor={id}>{label}</label>}

            <input
                type={type}
                className={`w-full px-3 py-2  duration-200 ${className}`}
                ref={ref}
                id={id}
                {...props}
            />
        </div>
    )
})

export default Input