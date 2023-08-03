import { css } from '@emotion/css';
import React from 'react';

export default function Button({ children, className, style, ...props }: any)
{
    return (
        <button className={css`
            padding: 5px 10px;
            border-radius: 4px;
            background-color: transparent;
            border: 1px solid black;
            color: black;
            transition: all .2s ease;
            cursor: pointer;
            display: inline-block;
            &:hover {
                color: hsl(14,80%,30%);
                border-color: hsl(14,80%,30%);
            }
            ${style}
        `} {...props}>
            {children}
        </button>
    )
}