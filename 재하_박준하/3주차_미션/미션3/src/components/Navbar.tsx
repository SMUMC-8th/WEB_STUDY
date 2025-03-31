import { Link, useLocation } from "react-router-dom";

enum PageName {
  HOME = "/",
  POPULAR = "/popular",
  NOWPLAYING = "/nowplaying",
  TOPRATED = "/toprated",
  UPCOMING = "/upcoming",
}

export default function Navbar() {
  const curPage = useLocation().pathname;

  return (
    <nav className="flex flex-col sm:flex-row p-5">
      <Link
        to={PageName.HOME}
        className={`mb-2 sm:mr-3 hover:text-red-600 ${
          curPage === PageName.HOME ? "text-green-600" : ""
        }`}
      >
        홈
      </Link>
      <Link
        to={PageName.POPULAR}
        className={`mb-2 sm:mr-3 hover:text-red-600 ${
          curPage === PageName.POPULAR ? "text-green-600" : ""
        }`}
      >
        인기 영화
      </Link>
      <Link
        to={PageName.NOWPLAYING}
        className={`mb-2 sm:mr-3 hover:text-red-600 ${
          curPage === PageName.NOWPLAYING ? "text-green-600" : ""
        }`}
      >
        상영 중
      </Link>
      <Link
        to={PageName.TOPRATED}
        className={`mb-2 sm:mr-3 hover:text-red-600 ${
          curPage === PageName.TOPRATED ? "text-green-600" : ""
        }`}
      >
        평점 높은
      </Link>
      <Link
        to={PageName.UPCOMING}
        className={`mb-2 sm:mr-3 hover:text-red-600 ${
          curPage === PageName.UPCOMING ? "text-green-600" : ""
        }`}
      >
        개봉 예정
      </Link>
    </nav>
  );
}
