import { TLP } from "../constants/lps";
import { FaHeart } from "react-icons/fa";

const timeSince = (date: string) => {
  const seconds = Math.floor(
    (new Date().getTime() - new Date(date).getTime()) / 1000
  );

  const intervals = [
    { label: "년", seconds: 31536000 },
    { label: "개월", seconds: 2592000 },
    { label: "일", seconds: 86400 },
    { label: "시간", seconds: 3600 },
    { label: "분", seconds: 60 },
    { label: "초", seconds: 1 },
  ];

  for (const interval of intervals) {
    const count = Math.floor(seconds / interval.seconds);
    if (count >= 1) {
      return `${count}${interval.label} 전`;
    }
  }

  return "방금 전";
};

function LpCard(lp: TLP | undefined) {
  if (!lp) return null;

  return (
    <div
      key={lp.id}
      className="relative group w-[200px] h-[200px] overflow-hidden shadow-md"
    >
      <img
        src={lp.thumbnail || ""}
        alt="썸네일"
        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
      />
      {/* Hover Overlay */}
      <div className="absolute inset-0 bg-black/60 text-white flex flex-col items-start justify-end opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-3 gap-y-1 text-xs">
        <p className="line-clamp-1">{lp.title}</p>
        <p>{timeSince(lp.createdAt)}</p>
        <div className="flex items-center gap-1">
          <FaHeart className="text-red-400 text-xs" />
          <span>{lp.likes?.length ?? 0}</span>
        </div>
      </div>
    </div>
  );
}

export default LpCard;
