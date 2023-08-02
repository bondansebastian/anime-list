import { css } from '@emotion/css';
import React from 'react';
import { lgMin, mdMin, smMin, xlMin } from '../breakpoints';

interface ColumnProps {
    children?: any;
    sm?: number;
    md?: number;
    lg?: number;
    xl?: number;
}

export default function Column({ 
    children,
    sm = 1,
    md = 4,
    lg = 5,
    xl = 5,
}: ColumnProps) {
    return (
        <div className={css`
            position: relative;
            width: auto;
            max-width: 100%;
            min-height: 1px;
            padding: 15px;
            label: column;

            ${smMin} {
                width: calc(${100 / sm}% - 30px);
            }

            ${mdMin} {
                width: calc(${100 / md}% - 30px);
            }

            ${lgMin} {
                width: calc(${100 / lg}% - 30px);
            }

            ${xlMin} {
                width: calc(${100 / xl}% - 30px);
            }
        `}>
            {children}
        </div>
    )
}