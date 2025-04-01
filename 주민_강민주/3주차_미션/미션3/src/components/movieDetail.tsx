import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

type Person={
    id:number;
    name:string;
    profile_path:string|null;
    character?:string;
    job?:string;
};

type MovieDetailType={
    title: string;
    overview: string;
    poster_path: string;
    release_date: string;
    runtime: number;
    vote_average: number;
    genres:{id: number; name: string}[];
};

const MovieDetail=()=>{
    const {movieId}=useParams();
    const [movie, setMovie]=useState<MovieDetailType|null>(null);
    const [loading, setLoading]=useState(true);
    const [error, setError]=useState<string|null>(null);
    const [cast, setCast] = useState<Person[]>([]);
    const [crew, setCrew] = useState<Person[]>([]);

    const fallbackImage = "https://upload.wikimedia.org/wikipedia/commons/6/65/No-Image-Placeholder.svg";


    useEffect(()=>{
        const fetchMovie=async()=>{
            try{
                setLoading(true);
                setError(null);

                const response=await axios.get(
                    `https://api.themoviedb.org/3/movie/${movieId}?language=en-EN`,
                    {
                        headers:{
                            Authorization: `Bearer ${import.meta.env.VITE_THDB_TOKEN}`,
                        },
                    }
                );

                setMovie(response.data);
            }
            catch(err){
                console.error(err);
                setError("영화 정보를 불러오는 데 실패했습니다.");
            }
            finally{
                setLoading(false);
            }
        };

        const fetchCredits = async () => {
            const creditRes = await axios.get(
              `https://api.themoviedb.org/3/movie/${movieId}/credits`,
              {
                headers: {
                  Authorization: `Bearer ${import.meta.env.VITE_THDB_TOKEN}`,
                },
              }
            );
          
            setCast(creditRes.data.cast.slice(0, 16));
            setCrew(creditRes.data.crew.filter((person: Person) => person.job === "Director"));
          };

        if (movieId){
            fetchMovie();
            fetchCredits();
        }
    }, [movieId]);

    if (loading){
        return(
            <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-green-500 border-opacity-50"/>
            </div>
        );
    }

    if (error){
        return(
            <div className="text-red-500 text-center font-semibold mt-8">
                {error}
            </div>
        );
    }

    if (!movie){
        return null;
    }

    return (
        <div className="w-full mx-auto p-6">
            <div className="flex flex-col md:flex-row gap-6">
                <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                    alt={movie.title}
                    className="w-full md:w-1/3 rounded-lg shadow-lg"/>
                <div className="flex-col flex justify-center">
                    <h1 className="text-3xl font-bold mb-2">{movie.title}</h1>
                    <p className="text-m text-gray-600 mb-2">개봉일: {movie.release_date} | 러닝타임: {movie.runtime}분</p>
                    <p className="mb-2 text-yellow-500">평점 {movie.vote_average}</p>
                    <div className="flex flex-wrap gap-2 mb-4">
                        {movie.genres.map((genre)=>(
                            <span
                                key={genre.id}
                                className="bg-green-200 text-green-800 px-3 py-1 rounded-full text-sm">
                                {genre.name}
                            </span>
                        ))}
                    </div>
                    <p className="text-gray-800 leading-relaxed">{movie.overview}</p>
                </div>
            </div>

            <div className="mt-12">
                <h2 className="text-2xl font-bold mb-4">감독/출연</h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-6 gap-4">
                    {[...crew, ...cast].map((person) => (
                    <div key={person.id} className="flex flex-col items-center text-center">
                        <img
                        src={
                            person.profile_path
                            ? `https://image.tmdb.org/t/p/w185${person.profile_path}`
                            : fallbackImage
                        }
                        alt={person.name}
                        className="w-24 h-24 rounded-full object-cover border border-gray-300 shadow-md"
                        />
                        <p className="text-sm font-medium mt-2">{person.name}</p>
                        <p className="text-xs text-gray-500">
                        {person.character || person.job}
                        </p>
                    </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default MovieDetail;