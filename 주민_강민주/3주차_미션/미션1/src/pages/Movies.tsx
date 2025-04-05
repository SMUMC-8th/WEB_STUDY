import axios from "axios";
import {useEffect, useState} from "react"
import MovieCard from "../components/movieCard";
import { TMovie } from "../components/movieCard";

const Movies=()=>{
    const [data, setData]=useState([]);
    useEffect(()=>{
        const fetchMovies=async()=>{
            const response=await axios(
                `https://api.themoviedb.org/3/movie/popular?language=en-US&page=1`,{
                    headers: {
                        Authorization: `Bearer ${
                            import.meta.env.VITE_THDB_TOKEN
                        }`,
                    },
                }
            );
            setData(response.data.results);
        };
        fetchMovies();
    },[]);
    console.log(data);
    return <div className="grid gap-6 p-4"
    style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))' }}>
        {data.map((movie: TMovie, idx)=>{
            return <MovieCard{...movie} key={idx}></MovieCard>;
        })}
    </div>
}

export default Movies;

