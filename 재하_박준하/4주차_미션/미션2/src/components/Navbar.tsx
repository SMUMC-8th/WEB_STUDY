import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="w-full p-5 flex justify-between items-center bg-zinc-900">
      <Link to={"/"} className="text-md sm:text-xl text-pink-500 font-bold">
        돌려돌려 LP판
      </Link>

      <div className="flex justify-center items-center text-white text-xs sm:text-sm">
        <Link
          to={"/signin"}
          className="mx-5 p-2 px-4 rounded-lg bg-black hover:bg-green-500"
        >
          로그인
        </Link>
        <Link
          to={"/signup"}
          className="p-2 px-3 rounded-lg bg-pink-500 hover:bg-green-500"
        >
          회원가입
        </Link>
      </div>
    </nav>
  );
}
