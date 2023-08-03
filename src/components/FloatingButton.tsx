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
            border-radius: 4px;
            border: 1px solid black;
            bottom: 15px;
            color: white !important;
            cursor: pointer;
            display: inline-block;
            padding: 5px 10px;
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