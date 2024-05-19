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
            { label&&<label className="block mb-1 text-sm font-semibold text-gray-600" htmlFor={id}>{label}</label>}

            <input
                type={type}
                className={`w-full transition ease-in-out duration-300 ${className}`}
                ref={ref}
                id={id}
                {...props}
            />
        </div>
    )
})

export default Input