import { css } from '@emotion/css';
import React from 'react';

type EditButtonProps = {
    title?: string;
    onClick?: Function;
    label?: string;
    style?: Object;
}

export default function EditButton({
    label = '',
    onClick = () => {},
    title = 'Edit',
    style = {},
}: EditButtonProps) {
    return (
        <button title={title} onClick={(e: React.MouseEvent) => onClick(e)} className={css`
            padding: 0;
            border: none;
            background-color: transparent;
            color: rgb(92, 114, 138);
            text-decoration: none;
            transition: color .2s ease;
            cursor: pointer;
            label: edit-button;
            &:hover {
                color: hsl(14, 80%, 30%);
            }
        `} style={style}>
            <i className='fa-regular fa-pen-to-square' /> {label}
        </button>
    )
}