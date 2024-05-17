import { SidebarProps } from "../../types";
import Link from "./Link";

const Sidebar = ({ setPath, user }: SidebarProps) => {
  return (
    <div className="flex gap-4 py-2 mx-2 my-[-1rem] h-full">
      <div className="flex flex-col gap-2">
        <div className="pt-2">
          <Link onClick={() => setPath("")}>Home</Link>
        </div>
        <div className="py-2 border-y-[1px] border-[#4D4D4D] flex flex-col">
          <Link onClick={() => setPath(`C:\\Users\\${user}\\Desktop`)}>
            Desktop
          </Link>
          <Link onClick={() => setPath(`C:\\Users\\${user}\\Downloads`)}>
            Downloads
          </Link>
          <Link onClick={() => setPath(`C:\\Users\\${user}\\Documents`)}>
            Documents
          </Link>
          <Link onClick={() => setPath(`C:\\Users\\${user}\\Music`)}>
            Music
          </Link>
          <Link onClick={() => setPath(`C:\\Users\\${user}\\Pictures`)}>
            Pictures
          </Link>
          <Link onClick={() => setPath(`C:\\Users\\${user}\\Videos`)}>
            Videos
          </Link>
        </div>
        <div>
          <Link onClick={() => setPath("C:\\")}>This PC</Link>
        </div>
      </div>
      <div className="border-r-[1px] border-[#4D4D4D]"></div>
    </div>
  );
};

export default Sidebar;
