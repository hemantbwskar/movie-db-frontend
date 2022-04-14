export class Movie{
    movieId: number;
    backgroundImage: string;
    title: string;
    released: string;
    metacritic_url: string;
    website: string;
    description: string;
    metacritic: number;
    genres: string[];
    platforms: string[];
    ratings: string[]; 
    screenshots: string[];
    trailers: string[];
    poster: string;
}

export interface Movies<Movie>{
results: Array<Movie>;

}

interface Genre{
    name: string;
}

interface  Platform{
    name: string;
}

interface Rating{
    id: number;
    count: number;
    title: string;
}

interface Screenshot{
    image: string;
}

interface Trailer{
    date:{
        max: string;
    }
}