export const Search = ({ setSearchByCategory }) => {
  const handleChange = (e) => {
    setSearchByCategory(e.target.value);
  };
  return (
    <div className="relative">
      <input
        type="text"
        className="block w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
        placeholder="Filter by category..."
        onChange={handleChange}
      />
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <img src="./assets/search.svg" className="w-6 h-6" alt="search" />
      </div>
    </div>
  );
};
