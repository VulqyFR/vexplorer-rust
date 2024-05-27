import { useRef, useState } from "react";
import { FileMetadata } from "../../types";
import ContextMenu from "./ContextMenu";
import Element from "./Element";

const ElementList = ({
  files,
  setFiles,
  setPath,
  activeElement,
  setActiveElement,
}: {
  files: Array<FileMetadata>;
  setFiles: React.Dispatch<React.SetStateAction<FileMetadata[]>>;
  setPath: React.Dispatch<React.SetStateAction<string>>;
  activeElement: number | null;
  setActiveElement: React.Dispatch<React.SetStateAction<number | null>>;
}) => {
  const parentRef = useRef(null);
  const [contextMenu, setContextMenu] = useState<{
    visible: boolean;
    x: number;
    y: number;
    elementId: number | null;
  }>({ visible: false, x: 0, y: 0, elementId: null });

  return (
    <div ref={parentRef} className="relative">
      {contextMenu.visible && (
        <ContextMenu
          x={contextMenu.x}
          y={contextMenu.y}
          setContextMenu={setContextMenu}
        />
      )}
      <table className="w-full">
        <thead className="text-left">
          <tr className="">
            <th className="w-8 font-normal"></th>
            <th className="max-w-6 font-normal">Name</th>
            <th className="max-w-6 font-normal">Date modified</th>
            <th className="max-w-6 font-normal">Type</th>
            <th className="max-w-6 font-normal">Size</th>
          </tr>
        </thead>
        <tbody className="relative">
          <tr className="border-b-2 border-transparent h-2"></tr>
          {files.map((file, index) => (
            <Element
              index={index}
              parentRef={parentRef}
              activeElement={activeElement}
              setActiveElement={setActiveElement}
              setPath={setPath}
              key={index}
              file={file}
              setFiles={setFiles}
              setContextMenu={setContextMenu}
              contextMenu={contextMenu}
              onContextMenu={(e) => {
                e.preventDefault();
                if (!contextMenu.visible || contextMenu.elementId !== index) {
                  setContextMenu({
                    visible: true,
                    x: e.pageX,
                    y: e.pageY,
                    elementId: index,
                  });
                }
              }}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ElementList;
