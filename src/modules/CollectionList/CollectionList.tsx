import React, { useContext, useState } from 'react';
import Container from '../../components/Container';
import Row from '../../components/Row';
import Column from '../../components/Column';
import CollectionContext from '../../contexts/CollectionContext';
import CollectionRow from '../../components/CollectionRow';
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

export default function CollectionList() {
    const { collections, addCollection, validateCollection } = useContext(CollectionContext);
    const [modalVisible, setModalVisible] = useState(false);
    const [error, setError] = useState('');

    const getCover = (item: Collection) => {
        if (item.animes.length === 0) return `/collection-placeholder.png`;
        return item.animes[0]?.coverImage.medium;
    }

    const handleAdd = (name: string, setValue: Function) => {
        if (validateCollection(name)) {
            addCollection(name);
            setValue('');
            setModalVisible(false);
        } else {
            setError('Collection already exists');
        }
    }

    return (
        <Container>
            <Row>
                <Column>
                    <PageTitle>Collections</PageTitle>
                    <ListContainer>
                        <List>
                            <PrimaryButton onClick={() => setModalVisible(true)}>
                                <i className="fa-solid fa-plus" /> Add Collection
                            </PrimaryButton>
                            {
                                collections.map(collection => (
                                    <CollectionRow key={collection.name} collection={collection}>
                                        <Cover src={getCover(collection)} style={`
                                            flex: .75;
                                            height: 75px;
                                            margin-right: 10px;
                                        `} />
                                    </CollectionRow>
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
            <Modal visible={modalVisible} onClose={() => setModalVisible(false)}>
                <h4>Add New Collection</h4>
                <Textbox
                    fullwidth={true}
                    placeholder="Type collection name here"
                    onKeyUp={handleAdd}
                    error={error}
                    style={`margin-bottom: 10px;`}
                />
                <Button fullwidth={true} onClick={() => setModalVisible(false)}>
                    Close
                </Button>
            </Modal>
        </Container>
    )
}