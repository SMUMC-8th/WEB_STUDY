import { castType } from "../types/movie";
import defaultImage from "../assets/images/default-image.avif";

interface propsType {
  cast: castType;
}

export default function MovieCastElement({ cast }: propsType) {
  return (
    <div className="box-border flex flex-col justify-center items-center text-center">
      <div className="w-full aspect-square overflow-hidden rounded-full mb-2">
        {cast.profile_path ? (
          <img
            src={`https://image.tmdb.org/t/p/w500${cast.profile_path}`}
            className="w-full h-full object-cover"
            alt={cast.name}
          />
        ) : (
          <img
            src={defaultImage}
            className="w-full h-full object-cover"
            alt="No profile"
          />
        )}
      </div>
      <p className="font-medium text-sm mt-1 truncate w-full">{cast.name}</p>
      <p className="text-xs text-gray-500 truncate w-full">{cast.character}</p>
    </div>
  );
}
