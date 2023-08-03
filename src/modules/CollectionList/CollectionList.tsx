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
import { css } from '@emotion/css';
import PrimaryButton from '../../components/PrimaryButton';
import { mdMin } from '../../breakpoints';
import Modal from '../../components/Modal';
import Textbox from '../../components/Textbox';
import Button from '../../components/Button';

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
                    <div className={css`
                        position: relative;
                    `}>
                        <div className={css`
                            display: inline-block;
                            position: relative;
                            left: 50%;
                            transform: translateX(-50%);
                            width: 100%;
                            ${mdMin} {
                                width: 400px;
                            }
                        `}>
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
                        </div>

                        {
                            collections.length <= 0 && (
                                <p>No collections yet</p>
                            )
                        }
                    </div>
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