import { Link } from "react-router-dom";
import humanIcon from "../assets/images/human.svg";
import Magnifier from "../assets/images/Magnifier.svg";

const Side = () => {
  return (
    <aside className="w-[200px] max-[720px]:opacity-0 max-[720px]:duration-700 p-3 flex flex-col bg-zinc-900 text-3xl text-white">
      <Link
        to={"/mypage"}
        className="flex flex-row items-center m-2 text-sm text-left hover:text-pink-500"
      >
        <img src={humanIcon} className="w-[20px] mr-1" />
        마이페이지
      </Link>
      <Link
        to={"/lplist"}
        className="flex flex-row m-2 text-sm text-left hover:text-pink-500"
      >
        <img src={Magnifier} className="w-[15px] mr-2" />
        LP 목록 조회
      </Link>
    </aside>
  );
};

export default Side;
