export const LpCardSkeletonList = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array.from({ length: 6 }).map((_, index) => (
        <div
          key={index}
          className="bg-[#2A2A2A] rounded-lg overflow-hidden animate-pulse-custom"
        >
          <div className="p-4">
            <div className="flex items-center space-x-4">
              <div className="w-8 h-8 rounded-full bg-gray-600"></div>
              <div className="flex-1">
                <div className="h-4 bg-gray-600 rounded w-3/4"></div>
                <div className="h-3 bg-gray-600 rounded w-1/2 mt-2"></div>
              </div>
            </div>
            <div className="mt-4 aspect-square bg-gray-600 rounded-lg"></div>
            <div className="mt-4 flex justify-center">
              <div className="h-8 bg-gray-600 rounded-full w-24"></div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
