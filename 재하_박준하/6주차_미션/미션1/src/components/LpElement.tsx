import { useNavigate } from "react-router-dom";
import { LpListResponse } from "../types/ServerResponseType";
import whiteHeart from "../assets/images/whiteHeart.svg";

const LpElement = ({ props }: { props: LpListResponse }) => {
  const navigate = useNavigate();
  const date1 = new Date(props.createdAt);
  const date2 = new Date();
  const diffMs = date2.getTime() - date1.getTime(); // 밀리초 차이
  const diffMins = Math.floor(diffMs / (1000 * 60)); // 분(minute) 단위 차이
  const diffHrs = Math.floor(diffMs / (1000 * 60 * 60)); // 시(hour) 단위 차이
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24)); // 하루(day) 단위 차이

  function getLPInfo() {}

  return (
    <button
      onClick={() => navigate(`/lplist/${props.id}`)}
      onMouseEnter={() => getLPInfo()}
      className="relative rounded-lg group aspect-square hover:z-10"
    >
      <img
        src={props.thumbnail}
        className="object-cover w-full h-full group-hover:brightness-50 group-hover:scale-120"
        alt={props.title || "앨범 커버"}
      />
      <div className="absolute inset-0 flex flex-col items-start justify-end overflow-hidden text-sm text-white opacity-0 group-hover:opacity-100">
        <p className="text-left">{props.title}</p>
        <div className="flex flex-row justify-between w-full">
          <p>
            {diffMins < 60
              ? `${diffMins} mins ag`
              : diffHrs < 24
              ? `${diffHrs} hrs ago`
              : `${diffDays} days ago`}
          </p>
          <div className="flex flex-row items-center justify-center">
            <img src={whiteHeart} className="mr-1 size-3" />
            <p>{props.likes.length}</p>
          </div>
        </div>
      </div>
    </button>
  );
};

export default LpElement;
