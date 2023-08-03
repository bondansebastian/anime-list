import { css } from '@emotion/css';
import React from 'react';
import { mdMin } from '../breakpoints';

type BannerProps = {
    src?: string|undefined;
    alt?: string|undefined;
}

export default function Banner({ src, alt }: BannerProps)
{
    return (
        <div className={css`
            background-image: url(${src});
            background-position: 50% 35%;
            background-repeat: no-repeat;
            background-size: cover;
            display: none;
            label: banner;
            width: 100%;

            ${mdMin} {
                display: block;
                height: 300px;
            }
        `}>
            <div className={css`
                --color-shadow-dark: 6,13,34;
                background: linear-gradient(180deg,rgba(var(--color-shadow-dark),0) 40%,rgba(var(--color-shadow-dark),.6));
                height: 100%;
                width: 100%;
            `} />
        </div>
    )
}