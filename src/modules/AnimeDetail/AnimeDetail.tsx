import React, { useContext, useState } from 'react';
import { Navigate, useParams } from 'react-router-dom';
import Container from '../../components/Container';
import Row from '../../components/Row';
import Column from '../../components/Column';
import Cover from '../../components/Cover';
import Banner from '../../components/Banner';
import { css } from '@emotion/css';
import { mdMin } from '../../breakpoints';
import Meta from '../../components/Meta';
import AnimeContext from '../../contexts/AnimeContext';
import Button from '../../components/Button';
import CollectionModal from '../../components/CollectionModal';
import CollectionContext from '../../contexts/CollectionContext';

function AnimeDetail() {
    const { id } = useParams();
    const { getAnime } = useContext(AnimeContext);
    const { collections, hasAnime } = useContext(CollectionContext);
    const [ modalVisible, setModalVisible ] = useState(false);
    const anime = id === undefined ? undefined : getAnime(parseInt(id));
    const collectionCounts = anime !== undefined 
        ? collections.filter(c => hasAnime(c, anime)).length 
        : 0;

    if (!anime) {
        return <Navigate to='/' replace={true} />
    }

    return (
        <>
            <Banner src={anime.bannerImage} alt={anime.title.userPreferred} />
            <Container>
                <Row>
                    <Column md={3}>
                        <Cover style={`
                            ${mdMin} {
                                box-shadow: 0 0 29px rgba(49,54,68,.25);
                                margin-top: -100px;
                            }
                        `} src={anime.coverImage.large} alt={anime.title.userPreferred} />
                        <br />
                        <Button style={`
                            width: 100%;
                        `} onClick={() => setModalVisible(true)}>
                            <i className='fa-solid fa-folder-open' /> { collectionCounts <= 0 ? `Add to collection` : `Added to collection (${collectionCounts})` }
                        </Button>
                        <br /> <br />
                        <Meta data={[
                            { label: 'Genres', value: anime.genres },
                        ]} />
                    </Column>
                    <Column md={9}>
                        <h1 className={css`
                            font-size: 1.4rem;
                            font-weight: 400;
                        `}>{anime.title.english || anime.title.userPreferred}</h1>
                        <div dangerouslySetInnerHTML={{ __html: anime.description }} />
                        <br />
                        <Meta data={[
                            { label: 'Episodes', value: anime.episodes },
                            { label: 'Average Score', value: `${anime.averageScore}%` },
                            { label: 'Mean Score', value: `${anime.meanScore}%` },
                            { label: 'Popularity', value: `${anime.popularity}` },
                            { label: 'Trending', value: `${anime.trending}` },
                            { label: '18+', value: anime.isAdult ? 'Yes' : 'No' },
                        ]} md={12/3} lg={12/6} />
                    </Column>
                </Row>
            </Container>
            <CollectionModal anime={anime} visible={modalVisible} onClose={() => setModalVisible(false)} />
        </>
    );
}

export default AnimeDetail;
