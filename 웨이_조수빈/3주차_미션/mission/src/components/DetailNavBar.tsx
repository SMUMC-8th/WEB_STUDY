import { useNavigate } from "react-router-dom";
import { ArrowLeftIcon } from "@heroicons/react/24/solid";

export default function DetailNavBar() {
  const navigate = useNavigate();

  return (
    <nav className="w-full bg-black text-white text-lg py-5 px-5 select-none">
      <div className="flex items-center justify-between w-full font-semibold">
        
        <button
          onClick={() => navigate(-1)}
          className="text-white hover:text-rose-400 transition cursor-pointer"
        >
          <ArrowLeftIcon className="w-5 h-5 mr-2" />

        </button>

        <span className="ml-auto text-rose-400 pr-6 select-none cursor-default">
          sooloin
        </span>
      </div>
    </nav>
  );
}
