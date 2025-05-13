import { Link } from "react-router-dom";

const Navbar=()=>{
    return (
        <nav>
            <div className="flex gap-4 justify-between bg-neutral-900">
                <Link to='/' className="text-pink-500 px-6 py-4 flex justify-between items-center">
                    돌려돌려LP판
                </Link>
                <div className="mt-3 mr-3">
                <Link to='/login' className="text-sm text-white px-4 py-4">
                    로그인
                </Link>
                <Link
                    to='/signup'
                    className="bg-pink-500 hover:bg-pink-600 text-white px-4 py-2 rounded text-sm">
                    회원가입
                </Link>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;