import { invoke } from "@tauri-apps/api/tauri";
import { FileMetadata, SearchbarProps } from "../../types";

const Searchbar = ({ setFiles, setSearch }: SearchbarProps): JSX.Element => {
  const handleInputChange = (
    e: React.KeyboardEvent<HTMLInputElement>
  ): void => {
    if (e.key === "Enter") {
      if (e.currentTarget.value === "") {
        setFiles([]);
      } else {
        invoke<Array<FileMetadata>>("search_directory", {
          path: "C:\\",
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
    }
  };

  return (
    <input
      onChange={(e) => setSearch(e.target.value)}
      type="text"
      className="bg-[#212121] px-2 rounded-md h-8 searchbar focus:outline-none focus:ring-1 focus:ring-[#4D4D4D]"
      onKeyDown={handleInputChange}
    />
  );
};

export default Searchbar;
