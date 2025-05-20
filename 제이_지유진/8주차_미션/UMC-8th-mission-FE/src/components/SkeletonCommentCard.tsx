// components/SkeletonCommentCard.tsx
function SkeletonCommentCard() {
  return (
    <div className="bg-gray-700 p-4 rounded shadow animate-pulse">
      <div className="h-4 bg-gray-600 mb-2 rounded" />
      <div className="h-4 bg-gray-600 w-1/2 rounded" />
    </div>
  );
}

export default SkeletonCommentCard;
