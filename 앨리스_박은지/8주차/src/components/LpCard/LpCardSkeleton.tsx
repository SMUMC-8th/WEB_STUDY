const LpCardSkeleton = () => {
  return (
    <div className="group relative aspect-square overflow-hidden bg-gray-900 animate-pulse">
      <div className="h-full w-full bg-gray-800" />
      <div className="absolute inset-0 bg-black bg-opacity-0">
        <div className="absolute bottom-0 left-0 right-0 p-4">
          <div className="h-4 w-3/4 bg-gray-700 rounded-sm" />
          <div className="flex items-center justify-between mt-1">
            <div className="h-3 w-20 bg-gray-700 rounded-sm" />
            <div className="h-3 w-10 bg-gray-700 rounded-sm" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LpCardSkeleton;
