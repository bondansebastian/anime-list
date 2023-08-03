import GET_MEDIA from "./queries/GetMedia";
import GET_PAGE from "./queries/GetPage";

export const mediaMock = [
    {
        request: {
            query: GET_MEDIA,
            variables: {
                id: "1",
            }
        },
        result: {
            data: {
                Media: {
                    id: 1,
                    title: {
                        english: 'Test Anime',
                        userPreferred: 'Test Anime'
                    },
                    bannerImage: '',
                    coverImage: { medium: '', large: '' },
                    genres: [],
                    episodes: 10,
                    description: '',
                    averageScore: 10,
                    meanScore: 11,
                    popularity: 5,
                    trending: 5,
                    isAdult: false,
                }
            }
        }
    }
]

export const pageMock = [
    {
        request: {
            query: GET_PAGE,
            variables: {
                page: 1
            }
        },
        result: {
            data: {
                Page: {
                    media: [
                        {
                            id: 1,
                            title: {
                                english: 'Test Anime',
                                userPreferred: 'Test Anime'
                            },
                            bannerImage: '',
                            coverImage: { medium: '', large: '' },
                            genres: [],
                            episodes: 10,
                            description: '',
                            averageScore: 10,
                            meanScore: 11,
                            popularity: 5,
                            trending: 5,
                            isAdult: false,
                        }
                    ],
                    pageInfo: {
                        perPage: 1,
                        currentPage: 1,
                        hasNextPage: false,
                    }
                }
            }
        }
    },
    {
        request: {
            query: GET_PAGE,
            variables: {
                page: 2
            }
        },
        result: {
            data: {
                Page: {
                    media: [
                        {
                            id: 2,
                            title: {
                                english: '',
                                userPreferred: ''
                            },
                            bannerImage: '',
                            coverImage: { medium: '', large: '' },
                            genres: [],
                            episodes: 10,
                            description: '',
                            averageScore: 10,
                            meanScore: 11,
                            popularity: 5,
                            trending: 5,
                            isAdult: false,
                        }
                    ],
                    pageInfo: {
                        perPage: 1,
                        currentPage: 2,
                        hasNextPage: false,
                    }
                }
            }
        }
    }
]