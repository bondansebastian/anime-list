import React, { useContext, useEffect, useRef, useState } from 'react';
import { useQuery } from '@apollo/client';
import Container from '../../components/Container';
import Row from '../../components/Row';
import Column from '../../components/Column';
import Cover from '../../components/Cover';
import { NavLink } from 'react-router-dom';
import Loading from '../../components/Loading';
import PageQueryResult from '../../types/PageQueryResult';
import GET_PAGE from '../../queries/GetPage';
import AnimeContext from '../../contexts/AnimeContext';
import FloatingNavLink from '../../components/FloatingNavLink';
import PageTitle from '../../components/PageTitle';
import Media from '../../types/Media';
import { css } from '@emotion/css';
import FloatingButton from '../../components/FloatingButton';
import BulkCollectionModal from '../../components/BulkCollectionModal';
import Success from '../../components/Success';

function AnimeList() {
    const { animes, setAnimes, pageInfo, setPageInfo } = useContext(AnimeContext);
    const [selecteds, setSelecteds] = useState<number[]>([]);
    const [page, setPage] = useState(pageInfo.currentPage > 0 ? pageInfo.currentPage : 1);
    const [firstLoad, setFirstLoad] = useState(true);
    const [modalVisible, setModalVisible] = useState(false);
    const [successVisible, setSuccessVisible] = useState(false);
    const { loading, error, data }: PageQueryResult = useQuery(GET_PAGE, {
        variables: {
            page: page,
        }
    });
    const ref = useRef<HTMLInputElement>();
    const handleChecked = (anime: Media) => {
        if (selecteds.includes(anime.id)) {
            setSelecteds(selecteds.filter(item => item !== anime.id));
            return;
        }
        setSelecteds([...selecteds, anime.id]);
    }
    const isSelecting = selecteds.length > 0;

    useEffect(() => {
        const handleScroll = () => {
            if (ref.current === undefined) return;
            if (isVisible(ref.current) && pageInfo.hasNextPage && !loading) {
                setPage(page + 1);
            }
        }

        // Paginate immediately if bottom is visible
        setTimeout(() => {
            if (firstLoad
                && page === 1
                && ref.current !== undefined
                && isVisible(ref.current)
                && !loading) {
                setPage(page + 1);
                setFirstLoad(false);
            }
        }, 250)

        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [pageInfo, loading, page, firstLoad])

    useEffect(() => {
        if (data && data.Page.pageInfo.currentPage > pageInfo.currentPage) {
            setAnimes([
                ...animes,
                ...data.Page.media,
            ]);
            setPageInfo(data.Page.pageInfo);
        }
    }, [animes, data, pageInfo, setPageInfo, setAnimes])

    return (
        <Container ref={ref}>
            <PageTitle>Animes</PageTitle>
            <Success visible={successVisible}>Anime added to collection!</Success>
            <Loading visible={loading} />
            {error && `Error! ${error.message}`}
            <Row>
                {animes.length > 0 && (
                    animes.map(anime => (
                        <Column key={anime.id} md={3} lg={12 / 5}>
                            <Anime 
                                anime={anime} 
                                onChecked={() => handleChecked(anime)}
                                checked={selecteds.includes(anime.id)}
                                selectMode={isSelecting} />
                        </Column>
                    ))
                )}
            </Row>
            <FloatingButton onClick={() => setModalVisible(true)} style={!isSelecting ? `
                right: -200px;
            ` : 'z-index: 3;'}>
                <i className="fa-solid fa-plus" /> Add To Collections
            </FloatingButton>
            <FloatingNavLink to='/collection-list' style={isSelecting ? `
                bottom: -50px;
            ` : ''}>
                <i className="fa-solid fa-folder-open" /> Collections
            </FloatingNavLink>
            <BulkCollectionModal 
                visible={modalVisible} 
                onSuccess={() => {
                    setSelecteds([])
                    setSuccessVisible(true);
                    setTimeout(() => setSuccessVisible(false), 2000);
                }}
                onClose={() => setModalVisible(false)} 
                animes={animes.filter(anime => selecteds.includes(anime.id))}
            />
        </Container>
    );
}

type AnimeProps = {
    anime: Media;
    checked?: boolean;
    onChecked?: Function;
    selectMode?: boolean;
}

function Anime({
    anime,
    checked = false,
    onChecked = () => {},
    selectMode = false,
}: AnimeProps) {
    return (
        <div style={{ position: 'relative' }}>
            <input type="checkbox" checked={checked} onChange={(e) => onChecked(e)} className={css`
                position: absolute;
                top: 5px;
                left: 5px;
                z-index: 2;
                width: 15px;
                height: 15px;
            `} />
            <div className={css`
                position: absolute;
                width: 100%;
                height: 100%;
                display: ${selectMode ? 'block' : 'none'};
                cursor: pointer;
                label: overlay;
                z-index: 1;
            `} onClick={(e) => onChecked(e)} />
            <NavLink to={`anime-detail/${anime.id}`}>
                <Cover 
                    src={anime.coverImage.medium} 
                    deferredSrc={anime.coverImage.large} 
                    alt={anime.title.english}
                    imageStyle={checked ? `
                        width: 90%;
                        height: 245px;
                    ` : ''} />
                <div style={{ fontWeight: 600 }}>
                    {anime.title.english || anime.title.userPreferred}
                </div>
            </NavLink>
        </div>
    )
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
