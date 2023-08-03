import { css } from '@emotion/css';
import React from 'react';
import Collection from '../types/Collection';
import { NavLink } from 'react-router-dom';

type CollectionRowType = {
    collection: Collection;
    children?: any;
}

export default function CollectionRow({ 
    collection,
    children 
}: CollectionRowType) {
    return (
        <div className={css`
            border-radius: 4px;
            border: 0.75px solid #DCDCDC;
            display: flex;
            flex-direction: row;
            flex-wrap: nowrap;
            justify-content: space-between;
            align-items: center;
            padding: 10px;
            margin-bottom: 10px;
        `}>
            {children}
            <div className={css`
                flex: 2;
            `}>
                <NavLink to={`/collection-detail/${collection.name}`}>
                    {collection.name}
                </NavLink>
            </div>
        </div>
    )
}