export default function NotFoundPage() {
  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="text-center px-6 py-12 bg-white rounded-2xl shadow-xl">
        <h1 className="text-6xl font-bold text-gray-800 mb-4">404</h1>
        <p className="text-xl text-gray-600 mb-6">페이지를 찾을 수 없습니다.</p>
        <p className="text-sm text-gray-500 mb-8">
          요청하신 페이지가 사라졌거나, 주소가 잘못되었어요.
        </p>
        <a
          href="/"
          className="inline-block px-6 py-3 bg-blue-500 text-white rounded-xl hover:bg-blue-600 transition"
        >
          홈으로 돌아가기
        </a>
      </div>
    </div>
  );
}
