import { css } from '@emotion/css';
import React from 'react';

type ModalProps = {
    onClose?: Function;
    visible?: boolean;
    children?: any;
}

export default function Modal({
    visible = false,
    onClose = () => { },
    children,
}: ModalProps) {
    return (
        <div className={css`
            display: ${visible ? 'block' : 'none'};
            height: 100%;
            left: 0;
            position: fixed;
            top: 0;
            width: 100%;
            overflow: hidden;
            label: modal-container;
        `} >
            <div className={css`
                background: rgba(0,0,0,0.5);
                height: 100%;
                left: 0;
                position: absolute;
                top: 0;
                width: 100%;
                label: backdrop;
            `} onClick={() => onClose()} />

            <div className={css`
                background-color: white;
                border-radius: 4px;
                max-height: 70vh;
                overflow-y: auto;
                padding: 15px;
                width: 250px;
                top: 50%;
                left: 50%;
                position: absolute;
                transform: translate(-50%, -50%);
                label: modal;
            `}>
                {children}
            </div>
        </div>
    )
}