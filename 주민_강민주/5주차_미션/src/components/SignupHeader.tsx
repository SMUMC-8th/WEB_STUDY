import { useNavigate } from "react-router-dom"

const SignupHeader=({title}:{title:string})=>{
    const navigate=useNavigate();

    return (
        <div className="relative flex items-center justify-center mb-6 h-10">
            <button
                onClick={()=>navigate(-1)}
                className="absolute left-0 text-white hover:text-pink-500 transition"
                >
                &lt;
            </button>
            <h2 className="text-xl font-bold text-white">
                {title}
            </h2>
        </div>
    );
};

export default SignupHeader;