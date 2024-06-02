import { invoke } from "@tauri-apps/api/tauri";
import { useEffect, useRef, useState } from "react";
import { FileMetadata } from "../../types";
import Element from "./Element";
import ContextMenu from "./ElementContextMenu";

const ElementList = ({
  files,
  setFiles,
  setPath,
  activeElement,
  setActiveElement,
  path,
}: {
  files: Array<FileMetadata>;
  path: string;
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
    selectedFile: FileMetadata | null;
  }>({ visible: false, x: 0, y: 0, elementId: null, selectedFile: null });
  const [rename, setRenameFile] = useState<{
    inputValue: string;
    renaming: boolean;
  }>({ inputValue: "", renaming: false });

  /* Event listener for keyboard shortcuts */
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case "c":
          if (activeElement !== null) {
            let c_path = files[activeElement].file_path;
            if (e.ctrlKey) {
              invoke("file_operation", { path: c_path, operation: "Copy" });
            }
          }
          break;
        case "v":
          if (e.ctrlKey) {
            console.log("Paste");
            try {
              invoke("file_operation", {
                operation: "Paste",
                path: path,
              }).then(() => {
                invoke("open_directory", { path: path }).then((result) => {
                  if (
                    Array.isArray(result) &&
                    result.every(
                      (item) => typeof item === "object" && item !== null
                    )
                  ) {
                    setFiles(result);
                  }
                });
              });
            } catch (error) {
              console.error(error);
            }
          }
          break;
        default:
          break;
      }
    };

    window.addEventListener("keydown", onKeyDown);

    // Remove event listener on cleanup
    return () => {
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [activeElement, files]);
  return (
    <div ref={parentRef} className="relative">
      {contextMenu.visible && (
        <ContextMenu
          x={contextMenu.x}
          y={contextMenu.y}
          selectedFile={contextMenu.selectedFile}
          setContextMenu={setContextMenu}
          setRenameFile={setRenameFile}
          setFiles={setFiles}
          setPath={setPath}
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
              path={path}
              parentRef={parentRef}
              contextMenu={contextMenu}
              setRenameFile={setRenameFile}
              activeElement={activeElement}
              setActiveElement={setActiveElement}
              setPath={setPath}
              key={index}
              file={file}
              setFiles={setFiles}
              rename={rename}
              setContextMenu={setContextMenu}
              onContextMenu={(e) => {
                e.preventDefault();
                if (!contextMenu.visible || contextMenu.elementId !== index) {
                  setContextMenu({
                    visible: true,
                    x: e.pageX,
                    y: e.pageY,
                    elementId: index,
                    selectedFile: file,
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
