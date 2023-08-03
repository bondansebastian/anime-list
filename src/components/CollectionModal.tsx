import React, { useContext, useState } from 'react';
import Media from '../types/Media';
import { css } from '@emotion/css';
import Button from './Button';
import Textbox from './Textbox';
import CollectionContext from '../contexts/CollectionContext';
import CollectionRow from './CollectionRow';
import Collection from '../types/Collection';

type CollectionModalProps = {
    anime: Media;
    onClose?: Function;
    visible?: boolean;
}

export default function CollectionModal({ 
    anime, 
    visible = false, 
    onClose = () => {} 
} : CollectionModalProps) {
    const [ error, setError ] = useState('');
    const { collections, setCollections, validateCollection, addCollection, hasAnime } = useContext(CollectionContext);
    const [ checkedCollections, setCheckedCollections ] = useState<string[]>(
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
        let mutation = [ ...collections ];
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
        <div className={css`
            background: rgba(0,0,0,0.5);
            display: ${visible ? 'block': 'none'};
            height: 100%;
            left: 0;
            position: fixed;
            top: 0;
            width: 100%;
            overflow: hidden;
            label: modal-container;
        `} >
            <div className={css`
                background: rgba(0,0,0,0.5);
                display: ${visible ? 'block': 'none'};
                height: 100%;
                left: 0;
                position: fixed;
                top: 0;
                width: 100%;
                label: backdrop;
            `} onClick={() => onClose()} />
            <div className={css`
                background-color: white;
                border-radius: 4px;
                max-height: 70vh;
                overflow-y: auto;
                padding: 15px;
                width: 250px;
                top: 50%;
                left: 50%;
                position: absolute;
                transform: translate(-50%, -50%);
                label: modal;
            `}>
                <Textbox 
                    placeholder='New Collection' 
                    onKeyUp={(value: string, setValue: Function) => onCreateCollection(value, setValue)} 
                    style={`margin-bottom: 7.5px;`}
                    error={error}
                />

                {
                    collections.map(collection => (
                        <CollectionRow key={collection.name} collection={collection}>
                            <input 
                                type="checkbox" 
                                checked={isChecked(collection)} 
                                onChange={() => handleChecked(collection)} />
                        </CollectionRow>
                    ))
                }

                {
                    collections.length <= 0 && (
                        <p>No collections yet</p>
                    )
                }

                <Button style={`
                    width:100%; 
                    margin-top:5px;
                    margin-bottom:5px;
                    background-color: black;
                    color: white !important;
                    &:hover {
                        background-color: hsl(14,80%,30%);
                    }
                `} onClick={() => handlePersist()}>
                    Add
                </Button>
                <Button style={`width:100%;`} onClick={() => onClose()}>
                    Close
                </Button>
            </div>
        </div>
    )
}