import { css } from '@emotion/css';
import React from 'react';

type CoverProps = {
    src?: string|undefined;
    alt?: string|undefined;
    style?: string;
    imageStyle?: string;
}

export default function Cover({ src, alt, style, imageStyle }: CoverProps)
{
    if (src === undefined) src = '/collection-placeholder.png';
    return (
        <div className={css`
            --color-shadow-blue: 103,132,187;
            border-radius: 4px;
            box-shadow: 0 14px 30px rgba(var(--color-shadow-blue),.15),0 4px 4px rgba(var(--color-shadow-blue),.05);
            background-color: #6CB4EE;
            height: 265px;
            overflow: hidden;
            position: relative;
            transition: all .2s ease;
            width: 100%;
            ${style}
            label: cover;
        `}>
            <img className={css`
                height: 100%;
                left: 50%;
                object-fit: cover;
                position: relative;
                top: 50%;
                transform: translate(-50%,-50%);
                transition: all .2s ease;
                width: 100%;
                ${imageStyle}
                label: cover-img;
            `} src={src} alt={alt} />
        </div>
    )
}