const SkeletonProduct = () => {
  return (
    <div className="animate-pulse space-y-3">
      <div className="h-64 bg-gray-200 rounded-md" />
      <div className="h-4 bg-gray-200 w-3/4 rounded" />
      <div className="h-4 bg-gray-200 w-1/2 rounded" />
    </div>
  );
};

export default SkeletonProduct;
