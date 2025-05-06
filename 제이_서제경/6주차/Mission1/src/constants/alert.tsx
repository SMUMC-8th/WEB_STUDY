// 모달(팝업) 형태의 알림창을 만들기 위한 컴포넌트
// Portal : 모달 같은 요소를 루트(root DOM) 바깥에 그려서 레이아웃 충돌을 피하는 것

import Portal from "../components/portal/portal";

const Alert = ({ onClose }: { onClose: () => void }) => {
  return (
    <Portal>
      {/* 배경 */}
      <div
        className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center"
        onClick={onClose}
      >
        {/* 모달 박스 */}
        <div
          className="relative w-[320px] bg-white rounded-xl shadow-xl p-6"
          onClick={(e) => e.stopPropagation()}
        >
          {/* 닫기 버튼 */}
          <button
            onClick={onClose}
            className="absolute top-3 right-3 text-gray-500 hover:text-black text-xl"
            aria-label="닫기"
          >
            ✕
          </button>

          {/* 내용 */}
          <div className="text-center text-lg font-semibold text-gray-800">
            모달 팝업 창입니다.
          </div>
        </div>
      </div>
    </Portal>
  );
};

export default Alert;
