import { MouseEventHandler } from "react";

export interface FileMetadata {
  file_name: string;
  file_modified: string;
  file_path: string;
  file_type: string;
  file_size: string;
}

export interface SearchbarProps {
  setFiles: (files: Array<FileMetadata>) => void;
  files: Array<FileMetadata>;
  setSearch: (search: string) => void;
}

export interface ElementListProps {
  files: Array<FileMetadata>;
}

export interface ElementProps {
  file: FileMetadata;
}

export interface PathProps {
  path: string;
  setFiles: (files: Array<FileMetadata>) => void;
  search: string;
}

export interface SidebarProps {
  setPath: (path: string) => void;
}

export interface LinkProps {
  children: React.ReactNode;
  onClick: MouseEventHandler;
}

export interface TopbarProps {
  setFiles: (files: Array<FileMetadata>) => void;
  files: Array<FileMetadata>;
  path: string;
}
