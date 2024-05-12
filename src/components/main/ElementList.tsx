import { ElementListProps } from "../../types";
import Element from "./Element";

const ElementList = ({ files }: ElementListProps) => {
  return (
    <>
      <div className="flex flex-col gap-4 py-2">
        {files.map((file) => (
          <Element file={file} />
        ))}
      </div>
    </>
  );
};

export default ElementList;
