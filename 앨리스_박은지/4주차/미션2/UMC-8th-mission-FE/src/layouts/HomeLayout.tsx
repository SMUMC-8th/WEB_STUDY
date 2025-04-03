import { Outlet, Link } from "react-router-dom";

function HomeLayout() {
  return (
    <div className="min-h-screen bg-black text-white">
      <nav className="bg-black border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex">
              <Link to="/" className="flex-shrink-0 flex items-center">
                <span className="text-xl font-bold text-pink-500">
                  돌려돌려LP판
                </span>
              </Link>
            </div>
            <div className="flex items-center space-x-4">
              <Link
                to="/login"
                className="text-gray-300 hover:text-white px-3 py-2 text-sm font-bold"
              >
                로그인
              </Link>
              <Link
                to="/signup"
                className="bg-pink-500 hover:bg-pink-600 text-white px-4 py-2 rounded-md text-sm font-bold"
              >
                회원가입
              </Link>
            </div>
          </div>
        </div>
      </nav>
      <main>
        <Outlet />
      </main>
    </div>
  );
}

export default HomeLayout;
