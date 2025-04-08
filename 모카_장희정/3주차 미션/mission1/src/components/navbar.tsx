import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="flex w-full h-[100px] gap-[15px] ">
      <a href="/">홈</a>
      <a href="popular">인기 영화</a>
      <Link to={"now_playing"}>상영 중 </Link>
      <Link to="top_rated">평점 높은</Link>
      <Link to="upcoming">개봉 예정</Link>
    </div>
  );
};

export default Navbar;
