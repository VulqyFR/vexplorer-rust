import { invoke } from "@tauri-apps/api/tauri";
import { useEffect } from "react";
import { FileMetadata, PathProps } from "../../types";

const Path = ({ path, search, setFiles, setPath }: PathProps) => {
  useEffect(() => {
    if (path === "") {
      setFiles([]);
    }
    invoke<Array<FileMetadata>>("open_directory", {
      path: path,
    })
      .then((result) => {
        if (
          Array.isArray(result) &&
          result.every((item) => typeof item === "object" && item !== null)
        ) {
          setFiles(result);
        }
      })
      .catch((error) => {
        // :D
        throw error;
      });
  }, [path, search, setFiles]);

  return (
    <>
      <input
        value={path}
        onChange={(e) => setPath(e.target.value)}
        className="w-full h-8 flex justify-start items-center rounded-md px-2 bg-[#212121]"
      />
    </>
  );
};

export default Path;
