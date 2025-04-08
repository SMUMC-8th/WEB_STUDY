import axios from "axios";
import { useEffect, useState } from "react";
import MovieCard, { TMovie } from "../components/MovieCard";


const HomePage = () => {
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
    return <div className="grid justify-center grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-5">

        {data.map((movie: TMovie, _idx)=>{
            return <MovieCard key={movie.id} movie={movie} />


        })}
    </div>;
};

export default HomePage;