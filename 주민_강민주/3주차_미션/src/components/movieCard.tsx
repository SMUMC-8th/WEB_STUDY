export type TMovie={
    adult: boolean;
    title: string;
    overview: string;
    vote_count: number;
    backdrop: string;
    poster_path: string;
}

const MovieCard=(movie: TMovie) =>{
    return <div className="relative overflow-hidden rounded-lg group">
        <img className="w-full h-auto transition duration-300 transform
            group-hover:scale-105 group-hover:blur-sm"
        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}}`} alt={movie.title}/>
        <div className="absolute inset-0 opacity-0 flex flex-col items-center justify-center
            group-hover:opacity-100 text-white p-4 transition-opacity duration-300">
                <div className="text-lg font-bold">{movie.title}</div>
                <div className="text-sm line-clamp-3">{movie.overview}</div>
        </div>
    </div>;
};

export default MovieCard;