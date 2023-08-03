import { css } from '@emotion/css';
import React from 'react';

type DeleteButtonProps = {
    title?: string;
    onClick?: Function;
    label?: string;
}

export default function DeleteButton({
    label = '',
    onClick = () => {},
    title = 'Delete',

}: DeleteButtonProps) {
    return (
        <button title={title} onClick={(e: React.MouseEvent) => onClick(e)} className={css`
            padding: 0;
            border: none;
            background-color: transparent;
            color: rgb(92, 114, 138);
            text-decoration: none;
            transition: color .2s ease;
            cursor: pointer;
            label: delete-button;
            &:hover {
                color: hsl(14, 80%, 30%);
            }
        `}>
            <i className='fa-solid fa-trash' /> {label}
        </button>
    )
}