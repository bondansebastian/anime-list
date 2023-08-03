import { css } from '@emotion/css';
import React from 'react';

type OnClickHandler = {
    (e: React.MouseEvent): void;
}

type ButtonProps = {
    children?: any;
    style?: string;
    onClick?: OnClickHandler;
    fullwidth?: boolean;
}

export default function Button({ 
    children, 
    style,
    onClick = () => {},
    fullwidth = false,
}: ButtonProps) {
    return (
        <button className={css`
            background-color: transparent;
            border-radius: 4px;
            border: 1px solid black;
            color: black;
            cursor: pointer;
            display: inline-block;
            padding: 5px 10px;
            transition: all .2s ease;
            width:${fullwidth ? '100%' : 'auto'}; 
            &:hover {
                color: hsl(14,80%,30%);
                border-color: hsl(14,80%,30%);
            }
            ${style}
        `} onClick={onClick}>
            {children}
        </button>
    )
}