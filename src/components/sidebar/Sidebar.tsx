import { Volume } from "../../types";
import Computer from "../icons/Computer";
import Desktop from "../icons/Desktop";
import Disk from "../icons/Disk";
import Documents from "../icons/Documents";
import Download from "../icons/Download";
import Home from "../icons/Home";
import Music from "../icons/Music";
import Pictures from "../icons/Pictures";
import Videos from "../icons/Videos";
import Link from "./Link";

const Sidebar = ({
  setPath,
  setActiveElement,
  user,
  volumes,
}: {
  setPath: (currentPath: string) => void;
  setActiveElement: (index: number | null) => void;
  user: string;
  volumes: Array<Volume>;
}) => {
  const formatVolumeName = (volumeName: string) => {
    return volumeName.slice(0, volumeName.length - 1).toUpperCase();
  };
  return (
    <div className="flex gap-2 py-2 ml-1 my-[-1rem] h-full">
      <div className="flex flex-col gap-2">
        <div className="pt-2 flex gap-2 justify-center items-center">
          <Link
            icon={Home()}
            onClick={() => {
              setPath("");
              setActiveElement(null);
            }}
          >
            Home
          </Link>
        </div>
        <div className="py-2 border-y-[1px] border-[#4D4D4D] flex flex-col">
          <Link
            icon={Desktop()}
            onClick={() => {
              setPath(`C:\\Users\\${user}\\Desktop`);
              setActiveElement(null);
            }}
          >
            Desktop
          </Link>
          <Link
            icon={Download()}
            onClick={() => {
              setPath(`C:\\Users\\${user}\\Downloads`);
              setActiveElement(null);
            }}
          >
            Downloads
          </Link>
          <Link
            icon={Documents()}
            onClick={() => {
              setPath(`C:\\Users\\${user}\\Documents`);
              setActiveElement(null);
            }}
          >
            Documents
          </Link>
          <Link
            icon={Music()}
            onClick={() => {
              setPath(`C:\\Users\\${user}\\Music`);
              setActiveElement(null);
            }}
          >
            Music
          </Link>
          <Link
            icon={Pictures()}
            onClick={() => {
              setPath(`C:\\Users\\${user}\\Pictures`);
              setActiveElement(null);
            }}
          >
            Pictures
          </Link>
          <Link
            icon={Videos()}
            onClick={() => {
              setPath(`C:\\Users\\${user}\\Videos`);
              setActiveElement(null);
            }}
          >
            Videos
          </Link>
        </div>
        <div>
          <ul>
            <li className="gap-2 flex items-center text-xs px-6 py-[6px] hover:cursor-pointer hover:bg-[#4D4D4D] rounded-[5px]">
              <Computer />
              <p>This PC</p>
            </li>
            {volumes.map((volume, index) => (
              <li
                key={index}
                className="flex gap-2 items-center pl-8 pr-4 py-[6px] hover:cursor-pointer hover:bg-[#4D4D4D] rounded-[5px]"
              >
                <Disk />
                <p
                  className="text-xs "
                  onClick={() => {
                    setPath(volume.mount_point);
                    setActiveElement(null);
                  }}
                >
                  {volume.name} &#40;
                  {formatVolumeName(volume.mount_point)}&#41;
                </p>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="border-r-[1px] border-[#4D4D4D]"></div>
    </div>
  );
};

export default Sidebar;
