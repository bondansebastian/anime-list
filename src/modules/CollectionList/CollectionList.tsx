import React, { useContext, useEffect, useRef, useState } from 'react';
import Container from '../../components/Container';
import Row from '../../components/Row';
import Column from '../../components/Column';
import CollectionContext from '../../contexts/CollectionContext';
import FloatingNavLink from '../../components/FloatingNavLink';
import Cover from '../../components/Cover';
import Collection from '../../types/Collection';
import PageTitle from '../../components/PageTitle';
import PrimaryButton from '../../components/PrimaryButton';
import Modal from '../../components/Modal';
import Textbox from '../../components/Textbox';
import Button from '../../components/Button';
import List from '../../components/List';
import ListContainer from '../../components/ListContainer';
import ListItem from '../../components/ListItem';
import { NavLink } from 'react-router-dom';
import ListItemAction from '../../components/ListItemAction';
import DeleteButton from '../../components/DeleteButton';
import MutedText from '../../components/MutedText';
import EditCollectionModal from '../../components/EditCollectionModal';
import EditButton from '../../components/EditButton';

export default function CollectionList() {
    const { collections, addCollection, validateCollection, removeCollection } = useContext(CollectionContext);
    const [adding, setAdding] = useState(false);
    const [editing, setEditing] = useState(false);
    const [selected, setSelected] = useState<Collection|undefined>(undefined);
    const [error, setError] = useState('');
    const textboxRef = useRef<HTMLInputElement>();

    const getCover = (item: Collection) => {
        if (item.animes.length === 0) return `/collection-placeholder.png`;
        return item.animes[0]?.coverImage.medium;
    }

    const handleAdd = (name: string, setValue: Function) => {
        if (validateCollection(name)) {
            addCollection(name);
            setValue('');
            setAdding(false);
        } else {
            setError('Collection already exists');
        }
    }

    const handleEdit = (collection: Collection) => {
        setSelected(collection);
        setEditing(true);
    }

    const handleDelete = (collection: Collection) => {
        if (window.confirm(`Delete ${collection.name}?`)) {
            removeCollection(collection.name);
        }
    }

    useEffect(() => {
        if (adding) {
            textboxRef.current?.focus();
        }
    }, [adding])

    return (
        <Container>
            <Row>
                <Column>
                    <PageTitle>Collections</PageTitle>
                    <ListContainer>
                        <List>
                            <PrimaryButton onClick={() => setAdding(true)}>
                                <i className="fa-solid fa-plus" /> Add Collection
                            </PrimaryButton>
                            {
                                collections.map(collection => (
                                    <ListItem key={collection.name}>
                                        <Cover src={getCover(collection)} style={`
                                            flex: .75;
                                            height: 75px;
                                            margin-right: 10px;
                                        `} />

                                        <div style={{ flex: 2 }}>
                                            <NavLink to={`/collection-detail/${collection.name}`}>
                                                {collection.name}
                                                <div>
                                                    <MutedText style={{ fontSize: '12px' }}>
                                                        {collection.animes.length} item(s)
                                                    </MutedText>
                                                </div>
                                            </NavLink>
                                        </div>

                                        <ListItemAction style={{ flex: 1 }}>
                                            <EditButton 
                                                onClick={() => handleEdit(collection)} 
                                                style={{ marginRight: '10px' }}
                                            />
                                            <DeleteButton onClick={() => handleDelete(collection)} />
                                        </ListItemAction>
                                    </ListItem>
                                ))
                            }
                            {
                                collections.length <= 0 && (
                                    <p>No collections yet</p>
                                )
                            }
                        </List>
                    </ListContainer>
                </Column>
            </Row>
            <FloatingNavLink to='/'>
                <i className="fa-solid fa-tv" /> Animes
            </FloatingNavLink>
            <Modal visible={adding} onClose={() => setAdding(false)}>
                <h4>Add New Collection</h4>
                <Textbox
                    ref={textboxRef}
                    fullwidth={true}
                    placeholder="Type collection name here"
                    onKeyUp={handleAdd}
                    error={error}
                    style={`margin-bottom: 10px;`}
                />
                <Button fullwidth={true} onClick={() => setAdding(false)}>
                    Close
                </Button>
            </Modal>
            <EditCollectionModal 
                visible={editing} 
                collection={selected} 
                onClose={() => setEditing(false)} 
            />
        </Container>
    )
}