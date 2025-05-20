import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/store";
import { closeModal, openConfirmDelete } from "../slices/modalSlice";
import { decreaseAmount, calculateTotal } from "../slices/cartSlice";

function ConfirmModal() {
  const dispatch = useDispatch();
  const { isOpen, modalType, modalProps } = useSelector(
    (state: RootState) => state.modal
  );

  if (!isOpen || modalType !== "confirmDelete") return null;

  const handleConfirm = () => {
    if (modalProps?.id !== undefined) {
      dispatch(decreaseAmount({ id: modalProps.id }));
      dispatch(calculateTotal());
    }
    dispatch(closeModal());
  };

  const handleCancel = () => {
    dispatch(closeModal());
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center">
      <div className="bg-white p-6 rounded shadow-lg w-80 text-center">
        <p className="mb-4 text-lg font-semibold">정말 삭제하시겠습니까?</p>
        <div className="flex justify-around">
          <button
            onClick={handleConfirm}
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
          >
            예
          </button>
          <button
            onClick={handleCancel}
            className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
          >
            아니오
          </button>
        </div>
      </div>
    </div>
  );
}

export default ConfirmModal;
