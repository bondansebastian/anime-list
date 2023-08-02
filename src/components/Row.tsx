import { css } from '@emotion/css';
import React from 'react';
import { mdMin } from '../breakpoints';

export default function Row({ children }: any) {
    return (
        <div className={css`
            display: flex;
            flex-wrap: wrap;
            flex-direction: column;
            margin-right: -15px;
            margin-left: -15px;
            label: row;

            ${mdMin} {
                flex-direction: row;
            }
        `}>
            {children}
        </div>
    )
}