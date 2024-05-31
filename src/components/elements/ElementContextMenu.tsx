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
}

const ContextMenu: React.FC<ContextMenuProps> = ({
  x,
  y,
  selectedFile,
  setPath,
  setFiles,
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

  const handleOpenInNewTab = () => {
    //TODO: implement open in new tab
  };

  const handleCopy = () => {
    if (selectedFile) {
      invoke("copy_file", {
        path: selectedFile.file_path,
      });
    }
  };

  const handleCut = () => {
    if (selectedFile) {
      invoke("cut_file", {
        path: selectedFile.file_path,
      });
    }
  };

  const handleCreateShortcut = () => {
    if (selectedFile) {
      invoke("create_shortcut", {
        path: selectedFile.file_path,
      });
    }
  };

  const handleRename = () => {
    if (selectedFile) {
      invoke("rename_file", {
        path: selectedFile.file_path,
      });
    }
  };

  const handleDelete = () => {
    if (selectedFile) {
      if (selectedFile.file_type === "Directory") {
        invoke("delete_dir", {
          path: selectedFile.file_path,
        });
        setFiles((prev) =>
          prev.filter((file) => file.file_path !== selectedFile.file_path)
        );
        return;
      }
      invoke("delete_file", {
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
      className="bg-[#1A1A1A] opacity-90 p-2 rounded-md shadow-md z-10 border border-[#4D4D4D]"
    >
      <ul className="list-none">
        <li onClick={handleOpen} className="text-white">
          <a className="cursor-pointer">Open</a>
        </li>
        <li onClick={handleOpenInNewTab} className="text-white">
          <a>Open in new tab</a>
        </li>
        <li onClick={handleCopy} className="text-white">
          Copy
        </li>
        <li onClick={handleCut} className="text-white">
          Cut
        </li>
        <li onClick={handleCreateShortcut} className="text-white">
          Create shortcut
        </li>
        <li onClick={handleRename} className="text-white">
          Rename
        </li>
        <li onClick={handleDelete} className="text-white">
          Delete
        </li>
      </ul>
    </div>
  );
};

export default ContextMenu;
