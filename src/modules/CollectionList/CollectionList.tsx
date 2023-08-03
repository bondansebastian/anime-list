import React, { useContext } from 'react';
import Container from '../../components/Container';
import Row from '../../components/Row';
import Column from '../../components/Column';
import CollectionContext from '../../contexts/CollectionContext';
import CollectionRow from '../../components/CollectionRow';
import FloatingNavLink from '../../components/FloatingNavLink';
import Cover from '../../components/Cover';
import Collection from '../../types/Collection';

export default function CollectionList()
{
    const { collections } = useContext(CollectionContext);

    const getCover = (item: Collection) => {
        if (item.animes.length === 0) return `/collection-placeholder.png`;
        return item.animes[0]?.coverImage.medium;
    }

    return (
        <Container>
            <Row>
                <Column>
                    {
                        collections.map(collection => (
                            <CollectionRow key={collection.name} collection={collection}>
                                <Cover src={getCover(collection)} style={`
                                    flex: .1;
                                    height: 75px;
                                    margin-right: 10px;
                                `} />
                            </CollectionRow>
                        ))
                    }
                </Column>
            </Row>
            <FloatingNavLink to='/'>
                <i className="fa-solid fa-tv" /> Animes
            </FloatingNavLink>
        </Container>
    )
}