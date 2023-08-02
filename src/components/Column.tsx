import { css } from '@emotion/css';
import React from 'react';
import { lgMin, mdMin, xlMin } from '../breakpoints';

interface ColumnProps {
    children?: any;
    sm?: number;
    md?: number;
    lg?: number;
    xl?: number;
}

const columns = 12;

export default function Column({ 
    children,
    sm = columns,
    md = sm,
    lg = md,
    xl = lg,
}: ColumnProps) {
    return (
        <div className={css`
            position: relative;
            width: auto;
            width: calc(${100 / (columns / sm)}% - 30px);
            min-height: 1px;
            padding: 15px;
            label: column;

            ${mdMin} {
                width: calc(${100 / (columns / md)}% - 30px);
            }

            ${lgMin} {
                width: calc(${100 / (columns / lg)}% - 30px);
            }

            ${xlMin} {
                width: calc(${100 / (columns / xl)}% - 30px);
            }
        `}>
            {children}
        </div>
    )
}