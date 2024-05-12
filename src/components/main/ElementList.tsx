import { ElementListProps } from "../../types";
import Element from "./Element";

const ElementList = ({ files, setFiles }: ElementListProps) => {
  return (
    <div className="flex flex-col gap-4 py-2">
      {files.map((file, index) => (
        <Element key={index} file={file} setFiles={setFiles} />
      ))}
    </div>
  );
};

export default ElementList;
