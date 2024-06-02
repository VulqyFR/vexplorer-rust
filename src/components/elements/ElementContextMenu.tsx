import { invoke } from "@tauri-apps/api/tauri";
import React from "react";
import { FileMetadata } from "../../types";

interface ContextMenuProps {
  setContextMenu: React.Dispatch<
    React.SetStateAction<{
      visible: boolean;
      x: number;
      y: number;
      elementId: number | null;
      selectedFile: FileMetadata | null;
    }>
  >;
  x: number;
  y: number;
  selectedFile: FileMetadata | null;
  setPath: React.Dispatch<React.SetStateAction<string>>;
  setFiles: React.Dispatch<React.SetStateAction<FileMetadata[]>>;
  setRenameFile: React.Dispatch<
    React.SetStateAction<{
      inputValue: string;
      renaming: boolean;
    }>
  > | null;
}

const ContextMenu: React.FC<ContextMenuProps> = ({
  x,
  y,
  selectedFile,
  setPath,
  setFiles,
  setRenameFile,
}) => {
  /*
   * Event handlers for context menu options
   */
  const handleOpen = () => {
    if (selectedFile) {
      if (selectedFile.file_type !== "Directory") {
        invoke("open_file", {
          path: selectedFile.file_path,
        });
        return;
      }
      invoke("open_directory", {
        path: selectedFile.file_path,
      }).then((result) => {
        if (
          Array.isArray(result) &&
          result.every((item) => typeof item === "object" && item !== null)
        ) {
          setFiles(result);
          setPath(selectedFile.file_path);
        }
      });
    }
  };

  const handleCopy = () => {
    if (selectedFile) {
      invoke("file_operation", {
        operation: "Copy",
        path: selectedFile.file_path,
      });
    }
  };

  const handleCut = () => {
    if (selectedFile) {
      invoke("file_operation", {
        operation: "Cut",
        path: selectedFile.file_path,
      });
    }
  };

  const handleCreateShortcut = () => {
    if (selectedFile) {
      invoke("file_operation", {
        operation: "Shortcut",
        path: selectedFile.file_path,
      });
    }
  };

  const handleRename = () => {
    if (selectedFile && setRenameFile) {
      setRenameFile({
        inputValue: selectedFile.file_name,
        renaming: true,
      });
    }
  };

  const handleDelete = () => {
    if (selectedFile) {
      invoke("file_operation", {
        operation: "Delete",
        path: selectedFile.file_path,
      });
      setFiles((prev) =>
        prev.filter((file) => file.file_path !== selectedFile.file_path)
      );
    }
  };
  return (
    <div
      style={{
        position: "absolute",
        top: y,
        left: x,
      }}
      className="bg-[#1A1A1A] opacity-90 p-2 rounded-md shadow-md z-10 border border-[#4D4D4D] min-w-48"
    >
      <ul className="list-none">
        <li
          onClick={handleOpen}
          className="text-white flex justify-between items-center px-4 pt-1"
        >
          <a className="cursor-pointer">Open</a>
          <p className="text-xs text-[#A1A1A1]">Enter</p>
        </li>
        <li
          onClick={handleOpen}
          className="text-white flex justify-between items-center px-4 pb-1"
        >
          <a className="cursor-pointer">Open with</a>
        </li>
        <li
          onClick={handleCopy}
          className="text-white flex justify-between items-center border-t-[0.5px] border-[#4D4D4D] px-4 pt-1"
        >
          <a className="cursor-pointer">Copy</a>
          <p className="text-xs text-[#A1A1A1]">Ctrl + C</p>
        </li>
        <li
          onClick={handleCut}
          className="text-white flex justify-between items-center px-4 pb-2"
        >
          <a className="cursor-pointer">Cut</a>
          <p className="text-xs text-[#A1A1A1]">Ctrl + X</p>
        </li>
        <li
          onClick={handleCreateShortcut}
          className="text-white border-t-[0.5px] border-[#4D4D4D] px-4 pt-1"
        >
          <a className="cursor-pointer">Create shortcut</a>
        </li>
        <li
          onClick={handleRename}
          className="text-white flex justify-between items-center px-4"
        >
          <a className="cursor-pointer">Rename</a>
          <p className="text-xs text-[#A1A1A1]">F2</p>
        </li>
        <li
          onClick={handleDelete}
          className="text-white flex justify-between items-center px-4 pb-1"
        >
          <a className="cursor-pointer">Delete</a>
          <p className="text-xs text-[#A1A1A1]">Ctrl + D</p>
        </li>
        <li className="text-white flex justify-between items-center px-4 pb-2 border-t-[0.5px] border-[#4D4D4D] pt-1">
          <a>Properties</a>
        </li>
      </ul>
    </div>
  );
};

export default ContextMenu;
