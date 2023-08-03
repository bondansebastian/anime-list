import { css } from '@emotion/css';
import React from 'react';

type CoverProps = {
    src?: string|undefined;
    alt?: string|undefined;
    style?: string;
}

export default function Cover({ src, alt, style }: CoverProps)
{
    if (src === undefined) src = '/collection-placeholder.png';
    return (
        <div className={css`
            --color-shadow-blue: 103,132,187;
            border-radius: 4px;
            height: 265px;
            width: 100%;
            overflow: hidden;
            box-shadow: 0 14px 30px rgba(var(--color-shadow-blue),.15),0 4px 4px rgba(var(--color-shadow-blue),.05);
            ${style}
            label: cover;
        `}>
            <img className={css`
                width: 100%;
                height: 100%;
                object-fit: cover;
                label: cover-img;
            `} src={src} alt={alt} />
        </div>
    )
}