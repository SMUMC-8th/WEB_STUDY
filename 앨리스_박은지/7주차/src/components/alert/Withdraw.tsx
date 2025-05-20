import React from "react";
import Portal from "../portal/portal";

interface WithdrawModalProps {
  onClose: () => void;
  onConfirm: () => void;
}

const WithdrawModal = ({ onClose, onConfirm }: WithdrawModalProps) => (
  <Portal>
    <div className="fixed inset-0 bg-black bg-opacity-60 z-50 flex items-center justify-center">
      <div className="bg-[#202024] rounded-xl px-8 py-12 relative flex flex-col items-center min-w-[350px]">
        <button
          className="absolute top-3 right-4 text-gray-300 text-xl hover:text-white"
          onClick={onClose}
        >
          ×
        </button>
        <div className="mb-10 text-white text-sm text-center">
          정말 탈퇴하시겠습니까?
        </div>
        <div className="flex gap-7 justify-center w-full">
          <button
            className="bg-gray-300 text-black rounded-lg px-9 py-2 font-semibold text-sm hover:bg-gray-400"
            onClick={onConfirm}
          >
            예
          </button>
          <button
            className="bg-pink-500 text-white rounded-lg px-7 py-2 font-semibold text-sm hover:bg-pink-500"
            onClick={onClose}
          >
            아니요
          </button>
        </div>
      </div>
    </div>
  </Portal>
);

export default WithdrawModal;
