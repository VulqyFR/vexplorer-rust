import { useEffect, useState } from "react";
import { TopbarProps } from "../../types";
import Filter from "../icons/Filter";
import Next from "../icons/Next";
import Previous from "../icons/Previous";
import View from "../icons/View";
import Button from "./Button";
import Path from "./Path";
import Searchbar from "./Searchbar";

const Topbar = ({
  setPath,
  setFiles,
  files,
  path,
  paths,
  setPaths,
}: TopbarProps) => {
  const [search, setSearch] = useState("");
  const [currentIndex, setCurrentIndex] = useState(paths.length - 1);

  useEffect(() => {
    if (path === paths[currentIndex]) {
      return;
    }

    setCurrentIndex(paths.length - 1);
  }, [paths]);

  const previousPath = () => {
    if (currentIndex > 0) {
      const newIndex = currentIndex - 1;
      setCurrentIndex(newIndex);
      setPath(paths[newIndex]);
    }
  };

  const nextPath = () => {
    if (currentIndex >= paths.length - 1) {
      return;
    }
    const newIndex = currentIndex + 1;
    setCurrentIndex(newIndex);
    setPath(paths[newIndex]);
  };

  const handleFilter = () => {
    //TODO implement filter
  };

  const handleView = () => {
    //TODO implement view
  };

  return (
    <div className="flex items-center gap-4 px-1 p-4 border-b-[1px] border-[#4D4D4D] bg-[rgba(27,27,27,0.95)]">
      <div className="flex">
        <div className="ml-4">
          <Button onClick={previousPath} disabled={currentIndex <= 0}>
            <Previous />
          </Button>
        </div>
        <Button onClick={nextPath} disabled={currentIndex >= paths.length - 1}>
          <Next />
        </Button>
        <Button onClick={handleFilter}>
          <Filter />
        </Button>
        <Button onClick={handleView}>
          <View />
        </Button>
      </div>
      <Path
        setPath={setPath}
        path={path}
        search={search}
        setFiles={setFiles}
        setPaths={setPaths}
        paths={paths}
      />
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
