import { FileMetadata } from "../../types";
import Element from "./Element";

const ElementList = ({
  files,
  setFiles,
  setPath,
}: {
  files: Array<FileMetadata>;
  setFiles: React.Dispatch<React.SetStateAction<FileMetadata[]>>;
  setPath: React.Dispatch<React.SetStateAction<string>>;
}) => {
  return (
    <table className="w-full">
      <thead className="text-left">
        <tr className="">
          <th className="w-8 font-normal"></th>
          <th className="max-w-6 font-normal">Name</th>
          <th className="max-w-6 font-normal">Date modified</th>
          <th className="max-w-6  font-normal">Type</th>
          <th className="max-w-6  font-normal">Size</th>
        </tr>
      </thead>
      <tbody className="">
        <tr className="border-b-2 border-transparent h-2"></tr>
        {files.map((file, index) => (
          <Element
            setPath={setPath}
            key={index}
            file={file}
            setFiles={setFiles}
          />
        ))}
      </tbody>
    </table>
  );
};

export default ElementList;
