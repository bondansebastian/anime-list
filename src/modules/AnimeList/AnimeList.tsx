import React, { useEffect, useRef, useState } from 'react';
import { useQuery } from '@apollo/client';
import { GET_PAGE, Media, PageInfo, PageQueryResult } from '../../queries';
import Container from '../../components/Container';
import Row from '../../components/Row';
import Column from '../../components/Column';
import Cover from '../../components/Cover';
import { NavLink } from 'react-router-dom';
import { css } from '@emotion/css';
import Loading from '../../components/Loading';

function AnimeList() {
    const [animes, setAnimes] = useState<Media[]>([]);
    const [page, setPage] = useState(1);
    const [pageInfo, setPageInfo] = useState<PageInfo>({
        perPage: 10,
        currentPage: page,
        hasNextPage: true,
    });
    const { loading, error, data }: PageQueryResult = useQuery(GET_PAGE, {
        variables: {
            page: page,
        }
    });
    const ref = useRef<HTMLInputElement>();

    useEffect(() => {
        const handleScroll = () => {
            if (ref.current === undefined) return;
            const elementRect = ref.current.getBoundingClientRect();
            const viewportHeight = window.innerHeight;
            const padding = 15;
    
            if (elementRect.bottom - padding <= viewportHeight && pageInfo.hasNextPage && !loading) {    
                setPage(page + 1);
            }
        }
        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [pageInfo, loading, page])

    useEffect(() => {
        if (data) {
            setAnimes([
                ...animes,
                ...data.Page.media,
            ]);
            setPageInfo(data.Page.pageInfo);
        }
    }, [data])

    return (
        <Container ref={ref}>
            <Loading visible={loading} />
            {error && `Error! ${error.message}`}
            <Row>
                {animes.length > 0 && (
                    animes.map(anime => (
                        <Column key={anime.id}>
                            <NavLink className={css`
                                color: rgb(92, 114, 138);
                                text-decoration: none;
                                transition: color .2s ease;
                                &:hover {
                                    color: hsl(14,80%,30%);
                                }
                            `} to={`anime-detail/${anime.id}`}>
                                <Cover src={anime.coverImage.large} alt={anime.title.english} />
                                <div className={css`
                                    font-weight: 600;
                                `}>{anime.title.english || anime.title.userPreferred}</div>
                            </NavLink>
                        </Column>
                    ))
                )}
            </Row>
        </Container>
    );
}

export default AnimeList;
