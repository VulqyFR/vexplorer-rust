const Link = ({
  children,
  onClick,
  icon,
}: {
  children: React.ReactNode;
  onClick: () => void;
  icon?: React.ReactNode;
}) => {
  return (
    <div
      onClick={onClick}
      className="flex w-full items-center justify-left hover:cursor-pointer hover:bg-[#4D4D4D] rounded-[5px] px-6 py-2 select-none text-xs gap-2"
    >
      {icon}
      {children}
    </div>
  );
};

export default Link;
