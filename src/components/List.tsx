import { css } from '@emotion/css';
import React from 'react';
import { mdMin } from '../breakpoints';

type ListProps = {
    children?: any;
}

export default function List({
    children,
}: ListProps) {
    return (
        <div className={css`
            display: inline-block;
            position: relative;
            left: 50%;
            transform: translateX(-50%);
            width: 100%;
            ${mdMin} {
                width: 400px;
            }
        `}>
            {children}
        </div>
    )
}