function Loader() {
  return (
    <div className="flex flex-col items-center justify-center py-16">
      <div className="relative">
        <div className="animate-spin rounded-full h-16 w-16 border-4 border-blue-200"></div>
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-600 absolute top-0 left-0"></div>
      </div>
      <p className="mt-4 text-sm text-gray-500 font-medium">Loading...</p>
    </div>
  );
}

export default Loader;

