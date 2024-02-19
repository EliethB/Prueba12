export const SelectComponent = ({
  optionsSelect,
  selectedCategory,
  setSelectedCategory,
}) => {
  const handleChange = (event) => {
    setSelectedCategory(event.target.value);
  };
  return (
    <div>
      <select
        value={selectedCategory}
        onChange={handleChange}
        className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-blue-500"
      >
        {optionsSelect.map((option, index) => (
          <option key={index} value={option.id}>
            {option.nameCategory}
          </option>
        ))}
      </select>
    </div>
  );
};
