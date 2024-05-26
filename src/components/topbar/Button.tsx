type ButtonProps = {
  onClick: () => void;
  children: React.ReactNode;
  className?: string;
} & React.ComponentPropsWithoutRef<"button">;

const Button = ({
  onClick,
  children,
  className,
  disabled,
  ...props
}: ButtonProps) => {
  return (
    <button
      className={`hover:bg-[#212121] w-8 h-8 rounded-md flex items-center justify-center ${className} ${
        disabled ? "opacity-50" : ""
      }`}
      onClick={onClick}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
