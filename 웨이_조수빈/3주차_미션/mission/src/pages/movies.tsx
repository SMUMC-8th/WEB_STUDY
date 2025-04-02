import axios from "axios";
import { useEffect, useState } from "react";
import MovieCard, { TMovie } from "../components/movieCard";


const Movies = () => {
    const [data, setData] = useState([]);
    useEffect(()=> {
        const fetchMovies = async () => {
            const response =  await axios(
                `https://api.themoviedb.org/3/movie/popular?language=en-US&page=1`,
                {
                    headers: {
                        Authorization: `Bearer ${
                            import.meta.env.VITE_TMDB_TOKEN
                        }`,
                    },
                }
            );
            setData(response.data.results);
        };
        fetchMovies();
    }, []);
    console.log(data);
    return <div className="w-full p-10 grid grid-cols-4 gap-10">
        {data.map((movie: TMovie, idx)=>{
            return <MovieCard{...movie} key={idx}></MovieCard>
        })}
    </div>;
};

export default Movies;