import React, { useContext, useState } from 'react';
import Media from '../types/Media';
import { css } from '@emotion/css';
import Button from './Button';
import Textbox from './Textbox';
import CollectionContext from '../contexts/CollectionContext';
import Collection from '../types/Collection';
import Modal from './Modal';
import PrimaryButton from './PrimaryButton';
import ListItem from './ListItem';
import { NavLink } from 'react-router-dom';

type CollectionModalProps = {
    anime: Media;
    onClose?: Function;
    visible?: boolean;
}

export default function CollectionModal({
    anime,
    visible = false,
    onClose = () => { }
}: CollectionModalProps) {
    const [error, setError] = useState('');
    const { collections, setCollections, validateCollection, addCollection, hasAnime } = useContext(CollectionContext);
    const [checkedCollections, setCheckedCollections] = useState<string[]>(
        collections.filter(c => hasAnime(c, anime)).map(c => c.name)
    );

    const onCreateCollection = (value: string, setValue: Function) => {
        if (!validateCollection(value)) {
            setError(`Collection ${value} already exists`);
            return;
        }
        addCollection(value);
        setCheckedCollections([...checkedCollections, value]);
        setValue('');
        setError('');
    }

    const isChecked = (collection: Collection) => {
        return checkedCollections.includes(collection.name);
    }

    const handleChecked = (collection: Collection) => {
        if (isChecked(collection)) {
            setCheckedCollections(checkedCollections.filter(item => item !== collection.name));
        } else {
            setCheckedCollections([...checkedCollections, collection.name]);
        }
    }

    const handlePersist = () => {
        let mutation = [...collections];
        for (let i = 0; i < mutation.length; i++) {
            // Remove anime from collection
            if (!checkedCollections.includes(mutation[i].name)
                && hasAnime(mutation[i], anime)) {
                mutation[i].animes = mutation[i].animes.filter(item => item.id !== anime.id);
                continue;
            }

            // Add anime into collection
            if (checkedCollections.includes(mutation[i].name)
                && !hasAnime(mutation[i], anime)) {
                mutation[i].animes.push(anime);
                continue;
            }
        }
        setCollections(mutation);
        onClose();
    }

    return (
        <Modal visible={visible} onClose={onClose}>
            <Textbox
                placeholder='Type new collection here'
                onKeyUp={(value: string, setValue: Function) => onCreateCollection(value, setValue)}
                style={`margin-bottom: 7.5px;`}
                error={error}
            />

            {
                collections.map(collection => (
                    <ListItem key={collection.name}>
                        <input
                            type="checkbox"
                            checked={isChecked(collection)}
                            onChange={() => handleChecked(collection)}
                            className={css`margin-right:10px;`} />
                        <div style={{ flex: 2 }}>
                            <NavLink to={`/collection-detail/${collection.name}`}>
                                {collection.name}
                            </NavLink>
                        </div>
                    </ListItem>
                ))
            }

            {
                collections.length <= 0 && (
                    <p>No collections yet</p>
                )
            }

            <PrimaryButton onClick={handlePersist} fullwidth={true}>
                Add
            </PrimaryButton>

            <Button fullwidth={true} onClick={() => onClose()}>
                Close
            </Button>

        </Modal>
    )
}