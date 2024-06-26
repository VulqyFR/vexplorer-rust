import { invoke } from "@tauri-apps/api/tauri";
import { FileMetadata } from "../../types";
import Search from "../icons/Search";

const Searchbar = ({
  path,
  setFiles,
  setSearch,
}: {
  path: string;
  setFiles: (files: FileMetadata[]) => void;
  setSearch: (search: string) => void;
  files: FileMetadata[];
}): JSX.Element => {
  const handleInputChange = (
    e: React.KeyboardEvent<HTMLInputElement>
  ): void => {
    if (e.key === "Enter" && e.currentTarget.value !== "") {
      invoke<Array<FileMetadata>>("search_directory", {
        path: path,
        query: e.currentTarget.value,
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
    <div className="group flex items-center bg-[#212121] px-2 rounded-md h-8 searchbar focus-within:ring-1 focus-within:ring-[#CCC]">
      <input
        onChange={(e) => setSearch(e.target.value)}
        type="text"
        onKeyDown={handleInputChange}
        className="bg-[#212121] text-[#FFF] w-full h-full px-2 rounded-md focus:outline-none"
      />
      <Search />
    </div>
  );
};

export default Searchbar;
