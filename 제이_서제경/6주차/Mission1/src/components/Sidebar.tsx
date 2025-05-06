import { Link } from "react-router-dom";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const Sidebar = ({ isOpen, onClose }: SidebarProps) => {
  if (!isOpen) return null;

  return (
    // 전체 화면 덮는 오버레이 (여기를 클릭하면 닫힘)
    <div
      className="fixed inset-0 z-30"
      onClick={onClose} // 배경 클릭하면 닫힘
    >
      {/* 사이드바 본체 */}
      <div
        className={`absolute top-16 left-0 h-[calc(100vh-64px)] w-64 bg-zinc-900 text-white shadow-lg z-40
          transition-transform duration-300 ease-in-out
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
        `}
        onClick={(e) => e.stopPropagation()} // 내부 클릭 시 닫힘 방지
      >
        <ul className="p-4 space-y-3">
          <li className="flex items-center gap-2">
            <span className="material-icons">search</span>
            <Link to="/search" onClick={onClose}>
              찾기
            </Link>
          </li>
          <li className="flex items-center gap-2">
            <span className="material-icons">person</span>
            <Link to="/mypage" onClick={onClose}>
              마이페이지
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
