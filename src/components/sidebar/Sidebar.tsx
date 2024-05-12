import { SidebarProps } from "../../types";
import Link from "./Link";

const Sidebar = ({ setPath }: SidebarProps) => {
  return (
    <div className="flex gap-4 py-2 mx-2 my-[-0.5rem] h-full">
      <div className="flex flex-col gap-2">
        <div className="pt-2">
          <Link onClick={() => setPath("/home")}>Home</Link>
        </div>
        <div className="py-2 border-y-[1px] border-[#4D4D4D] flex flex-col">
          <Link onClick={() => setPath("C:\\Users\\vulqy\\Desktop")}>
            Desktop
          </Link>
          <Link onClick={() => setPath("/downloads")}>Downloads</Link>
          <Link onClick={() => setPath("/documents")}>Documents</Link>
          <Link onClick={() => setPath("/music")}>Music</Link>
          <Link onClick={() => setPath("/pictures")}>Pictures</Link>
          <Link onClick={() => setPath("/videos")}>Videos</Link>
        </div>
        <div>
          <Link onClick={() => setPath("C:/")}>This PC</Link>
        </div>
      </div>
      <div className="border-r-[1px] border-[#4D4D4D]"></div>
    </div>
  );
};

export default Sidebar;
