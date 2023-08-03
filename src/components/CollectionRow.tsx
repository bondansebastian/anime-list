import { css } from '@emotion/css';
import React, { useContext } from 'react';
import Collection from '../types/Collection';
import { NavLink } from 'react-router-dom';
import CollectionContext from '../contexts/CollectionContext';

type CollectionRowType = {
    collection: Collection;
    children?: any;
}

export default function CollectionRow({ 
    collection,
    children 
}: CollectionRowType) {
    const { removeCollection } = useContext(CollectionContext);

    const handleDelete = (collection: Collection) => {
        if (window.confirm(`Delete ${collection.name}?`)) {
            removeCollection(collection.name);
        }
    }

    return (
        <div className={css`
            align-items: center;
            border-radius: 4px;
            border: 0.75px solid #DCDCDC;
            display: flex;
            flex-direction: row;
            flex-wrap: nowrap;
            justify-content: space-between;
            left: 50%;
            margin-bottom: 10px;
            max-width: 400px;
            padding: 10px 15px;
            position: relative;
            transform: translateX(-50%);
        `}>
            {children}

            <div className={css`
                flex: 2;
            `}>
                <NavLink to={`/collection-detail/${collection.name}`}>
                    {collection.name}
                </NavLink>
            </div>

            <div className={css`
                flex: 1;
                text-align: right;
                label: actions;
            `}>
                <a href="javascript:;" title="Delete" onClick={(e) => {
                    e.preventDefault();
                    handleDelete(collection)
                }}>
                    <i className='fa-solid fa-trash' />
                </a>
            </div>

        </div>
    )
}