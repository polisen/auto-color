import React from 'react'

interface ButtonProps {
    onClick: React.MouseEventHandler<HTMLDivElement>;
    label: string;
}


export default function Button({onClick, label}: ButtonProps) {
    return (
        <div onClick={onClick}>
            {label}
        </div>
    )
}
