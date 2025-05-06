import Portal from "../portal/portal";

const Alert = ({ onClose }: { onClose: () => void }) => {
  return (
    <Portal>
      <div
        className="fixed inset-0 bg-black bg-opacity-50 z-40"
        onClick={onClose}
      >
        <div
          className="fixed left-0 top-16 h-[calc(100vh-4rem)] w-64 bg-gray-900 transform transition-transform duration-300 ease-in-out z-41"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="p-4 text-white">
            <ul className="space-y-2">
              <li className="hover:bg-gray-800 p-2 rounded cursor-pointer">
                찾기
              </li>
              <li className="hover:bg-gray-800 p-2 rounded cursor-pointer">
                마이페이지
              </li>
            </ul>
          </div>
        </div>
      </div>
    </Portal>
  );
};

export default Alert;
