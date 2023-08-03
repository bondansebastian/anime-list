import React, { useContext, useEffect, useRef, useState } from 'react';
import { useQuery } from '@apollo/client';
import Container from '../../components/Container';
import Row from '../../components/Row';
import Column from '../../components/Column';
import Cover from '../../components/Cover';
import { NavLink } from 'react-router-dom';
import { css } from '@emotion/css';
import Loading from '../../components/Loading';
import { AnimeContext } from '../../context';
import PageInfo from '../../types/PageInfo';
import PageQueryResult from '../../types/PageQueryResult';
import GET_PAGE from '../../queries/GetPage';

function AnimeList() {
    const { animes, setAnimes } = useContext(AnimeContext);
    const [page, setPage] = useState(1);
    const [firstLoad, setFirstLoad] = useState(true);
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
            if (isVisible(ref.current) && pageInfo.hasNextPage && !loading) {
                setPage(page + 1);
            }
        }
        if (firstLoad 
            && page === 1
            && ref.current !== undefined 
            && isVisible(ref.current)
            && !loading) {
            setPage(page + 1);
            setFirstLoad(false);
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
                        <Column key={anime.id} md={3} lg={12 / 5}>
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

function isVisible(ref: HTMLInputElement) {
    if (ref === undefined) return;
    const elementRect = ref.getBoundingClientRect();
    const viewportHeight = window.innerHeight;
    const padding = 15;
    const bottom = elementRect.bottom - padding;
    return bottom <= viewportHeight;
}

export default AnimeList;
