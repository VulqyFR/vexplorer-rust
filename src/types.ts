import { MouseEventHandler } from "react";

export interface FileMetadata {
  file_name: string;
  file_modified: string;
  file_type: string;
  file_path: string;
  file_size: string;
}

export interface SearchbarProps {
  setFiles: (files: Array<FileMetadata>) => void;
  path: string;
  files: Array<FileMetadata>;
  setSearch: (search: string) => void;
}

export interface ElementListProps {
  setFiles: (files: Array<FileMetadata>) => void;
  files: Array<FileMetadata>;
}

export interface ElementProps {
  setFiles: (files: Array<FileMetadata>) => void;
  file: FileMetadata;
}

export interface PathProps {
  setPath: (path: string) => void;
  path: string;
  setPaths: React.Dispatch<React.SetStateAction<string[]>>;
  setFiles: (files: Array<FileMetadata>) => void;
  search: string;
  paths: string[];
}

export interface SidebarProps {
  setPath: (path: string) => void;
  user: string;
}

export interface LinkProps {
  children: React.ReactNode;
  onClick: MouseEventHandler;
}

export interface TopbarProps {
  setPath: (path: string) => void;
  setFiles: (files: Array<FileMetadata>) => void;
  files: Array<FileMetadata>;
  path: string;
  paths: string[];
  setPaths: React.Dispatch<React.SetStateAction<string[]>>;
}
