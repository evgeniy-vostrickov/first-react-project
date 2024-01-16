import React from 'react'

//тег input оборачиваем в div для более красочного оформления
export const Input = ({input, meta, ...props}) => {
    return (
        <div className="">
            <input type="text" {...input} {...props} />
            {meta.error && <span>{meta.error}</span> }
        </div>
    )
}