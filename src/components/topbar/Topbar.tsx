import { useState } from "react";
import { TopbarProps } from "../../types";
import Button from "./Button";
import Path from "./Path";
import Searchbar from "./Searchbar";

const Topbar = ({ setFiles, files, path }: TopbarProps) => {
  const [search, setSearch] = useState("");
  const previousPath = () => {
    console.log("Previous Path");
  };
  return (
    <div className="flex items-center gap-2 px-1 p-4 border-b-[1px] border-[#4D4D4D]">
      <div className="flex">
        <div className="ml-4">
          <Button onClick={previousPath}>P</Button>
        </div>
        <Button onClick={previousPath}>N</Button>
        <Button onClick={previousPath}>S</Button>
        <Button onClick={previousPath}>V</Button>
      </div>
      <Path path={path} search={search} setFiles={setFiles} />
      <Searchbar setSearch={setSearch} setFiles={setFiles} files={files} />
    </div>
  );
};

export default Topbar;
