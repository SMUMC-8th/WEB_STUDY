import Modal from "../Modal/Modal";
import { useCartActions } from "../hooks/useCartStore";

const ClearModal = ({ onClose }: { onClose: () => void }) => {
  const { clearCart } = useCartActions();
  const handleAllClearButton = () => {
    clearCart();
    onClose();
  };

  return (
    <Modal>
      <div className="fixed inset-0 flex items-center justify-center bg-black/50 bg-opacity-50">
        <div className="bg-white p-6 rounded shadow-lg">
          <h2 className="text-xl font-semibold mb-4">정말 삭제하시겠습니까?</h2>
          <p className="mb-4"></p>
          <div className="px-7 flex justify-between">
            <button
              onClick={handleAllClearButton}
              className="px-4 py- bg-blue-800 text-white rounded hover:bg-blue-600"
            >
              예
            </button>
            <button
              onClick={onClose}
              className="ml-2 px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400"
            >
              아니요
            </button>
          </div>
        </div>
      </div>
    </Modal>
  );
};
export default ClearModal;
