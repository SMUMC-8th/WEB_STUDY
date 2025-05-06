import { Link, Outlet, useLocation } from "react-router-dom"

const Layout=()=>{
    const location=useLocation();
    const currentPath=location.pathname;

    const navItems=[
        {path: "/", label: "홈"},
        {path: "/movies/popular", label: "인기 영화"},
        {path: "/movies/now_playing", label: "상영 중"},
        {path: "/movies/top_rated", label: "평점 높은"},
        {path: "/movies/upcoming", label: "개봉 예정"},
    ]

    return(
        <div>
            <nav className="bg-white text-gray-950 p-4 flex gap-4">
                {navItems.map((item)=>(
                    <Link
                        key={item.path}
                        to={item.path}
                        className={`${
                        currentPath === item.path
                            ? "text-green-400 font-semibold"
                            : "text-black"
                        }`}>
                    {item.label}
                    </Link>
                ))}
                {/* <Link to="/">홈</Link>
                <Link to="/movies/popular">인기 영화</Link>
                <Link to="/movies/now_playing">상영 중</Link>
                <Link to="/movies/top_rated">평점 높은</Link>
                <Link to="/movies/upcoming">개봉 예정</Link> */}
            </nav>

            <main className="p-4">
                <Outlet/>
            </main>
        </div>
    );
};

export default Layout;