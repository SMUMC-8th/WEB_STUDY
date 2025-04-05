import axios from "axios";
import { useEffect, useState } from "react";

type Person={
    id:number;
    name:string;
    profile_path:string|null;
    character?:string;
    job?:string;
};

const useMovieCredits=(movieId?: string)=>{
    const [cast, setCast]=useState<Person[]>([]);
    const [crew, setCrew]=useState<Person[]>([]);
    const [loading, setLoading]=useState(true);
    const [error, setError]=useState(false);

    useEffect(()=>{
        const fetchCredits = async()=>{
            try{
                setLoading(true);
                setError(false);

                const res=await axios.get(
                    `https://api.themoviedb.org/3/movie/${movieId}/credits`,
              {
                headers: {
                  Authorization: `Bearer ${import.meta.env.VITE_THDB_TOKEN}`,
                },
              }
            );
            
            setCast(res.data.cast.slice(0,16));
            setCrew(res.data.crew.filter((p:Person)=> p.job==="Director"));
            }
            catch(err){
                console.error("크레딧 불러오기 실패", err);
                setError(true);
            }
            finally{
                setLoading(false);
            }
        };

        if(movieId){
            fetchCredits();
        }
    },[movieId]);

    return {cast, crew, loading, error};
};

export default useMovieCredits;