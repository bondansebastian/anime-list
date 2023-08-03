type Media = {
    id: number;
    title: {
        english: string;
        userPreferred: string;
    };
    bannerImage: string;
    coverImage: {
        medium: string;
        large: string;
    };
    genres: Array<string>;
    episodes: number;
    description: string;
    averageScore: number;
    meanScore: number;
    popularity: number;
    trending: number;
    isAdult: boolean;
}

export default Media