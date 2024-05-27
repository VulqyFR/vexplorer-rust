import { invoke } from "@tauri-apps/api/tauri";
import { useEffect } from "react";
import { FileMetadata } from "../../types";

const Element = ({
  index,
  file,
  setFiles,
  setPath,
  activeElement,
  setActiveElement,
  setContextMenu,
  parentRef,
}: {
  index: number;
  file: FileMetadata;
  setFiles: React.Dispatch<React.SetStateAction<FileMetadata[]>>;
  setPath: React.Dispatch<React.SetStateAction<string>>;
  activeElement: number | null;
  setActiveElement: React.Dispatch<React.SetStateAction<number | null>>;
  onContextMenu: (e: React.MouseEvent) => void;
  setContextMenu: React.Dispatch<
    React.SetStateAction<{
      visible: boolean;
      x: number;
      y: number;
      elementId: number | null;
    }>
  >;
  parentRef: React.RefObject<HTMLDivElement>;
  contextMenu: {
    visible: boolean;
    x: number;
    y: number;
    elementId: number | null;
  };
}) => {
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (e.button === 0) {
        setContextMenu((prevState) => ({ ...prevState, visible: false }));
      }
    };
    window.addEventListener("click", handleClick);

    return () => {
      window.removeEventListener("click", handleClick);
    };
  }, []);

  const formatFileSize = (size: string) => {
    let bytes = parseInt(size);
    if (isNaN(bytes)) {
      return "";
    }
    if (bytes === 0) {
      return "";
    } else if (bytes < 1024) {
      return "1 KB";
    }
    const k = 1024;
    const dm = 2;
    const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    bytes = parseFloat((bytes / Math.pow(k, i)).toFixed(dm));
    return bytes + " " + sizes[i];
  };

  const handleDoubleClick = () => {
    if (file.file_type !== "Directory") {
      invoke("open_file", {
        path: file.file_path,
      });
      return;
    }
    invoke("open_directory", {
      path: file.file_path,
    }).then((result) => {
      if (
        Array.isArray(result) &&
        result.every((item) => typeof item === "object" && item !== null)
      ) {
        setFiles(result);
        setPath(file.file_path);
      }
    });
  };

  const formatFileType = (type: string) => {
    if (type === null) {
      return "Unknown";
    }

    let formattedType =
      type.charAt(0).toUpperCase() + type.slice(1).toLowerCase();

    switch (formattedType) {
      case "Directory":
        return "File folder";
      case "Lnk":
        return "Shortcut";
      default:
        return formattedType;
    }
  };

  return (
    <>
      <tr
        onDoubleClick={handleDoubleClick}
        onClick={() => {
          setActiveElement && setActiveElement(index);
        }}
        onContextMenu={(e) => {
          e.preventDefault();
          const parentBounds = parentRef.current?.getBoundingClientRect();
          if (parentBounds) {
            setContextMenu({
              visible: true,
              x: e.pageX - parentBounds.left,
              y: e.pageY - parentBounds.top,
              elementId: index,
            });
          }
        }}
        className={`cursor-pointer ${
          activeElement === index ? "bg-[#4D4D4D]" : ""
        }`}
      >
        <td className="file-icon">
          {file.file_icon ? (
            <img
              className="w-5 h-5"
              src={`data:image/png;base64,${file.file_icon} `}
              alt="File Icon"
              onError={(e) => {
                console.error("Failed to load icon:", e);
                (e.target as HTMLImageElement).style.display = "none";
              }}
            />
          ) : (
            <span>.</span>
          )}
        </td>
        <td className="text-ellipsis overflow-hidden text-sm">
          {file.file_name}
        </td>
        <td className="text-ellipsis overflow-hidden text-sm">
          {file.file_modified}
        </td>
        <td className="text-ellipsis overflow-hidden text-sm">
          {formatFileType(file.file_type)}
        </td>
        <td className="text-ellipsis overflow-hidden text-sm">
          {formatFileSize(file.file_size)}
        </td>
      </tr>
    </>
  );
};

export default Element;
