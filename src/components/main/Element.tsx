import { ElementProps } from "../../types";

const Element = ({ file }: ElementProps) => {
  return (
    <div className="flex gap-2 border-b-[1px] border-white">
      <div className="flex flex-col gap-2 w-full">
        <div className="flex justify-between">
          <p>{file.file_name}</p>
          <p>{file.file_modified}</p>
        </div>
        <div className="flex w-full justify-between">
          <p>{file.file_path}</p>
          <p>{file.file_type}</p>
          <p>{file.file_size}</p>
        </div>
      </div>
    </div>
  );
};

export default Element;
