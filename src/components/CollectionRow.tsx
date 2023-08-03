import { css } from '@emotion/css';
import React, { useContext } from 'react';
import Collection from '../types/Collection';
import { NavLink } from 'react-router-dom';
import CollectionContext from '../contexts/CollectionContext';
import DeleteButton from './DeleteButton';
import ListItem from './ListItem';
import ListItemAction from './ListItemAction';

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

            <ListItemAction style={{ flex: 1 }}>
                <DeleteButton onClick={() => handleDelete(collection)} />
            </ListItemAction>
        </ListItem>
    )
}