import { css } from '@emotion/css';
import React from 'react';
import Collection from '../types/Collection';

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
            display: flex;
            flex-direction: row;
            flex-wrap: nowrap;
            justify-content: space-between;
            padding: 5px;
        `}>
            {children}
            <div>
                {collection.name}
            </div>
        </div>
    )
}