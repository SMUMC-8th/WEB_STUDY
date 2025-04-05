import axios from "axios";
import { useEffect, useState } from "react";

export type Genre={id:number; name: string;};
export type MovieDetailType={
    id: number;
    title: string;
    overview: string;
    poster_path: string;
    release_date: string;
    runtime: number;
    vote_average: number;
    genres:Genre[];
};

const useMovieDetail=(movieId?: string)=>{
    const [movie, setMovie] = useState<MovieDetailType|null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(()=>{
        const fetchDetail=async()=>{
            try{
                setLoading(true);
                setError(false);

                const res = await axios.get(
                    `https://api.themoviedb.org/3/movie/${movieId}?language=en-EN`,
                    {
                        headers:{
                            Authorization: `Bearer ${import.meta.env.VITE_THDB_TOKEN}`,
                        },
                    }
                );

                setMovie(res.data);
            }
            catch(err){
                console.error("상세 정보 불러오기 실패", err);
                setError(true);
            }
            finally{
                setLoading(false);
            }
        };

        if(movieId){
            fetchDetail();
        }
    },[movieId]);

    return {movie, loading, error};
};

export default useMovieDetail;