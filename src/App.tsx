import { useState } from "react";
import "./App.css";
import ElementList from "./components/main/ElementList";
import Sidebar from "./components/sidebar/Sidebar";
import Topbar from "./components/topbar/Topbar";
import { FileMetadata } from "./types";

function App() {
  const [files, setFiles] = useState<Array<FileMetadata>>([]);
  const [path, setPath] = useState<string>("C:\\");
  //const [user, setUser] = useState<string>("");

  return (
    <>
      <Topbar path={path} setFiles={setFiles} files={files} />
      <div className="h-full flex">
        <div className="sticky top-0 h-screen">
          <Sidebar setPath={setPath} />
        </div>
        <div className="flex-grow overflow-auto pr-2">
          <ElementList files={files} />
        </div>
      </div>
    </>
  );
}

export default App;
