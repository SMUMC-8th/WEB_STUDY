import Portal from "../portal/portal";
import { Link } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import { FaUser } from "react-icons/fa";

const Alert = ({ onClose }: { onClose: () => void }) => {
  return (
    <Portal>
      <div
        className="fixed top-20 w-full h-[100vh] flex z-[10000]"
        onClick={() => onClose()}
      >
        <div className="bg-zinc-800 w-[300px] h-full z-[10001] flex flex-col ">
          <Link
            to="/home"
            className="text-gray-200 py-2 px-4 hover:bg-zinc-700 rounded transition"
            onClick={() => onClose()}
          >
            <div>
              <FaSearch className="inline-block mr-2" />
              찾기
            </div>
          </Link>
          <Link
            to="/my"
            className="text-gray-200 py-2 px-4 hover:bg-zinc-700 rounded transition"
            onClick={() => onClose()}
          >
            <div>
              <FaUser className="inline-block mr-2" />
              마이페이지
            </div>
          </Link>
          <Link
            to="/"
            className="mt-auto text-gray-200 text-center py-2 px-4 hover:bg-zinc-700 rounded transition"
            onClick={() => onClose()}
          >
            탈퇴하기
          </Link>
        </div>
      </div>
    </Portal>
  );
};

export default Alert;
