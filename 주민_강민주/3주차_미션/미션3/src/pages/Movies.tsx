 import {useState} from "react"
import MovieCard from "../components/movieCard";
import { useParams } from "react-router-dom";
import useFetchMovies from "../hooks/uesFetchMovies";

const Movies=()=>{
    const {category}=useParams();
    const [page, setpage]=useState(1);
    const {data, loading, error}=useFetchMovies(category,page);

    if(error){
        return(
            <div className="flex justify-center items-center h-64 text-red-500 font-semibold">
                <p className="text-4xl bg-yellow-200 flex justify-center items-center w-70">:::::ERROR:::::</p>
            </div>
        )
    }

    if (loading) {
        return (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-gray-600 border-opacity-50" />
          </div>
        );
      }      

    return (
        <div>
            <div className="flex justify-center items-center gap-4 mb-8">
                <button
                    onClick={()=>setpage((prev)=>Math.max(prev-1,1))}
                    disabled={page===1}
                    className={`px-4 py-2 rounded text-white transition
                    ${page===1?"opacity-50 cursor-not-allowed bg-gray-500"
                        : "bg-pink-300 hover:bg-green-400"}`}>
                    ⬅
                </button>

                <span className="font-semibold text-lg">{page} 페이지</span>

                <button
                    onClick={()=>setpage((prev)=>prev+1)}
                    className="px-4 py-2 rounded bg-pink-300 text-white
                    hover:bg-green-400 transition">
                    ➡
                </button>
            </div>


            <div
            className="grid gap-6"
            style={{
                gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
            }}
            >
            {data.map((movie) => (
                <MovieCard {...movie} key={movie.title} />
            ))}
            </div>
        </div>
        
      );
    };
    
    export default Movies;

