import React, { useContext } from 'react';
import Container from '../../components/Container';
import Row from '../../components/Row';
import Column from '../../components/Column';
import PageTitle from '../../components/PageTitle';
import ListContainer from '../../components/ListContainer';
import List from '../../components/List';
import ListItem from '../../components/ListItem';
import Cover from '../../components/Cover';
import Media from '../../types/Media';
import { NavLink, Navigate, useParams } from 'react-router-dom';
import ListItemAction from '../../components/ListItemAction';
import DeleteButton from '../../components/DeleteButton';
import CollectionContext from '../../contexts/CollectionContext';

export default function CollectionDetail() {
    const { name } = useParams();
    const { collections, removeAnime } = useContext(CollectionContext);
    const collection = collections.find(item => item.name === name);
    const animes = collection?.animes || [];
    const getCover = (anime: Media) => anime.coverImage.large;
    const getTitle = (anime: Media) => anime.title.english || anime.title.userPreferred;

    const handleDelete = (anime: Media) => {
        if (collection === undefined) return;
        if (window.confirm(`Remove ${getTitle(anime)} from ${collection.name}?`)) {
            removeAnime(collection, anime);
        }
    }

    if (collection === undefined) {
        return <Navigate to='/collection-list' replace={true} />
    }

    return (
        <Container>
            <Row>
                <Column>
                    <PageTitle>{collection.name}</PageTitle>
                    <ListContainer>
                        <List>
                            {
                                animes.map(anime => (
                                    <ListItem key={anime.id}>
                                        <Cover src={getCover(anime)} style={`
                                            flex: .75;
                                            height: 75px;
                                            margin-right: 10px;
                                        `} />
                                        <div style={{ flex: 2 }}>
                                            <NavLink to={`/anime-detail/${anime.id}`}>
                                                {getTitle(anime)}
                                            </NavLink>
                                        </div>
                                        <ListItemAction style={{ flex: 1 }}>
                                            <DeleteButton onClick={() => handleDelete(anime)} />
                                        </ListItemAction>
                                    </ListItem>
                                ))
                            }
                            {
                                animes.length <= 0 && (
                                    <p style={{ textAlign: 'center' }}>Collection is empty</p>
                                )
                            }
                        </List>
                    </ListContainer>
                </Column>
            </Row>
        </Container>
    )
}