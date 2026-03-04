const Input = ({ className = "", ...props }) => {
  return (
    <input
      {...props}
      className={`w-full p-2 m-1 rounded-lg border border-gray-300 
      focus:ring-2 focus:ring-indigo-500 outline-none 
      dark:bg-neutral-900 dark:border-neutral-700 ${className}`}
    />
  );
};

export default Input;