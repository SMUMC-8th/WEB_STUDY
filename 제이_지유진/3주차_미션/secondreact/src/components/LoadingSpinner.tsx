export default function LoadingSpinner() {
  return (
    <div className="flex justify-center items-center h-dvh">
      <div
        className="size-12 animate-spin rounded-full border-4 border-white border-t-transparent"
        role="status"
      >
        <span className="sr-only">로딩 중...</span>
      </div>
    </div>
  );
}
