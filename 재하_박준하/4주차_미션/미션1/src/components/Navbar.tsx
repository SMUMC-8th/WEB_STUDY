import { Link, useLocation } from "react-router-dom";

enum PageName {
  HOME = "/",
  POPULAR = "/movies/popular",
  NOWPLAYING = "/movies/now_playing",
  TOPRATED = "/movies/top_rated",
  UPCOMING = "/movies/upcoming",
}

interface elementProps {
  pageName: string;
  text: string;
}

export default function Navbar() {
  return (
    <nav className="flex flex-col sm:flex-row p-5">
      <NavbarElement pageName={PageName.HOME} text="홈" />
      <NavbarElement pageName={PageName.POPULAR} text="인기 영화" />
      <NavbarElement pageName={PageName.NOWPLAYING} text="상영 중" />
      <NavbarElement pageName={PageName.TOPRATED} text="평점 높은" />
      <NavbarElement pageName={PageName.UPCOMING} text="개봉 예정" />
    </nav>
  );
}

function NavbarElement({ pageName, text }: elementProps) {
  const currentPage = useLocation().pathname;

  return (
    <Link
      to={pageName}
      className={`mb-2 sm:mr-3 hover:text-red-600 ${
        currentPage === pageName ? "text-green-600" : ""
      }`}
    >
      {text}
    </Link>
  );
}
