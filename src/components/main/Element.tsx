import { invoke } from "@tauri-apps/api/tauri";
import { ElementProps } from "../../types";

const Element = ({ file, setFiles }: ElementProps) => {
  const formatFileSize = (size: string) => {
    const bytes = parseInt(size);
    if (bytes < 1024) {
      return "1 KB";
    }
    switch (bytes) {
      case 0:
        return "";
      default:
        const k = 1024;
        const dm = 2;
        const sizes = ["KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return (
          parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i]
        );
    }
  };
  const handleDoubleClick = () => {
    if (file.file_type !== "directory") {
      invoke("open_file", {
        path: file.file_path,
      });
    } else {
      invoke("open_directory", {
        path: file.file_path,
      }).then((result) => {
        if (
          Array.isArray(result) &&
          result.every((item) => typeof item === "object" && item !== null)
        ) {
          setFiles(result);
        }
      });
    }
  };
  return (
    <div
      onDoubleClick={handleDoubleClick}
      className="flex gap-2 border-b-[1px] border-white text-sm"
    >
      <div className="flex flex-col gap-2 w-full">
        <div className="flex justify-between">
          <p>{file.file_name}</p>
          <p>{file.file_modified}</p>
        </div>
        <div className="flex w-full justify-between">
          <p>{file.file_path}</p>
          <p>{formatFileSize(file.file_size)}</p>
        </div>
      </div>
    </div>
  );
};

export default Element;
