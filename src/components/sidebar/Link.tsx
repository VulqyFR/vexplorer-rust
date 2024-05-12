import { LinkProps } from "../../types";

const Link = ({ children, onClick }: LinkProps) => {
  return (
    <div
      onClick={onClick}
      className="flex items-center justify-left hover:cursor-pointer hover:bg-[#4D4D4D] rounded-[5px] px-6 py-2 select-none text-xs"
    >
      {children}
    </div>
  );
};

export default Link;
