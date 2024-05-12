use serde::Serialize;
use std::fs;
use std::path::PathBuf;
use chrono::{DateTime, Utc};

#[derive(Serialize, Debug)] 
pub struct FileMetadata {
    pub file_name: String,
    pub file_modified: String,
    pub file_path: String,
    pub file_size: String,
}

/*
 * This function gets the metadata of the files in the given directory.
 * 
 * @params entries: The entries to get the metadata from.
 * 
 * @return: The metadata of the files.
 * 
*/
pub fn get_metadata(entries: Vec<PathBuf>) -> Result<Vec<FileMetadata>, String> {
  let mut result = Vec::new();
  for entry in entries {
      if let Ok(meta) = fs::metadata(&entry) {
          let metadata = FileMetadata {
              file_name: entry.file_name().unwrap().to_str().unwrap().to_string(),
              file_path: entry.to_str().unwrap().to_string(),
              file_modified: DateTime::<Utc>::from(meta.modified().unwrap()).format("%Y-%m-%d %H:%M:%S").to_string(),
              file_size: meta.len().to_string(),
          };
          result.push(metadata);
      }
  }
  Ok(result)
}
