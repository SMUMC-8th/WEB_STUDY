import Portal from "../portal/portal";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import WithdrawModal from "./Withdraw";
import { Search, User } from "lucide-react";

const Alert = ({ onClose }: { onClose: () => void }) => {
  const navigate = useNavigate();
  const [showWithdraw, setShowWithdraw] = useState(false);

  const handleSearch = () => {
    onClose();
    navigate("/", { state: { showSearch: true }, replace: true });
  };

  return (
    <Portal>
      <div
        className="fixed inset-0 bg-black bg-opacity-50 z-40"
        onClick={onClose}
      >
        <div
          className="fixed left-0 top-16 h-[calc(100vh-4rem)] w-60 bg-gray-900 transform transition-transform duration-300 ease-in-out z-41 flex flex-col justify-between"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="p-4 text-white">
            <ul className="space-y-2">
              <li
                className="hover:bg-gray-800 p-2 rounded cursor-pointer text-sm flex items-center"
                onClick={handleSearch}
              >
                <Search className="mr-2" size={18} />
                찾기
              </li>
              <li
                className="hover:bg-gray-800 p-2 rounded cursor-pointer text-sm flex items-center"
                onClick={() => {
                  onClose();
                  navigate("/my-page");
                }}
              >
                <User className="mr-2" size={18} />
                마이페이지
              </li>
            </ul>
          </div>
          <div className="flex justify-center items-end mb-6">
            <button
              className="hover:bg-pink-900 p-2 rounded-md cursor-pointer text-sm text-gray-300 w-40"
              onClick={() => setShowWithdraw(true)}
            >
              탈퇴하기
            </button>
          </div>
        </div>
        {showWithdraw && (
          <WithdrawModal
            onClose={() => setShowWithdraw(false)}
            onConfirm={() => {
              setShowWithdraw(false);
              navigate("/");
            }}
          />
        )}
      </div>
    </Portal>
  );
};

export default Alert;
