import { listen } from "@tauri-apps/api/event";
import { appWindow } from "@tauri-apps/api/window";
import { useEffect, useState } from "react";
import Add from "../icons/Add";
import Close from "../icons/Close";
import Maximize from "../icons/Maximize";
import Minimize from "../icons/Minimize";

const Titlebar = () => {
  const [isMaximized, setIsMaximized] = useState(false);

  const handleMaximize = () => {
    appWindow.isMaximized().then((maximized) => {
      if (maximized) {
        appWindow.unmaximize();
      } else {
        appWindow.maximize();
      }
    });
  };

  const updateMaximizedState = () => {
    appWindow.isMaximized().then((maximized) => {
      setIsMaximized(maximized);
    });
  };

  useEffect(() => {
    // Check initial window state
    updateMaximizedState();

    // Listen for window maximize/unmaximize events
    const unlistenMaximize = listen("tauri://resize", updateMaximizedState);

    // Cleanup event listener on component unmount
    return () => {
      unlistenMaximize.then((unlisten: any) => unlisten());
    };
  }, []);

  return (
    <div className="flex justify-between items-center px-2 pt-2">
      <div
        className="flex items-center w-full"
        onMouseDown={() => appWindow.startDragging()}
      >
        <div className="flex justify-between items-center bg-[rgba(27,27,27,0.95)] w-[200px] pl-8 pr-4 pb-2 rounded-t-[10px]">
          <h1 className="pt-2">Home</h1>
          <div className="pt-2">
            <Close />
          </div>
        </div>
        <div className="pl-2">
          <Add />
        </div>
      </div>
      <div className="flex gap-4 items-center pb-2">
        <a className="pb-[2px]" onClick={() => appWindow.minimize()}>
          <Minimize />
        </a>
        <a onClick={handleMaximize}>
          {isMaximized ? <p>Minimize</p> : <Maximize />}
        </a>
        <a onClick={() => appWindow.close()}>
          <Close />
        </a>
      </div>
    </div>
  );
};

export default Titlebar;
