import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
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
import { useQuery } from '@apollo/client';
import GET_MEDIA from '../../queries/GetMedia';
import Loading from '../../components/Loading';

function AnimeDetail() {
    const { id } = useParams();
    const { getAnime } = useContext(AnimeContext);
    const { collections, hasAnime } = useContext(CollectionContext);
    const [ modalVisible, setModalVisible ] = useState(false);
    const [ anime, setAnime ] = useState(getAnime(id));
    const { data, loading } = useQuery(GET_MEDIA, {
        variables: {
            id
        },
        skip: (anime !== undefined || id === undefined)
    })
    const collectionCounts = collections.filter(c => hasAnime(c, anime)).length;

    useEffect(() => {
        if (anime !== undefined || data === undefined) return;
        setAnime(data.Media);
    }, [data, anime])

    return (
        <>
            <Loading visible={loading} />
            <Banner src={anime?.bannerImage} alt={anime?.title.userPreferred} />
            <Container>
                <Row>
                    <Column md={3}>
                        <Cover style={`
                            ${mdMin} {
                                box-shadow: 0 0 29px rgba(49,54,68,.25);
                                margin-top: -100px;
                            }
                        `} src={anime?.coverImage.large} alt={anime?.title.userPreferred} />
                        {
                            anime && (
                                <>
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
                                </>
                            )
                        }
                        
                    </Column>
                    {
                        anime && (
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
                        )
                    }
                </Row>
            </Container>
            {
                anime && <CollectionModal anime={anime} visible={modalVisible} onClose={() => setModalVisible(false)} />
            }
        </>
    );
}

export default AnimeDetail;
