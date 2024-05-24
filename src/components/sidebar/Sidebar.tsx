import Link from "./Link";

const Sidebar = ({
  setPath,
  setActiveElement,
  user,
}: {
  setPath: (currentPath: string) => void;
  setActiveElement: (index: number | null) => void;
  user: string;
}) => {
  return (
    <div className="flex gap-4 py-2 mx-2 my-[-1rem] h-full">
      <div className="flex flex-col gap-2">
        <div className="pt-2">
          <Link
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
            onClick={() => {
              setPath(`C:\\Users\\${user}\\Desktop`);
              setActiveElement(null);
            }}
          >
            Desktop
          </Link>
          <Link
            onClick={() => {
              setPath(`C:\\Users\\${user}\\Downloads`);
              setActiveElement(null);
            }}
          >
            Downloads
          </Link>
          <Link
            onClick={() => {
              setPath(`C:\\Users\\${user}\\Documents`);
              setActiveElement(null);
            }}
          >
            Documents
          </Link>
          <Link
            onClick={() => {
              setPath(`C:\\Users\\${user}\\Music`);
              setActiveElement(null);
            }}
          >
            Music
          </Link>
          <Link
            onClick={() => {
              setPath(`C:\\Users\\${user}\\Pictures`);
              setActiveElement(null);
            }}
          >
            Pictures
          </Link>
          <Link
            onClick={() => {
              setPath(`C:\\Users\\${user}\\Videos`);
              setActiveElement(null);
            }}
          >
            Videos
          </Link>
        </div>
        <div>
          <Link
            onClick={() => {
              setPath("C:\\");
              setActiveElement(null);
            }}
          >
            This PC
          </Link>
        </div>
      </div>
      <div className="border-r-[1px] border-[#4D4D4D]"></div>
    </div>
  );
};

export default Sidebar;
