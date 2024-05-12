import { invoke } from "@tauri-apps/api";
import { useEffect, useState } from "react";
import "./App.css";
import ElementList from "./components/main/ElementList";
import Sidebar from "./components/sidebar/Sidebar";
import Topbar from "./components/topbar/Topbar";
import { FileMetadata } from "./types";

function App() {
  const [files, setFiles] = useState<Array<FileMetadata>>([]);
  const [path, setPath] = useState<string>("");
  const [user, setUser] = useState<string>("");
  useEffect(() => {
    invoke("get_user").then((user) => {
      setUser(user as string);
    });
  }, []);
  return (
    <>
      <Topbar setPath={setPath} path={path} setFiles={setFiles} files={files} />
      <div className="h-full flex">
        <div className="sticky top-0 h-screen">
          <Sidebar user={user} setPath={setPath} />
        </div>
        <div className="flex-grow overflow-auto pr-2">
          <ElementList setFiles={setFiles} files={files} />
        </div>
      </div>
    </>
  );
}

export default App;
