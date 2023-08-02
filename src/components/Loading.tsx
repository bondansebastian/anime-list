import { css } from '@emotion/css';
import React from 'react';

type LoadingProps = {
    visible: boolean;
    label?: string;
}

export default function Loading({ visible = true, label = 'Loading' }: LoadingProps) 
{
    return (
        <div className={css`
            background: rgba(0,0,0, .7);
            border-radius: 4px;
            bottom: ${visible ? 30 : -50}px;
            color: white;
            left: 50%;
            padding: 5px 15px;
            position: fixed;
            text-align: center;
            transform: translateX(-50%);
            transition: bottom .2s ease;
            z-index: 2;
            label: loading;
        `}>
            { label }
        </div>
    )
}