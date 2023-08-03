import React from 'react';
import Button from './Button';

type PrimaryButtonProps = {
    children?: any;
    fullwidth?: boolean;
    onClick?: Function;
    style?: string;
}

export default function PrimaryButton({ 
    children, 
    fullwidth = false,
    onClick = () => {},
    style
}: PrimaryButtonProps) {
    return (
        <Button style={`
            width:${fullwidth ? '100%' : 'auto'}; 
            margin-top:5px;
            margin-bottom:5px;
            background-color: black;
            color: white !important;
            ${style}
            &:hover {
                background-color: hsl(14,80%,30%);
            }
        `} onClick={(e: React.MouseEvent) => onClick(e)}>
            { children }
        </Button>
    )
}