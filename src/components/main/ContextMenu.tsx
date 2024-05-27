interface ContextMenuProps {
  setContextMenu: React.Dispatch<
    React.SetStateAction<{
      visible: boolean;
      x: number;
      y: number;
      elementId: number | null;
    }>
  >;
  x: number;
  y: number;
}

const ContextMenu: React.FC<ContextMenuProps> = ({ setContextMenu, x, y }) => {
  return (
    <div
      style={{
        position: "absolute",
        top: y,
        left: x,
        backgroundColor: "black",
      }}
    >
      <ul className="list-none">
        <li className="text-white">Open</li>
        <li className="text-white">Rename</li>
        <li className="text-white">Delete</li>
      </ul>
    </div>
  );
};

export default ContextMenu;
