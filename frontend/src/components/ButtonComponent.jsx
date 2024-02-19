export const ButtonComponent = ({ text, onFuction, colorOutline, bgColor }) => {
  return (
    <button
      className={`outline outline-1 outline-${colorOutline} bg-${bgColor} text-white py-2 px-4 hover:bg-transparent hover:text-black rounded-md`}
      onClick={onFuction}
    >
      {text}
    </button>
  );
};
