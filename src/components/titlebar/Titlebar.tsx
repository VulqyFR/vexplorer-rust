import { listen } from "@tauri-apps/api/event";
import { appWindow } from "@tauri-apps/api/window";
import { useEffect, useState } from "react";
import Add from "../icons/Add";
import Close from "../icons/Close";
import Maximize from "../icons/Maximize";
import Minimize from "../icons/Minimize";
import Restore from "../icons/Restore";

const Titlebar = () => {
  const [isMaximized, setIsMaximized] = useState(false);

  /* 
    Function to handle the maximize button click event
    and toggle the window between maximized and unmaximized states
  */
  const handleMaximize = () => {
    appWindow.isMaximized().then((maximized) => {
      if (maximized) {
        appWindow.unmaximize();
      } else {
        appWindow.maximize();
      }
    });
  };

  /* 
    Function to update the maximized state of the window
    and set it to the state variable isMaximized
  */
  const updateMaximizedState = () => {
    appWindow.isMaximized().then((maximized) => {
      setIsMaximized(maximized);
    });
  };

  /* 
    UseEffect hook to listen for the resize event
    and update the maximized state of the window
    cleanup remove the event listener on unmount
  */
  useEffect(() => {
    updateMaximizedState();
    const unlistenMaximize = listen("tauri://resize", updateMaximizedState);
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
          {isMaximized ? <Restore /> : <Maximize />}
        </a>
        <a className="ml-[-0.25rem]" onClick={() => appWindow.close()}>
          <Close />
        </a>
      </div>
    </div>
  );
};

export default Titlebar;
