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
    setInputPath(path);
  }, [path]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (path === "") {
          setFiles([]);
        } else {
          const result = await invoke<Array<FileMetadata>>("open_directory", {
            path,
          });
          if (
            Array.isArray(result) &&
            result.every((item) => typeof item === "object" && item !== null)
          ) {
            setFiles(result);
            setInputPath(path);
            console.log(inputPath);
            console.log(path);
          }
        }
      } catch (error) {
        throw error;
      }
    };

    fetchData();

    if (path !== "" && !paths.includes(path)) {
      setPaths((prevPaths) => [...prevPaths, path]);
    }
  }, [path, search, setFiles, setInputPath, setPaths, paths]);

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      setPath(inputPath);
    }
  };

  return (
    <input
      value={inputPath}
      onChange={(e) => setInputPath(e.target.value)}
      onKeyDown={handleKeyDown}
      className="w-full h-8 flex justify-start items-center rounded-md px-2 bg-[#212121]"
    />
  );
};

export default Path;
