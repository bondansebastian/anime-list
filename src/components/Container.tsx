import { css } from '@emotion/css';
import React, { RefObject } from 'react';
import { lgMin, mdMin, smMin, xlMin } from '../breakpoints';

export default React.forwardRef(function Container({ children, ...props }: any, ref) {
    return (
        <div className={css`
            width: calc(100% - 30px);
            padding-right: 15px;
            padding-left: 15px;
            margin-right: auto;
            margin-left: auto;
            label: container;

            ${smMin} {
                max-width: 540px;
            }

            ${mdMin} {
                max-width: 720px;
            }

            ${lgMin} {
                max-width: 960px;
            }

            ${xlMin} {
                max-width: 1140px;
            }
        `} ref={ref as RefObject<HTMLInputElement>} {...props}>
            {children}
        </div>
    )
})