import { css } from '@emotion/css';
import React from 'react';

type FloatingButtonProps = {
    children?: any;
    style?: string;
    onClick?: Function;
}

export default function FloatingButton({ children, style, onClick = () => {} }: FloatingButtonProps)
{
    return (
        <button className={css`
            background-color: black;
            border-radius: 8px;
            border: 1px solid black;
            bottom: 15px;
            box-shadow: 0 0 29px rgba(49,54,68,.25);
            color: white !important;
            cursor: pointer;
            display: inline-block;
            position: fixed;
            right: 15px;
            transition: all .2s ease;
            ${style}
            &:hover {
                background-color: hsl(14,80%,30%);
            }
        `} onClick={(e) => onClick(e)}>
            {children}
        </button>
    )
}