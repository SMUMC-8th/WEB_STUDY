import axios from "axios";
import { useEffect, useState } from "react";
import { TMovie } from "../components/movieCard";
import MovieCard from "../components/movieCard";

// import <Movie> </Movie

const Home = () => {
  return (
    <div className="flex flex-wrap w-full justify-center gap-[10px]">
      {data.map((movie: TMovie, idx) => {
        return <MovieCard key={idx} {...movie}></MovieCard>;
      })}
      ;
    </div>
  );
};
export default Home;
