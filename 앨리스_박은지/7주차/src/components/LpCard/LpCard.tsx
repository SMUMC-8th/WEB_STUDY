import { Lp } from "../../types/lp";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

interface LpCardProps {
  lp: Lp;
}

const LpCard = ({ lp }: LpCardProps) => {
  const { accessToken } = useAuth();
  const navigate = useNavigate();

  const handleClick = () => {
    if (!accessToken) {
      window.alert("로그인이 필요한 서비스입니다. 로그인을 해주세요!");
      navigate("/login");
      return;
    }
    navigate(`/lp/${lp.id}`);
  };

  return (
    <div
      className="group relative aspect-square overflow-hidden bg-gray-900 hover:scale-125 transition-all duration-300 cursor-pointer"
      onClick={handleClick}
    >
      <img
        src={lp.thumbnail}
        alt={lp.title}
        className="h-full w-full object-cover"
      />
      <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-60 transition-all duration-300">
        <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
          <h3 className="text-white text-xs font-medium truncate max-w-full">
            {lp.title}
          </h3>
          <div className="flex items-center justify-between text-gray-300 text-xs mt-1">
            <span>{new Date(lp.createdAt).toLocaleDateString()}</span>
            <div className="flex items-center">
              <span>♥ {lp.likes.length}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LpCard;
