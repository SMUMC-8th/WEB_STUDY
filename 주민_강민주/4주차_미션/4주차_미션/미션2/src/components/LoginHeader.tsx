import { useNavigate } from "react-router-dom"

const LoginHeader=()=>{
    const navigate=useNavigate();

    return (
        <div className="relative flex items-center justify-center gap-4 mb-6">
            <button
                onClick={()=>navigate(-1)}
                className="absolute left-0 text-white hover:text-pink-400 transition"
            >
                &lt;
            </button>
            <h1 className="text-xl font-bold text-white flex">로그인</h1>
        </div>
    );
};

export default LoginHeader;