import { css } from '@emotion/css';
import React, { useContext } from 'react';
import Collection from '../types/Collection';
import { NavLink } from 'react-router-dom';
import CollectionContext from '../contexts/CollectionContext';
import DeleteButton from './DeleteButton';
import ListItem from './ListItem';

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
        <ListItem>
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
                <DeleteButton onClick={() => handleDelete(collection)} />
            </div>
        </ListItem>
    )
}