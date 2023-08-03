import { css } from '@emotion/css';
import React from 'react';
import Row from './Row';
import Column from './Column';

type MetaData = {
    label: string;
    value: string | number | Array<string | number>;
}

type MetaProps = {
    data: Array<MetaData>;
    sm?: number,
    md?: number,
    lg?: number,
    xl?: number,
}

export default function Meta({ data, sm = 12, md = sm, lg = md, xl = lg }: MetaProps) {
    return (
        <div className={css`
            background-color: white;
            padding: 0 15px;
            border-radius: 8px;
        `}>
            <Row>
                {data.map(item => (
                    <Column key={item.label} sm={sm} md={md} lg={lg} xl={xl}>
                        <div className={css`
                            font-size: .85rem;
                            font-weight: 500;
                        `}>
                            {item.label}
                        </div>

                        {
                            Array.isArray(item.value) && item.value.map(val => (
                                <ItemValue key={val}>{val}</ItemValue>
                            ))
                        }

                        {
                            !Array.isArray(item.value) && (
                                <ItemValue>{item.value}</ItemValue>
                            )
                        }
                    </Column>
                ))}
            </Row>
        </div>
    )
}

function ItemValue({ children }: any) {
    return (
        <div className={css`
            --color-text-lighter: 146,153,161;
            color: rgb(var(--color-text-lighter));
            font-size: .8rem;
        `}>
            {children}
        </div>
    )
}