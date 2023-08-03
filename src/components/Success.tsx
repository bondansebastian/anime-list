import { css } from '@emotion/css';
import React from 'react';

type SuccessProps = {
    autoCloseDuration?: number;
    children?: any;
    visible?: boolean;
}

export default function Success({ 
    children, 
    visible = false 
}: SuccessProps) {
    return (
        <div className={css`
            background: rgba(0,0,0, .7);
            border-radius: 8px;
            top: ${visible ? 30 : -50}px;
            color: white;
            left: 50%;
            padding: 5px 15px;
            position: fixed;
            text-align: center;
            transform: translateX(-50%);
            transition: all .2s ease;
            z-index: 2;
            label: loading;
        `}>
            {children}
        </div>
    )
}