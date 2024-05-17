import { useState } from "react";
import { TopbarProps } from "../../types";
import Filter from "../icons/Filter";
import Next from "../icons/Next";
import Previous from "../icons/Previous";
import View from "../icons/View";
import Button from "./Button";
import Path from "./Path";
import Searchbar from "./Searchbar";

const Topbar = ({ setPath, setFiles, files, path }: TopbarProps) => {
  const [search, setSearch] = useState("");
  const previousPath = () => {
    console.log("Previous Path");
  };
  return (
    <div className="flex items-center gap-4 px-1 p-4 border-b-[1px] border-[#4D4D4D] bg-[rgba(27,27,27,0.95)]">
      <div className="flex">
        <div className="ml-4">
          <Button onClick={previousPath}>
            <Previous />
          </Button>
        </div>
        <Button onClick={previousPath}>
          <Next />
        </Button>
        <Button onClick={previousPath}>
          <Filter />
        </Button>
        <Button onClick={previousPath}>
          <View />
        </Button>
      </div>
      <Path setPath={setPath} path={path} search={search} setFiles={setFiles} />
      <Searchbar
        path={path}
        setSearch={setSearch}
        setFiles={setFiles}
        files={files}
      />
    </div>
  );
};

export default Topbar;
