import { invoke } from "@tauri-apps/api/tauri";
import { useEffect, useState } from "react";
import { FileMetadata, PathProps } from "../../types";

const Path = ({
  path,
  search,
  setFiles,
  setPath,
  setPaths,
  paths,
}: PathProps) => {
  const [inputPath, setInputPath] = useState(path);

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
        throw error;
      });
  }, [path, search, setFiles]);

  useEffect(() => {
    if (path !== "" && !paths.includes(path)) {
      setPaths((prevPaths) => [...prevPaths, path]);
    }
  }, [path, paths, setPaths]);

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === "Enter") {
      setPath(inputPath);
    }
  };

  return (
    <>
      <input
        value={path}
        onChange={(e) => {
          setInputPath(e.target.value);
        }}
        onKeyDown={handleKeyDown}
        className="w-full h-8 flex justify-start items-center rounded-md px-2 bg-[#212121]"
      />
    </>
  );
};

export default Path;
