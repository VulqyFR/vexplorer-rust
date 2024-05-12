type ButtonProps = {
  onClick: () => void;
  children: React.ReactNode;
};

const Button = ({ onClick, children }: ButtonProps) => {
  return (
    <button
      className="hover:bg-[#212121] w-8 h-8 rounded-md flex items-center justify-center"
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;
