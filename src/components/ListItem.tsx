import { css } from '@emotion/css';
import React from 'react';

export default function ListItem({ children }: any) {
    return (<div className={css`
            align-items: center;
            border-radius: 8px;
            border: 0.75px solid #DCDCDC;
            display: flex;
            flex-direction: row;
            flex-wrap: nowrap;
            justify-content: space-between;
            margin-bottom: 10px;
            padding: 10px 15px;
        `}>
            {children}
        </div>
    )
}