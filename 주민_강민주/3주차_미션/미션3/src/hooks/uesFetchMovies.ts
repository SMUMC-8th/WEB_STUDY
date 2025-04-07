import { useEffect, useState } from "react"
import { TMovie } from "../components/movieCard"
import axios from "axios";

const useFetchMovies=(category:string|undefined, page: number)=>{
    const [data, setData]=useState<TMovie[]>([]);
    const [loading, setLoading]=useState(true);
    const [error, setError]=useState(false);

    useEffect(()=>{
        const fetchMovies = async()=>{
            try{
                setLoading(true);
                setError(false);

                const response = await axios(
                    `https://api.themoviedb.org/3/movie/${category}?language=en-EN&page=${page}`,{
                        headers: {
                            Authorization: `Bearer ${
                                import.meta.env.VITE_THDB_TOKEN}`,
                            },
                        }
                );

                setData(response.data.results);
            }
            catch(err){
                console.error("영화 로딩 실패", err);
                setError(true);
            }
            finally{
                setLoading(false);
            }
        };

        if(category){
            fetchMovies();
        }
    }, [category, page]);

    return{data, loading, error};
};

export default useFetchMovies;