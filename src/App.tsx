import { invoke } from "@tauri-apps/api";
import { appWindow } from "@tauri-apps/api/window";
import { useEffect, useState } from "react";
import "./App.css";
import ElementList from "./components/elements/ElementList";
import Sidebar from "./components/sidebar/Sidebar";
import TitleBar from "./components/titlebar/Titlebar";
import Topbar from "./components/topbar/Topbar";
import { FileMetadata, Volume } from "./types";

function App() {
  const [files, setFiles] = useState<Array<FileMetadata>>([]);
  const [path, setPath] = useState<string>("");
  const [paths, setPaths] = useState<string[]>([""]);
  const [user, setUser] = useState<string>("");
  const [activeElement, setActiveElement] = useState<number | null>(null);
  const [volumes, setVolumes] = useState<Array<Volume>>([]);
  useEffect(() => {
    window.onload = async () => {
      await appWindow.setDecorations(true);
    };
    invoke("get_user").then((user) => {
      setUser(user as string);
    });
    invoke("get_volumes").then((volumes) => {
      setVolumes(volumes as Array<Volume>);
      console.log(volumes);
    });
  }, []);
  return (
    <>
      <TitleBar />
      <Topbar
        setPaths={setPaths}
        paths={paths}
        setPath={setPath}
        path={path}
        setFiles={setFiles}
        files={files}
      />
      <div className="h-full flex pr-1 py-2">
        <div className="sticky top-0 h-screen">
          <Sidebar
            user={user}
            setPath={setPath}
            setActiveElement={setActiveElement}
            volumes={volumes}
          />
        </div>
        <div className="flex-grow overflow-y-auto pr-2 mb-28 pl-4">
          <ElementList
            setPath={setPath}
            setFiles={setFiles}
            files={files}
            activeElement={activeElement}
            setActiveElement={setActiveElement}
          />
        </div>
      </div>
    </>
  );
}

export default App;
