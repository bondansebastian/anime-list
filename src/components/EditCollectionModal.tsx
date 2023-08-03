import React, { useContext, useEffect, useRef, useState } from 'react';
import Modal from './Modal';
import Textbox from './Textbox';
import Button from './Button';
import Collection from '../types/Collection';
import CollectionContext from '../contexts/CollectionContext';

type EditCollectionModalProps = {
    collection: Collection|undefined;
    visible?: boolean;
    onClose?: Function;
}

export default function EditCollectionModal({
    collection,
    visible = false,
    onClose = () => { },
}: EditCollectionModalProps) {
    const { editCollection, validateCollection } = useContext(CollectionContext);
    const textboxRef = useRef<HTMLInputElement>();
    const [error, setError] = useState('');

    const handleEdit = (name: string, setValue: Function) => {
        if (!collection) return;
        if (name === collection.name) {
            setError('Please enter a different name');
            return;
        }
        if (validateCollection(name)) {
            editCollection(collection.name, name);
            setValue('');
            onClose();
        } else {
            setError('Collection already exists');
        }
    }

    useEffect(() => {
        if (visible) {
            textboxRef.current?.focus();
        }
    }, [visible])

    return (
        <Modal visible={visible} onClose={onClose}>
            <h4>Edit Collection</h4>
            <Textbox
                initialValue={collection?.name}
                ref={textboxRef}
                fullwidth={true}
                placeholder="Type collection name here"
                onKeyUp={handleEdit}
                error={error}
                style={`margin-bottom: 10px;`}
            />
            <Button fullwidth={true} onClick={() => onClose()}>
                Close
            </Button>
        </Modal>
    )
}