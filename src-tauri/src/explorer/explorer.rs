use std::fs::{read_dir, metadata};
use std::path::PathBuf;
use crate::explorer::file_metadata::FileMetadata;
use chrono::{DateTime, Utc};
use crate::explorer::file_metadata::get_file_type;

#[tauri::command]
pub fn open_directory(path: PathBuf) -> Result<Vec<FileMetadata>, String> {
  let Ok(directory) = read_dir(path) else {
      return Ok(Vec::new());
  };
  Ok(directory
    .map(|entry| {
      let entry = entry.unwrap();
      let path = entry.path();
      let meta = metadata(&path).unwrap();
      FileMetadata {
        file_name: path.file_name().unwrap().to_str().unwrap().to_string(),
        file_path: path.to_str().unwrap().to_string(),
        file_type: get_file_type(path.clone()),
        file_modified: DateTime::<Utc>::from(meta.modified().unwrap()).format("%Y-%m-%d %H:%M:%S").to_string(),
        file_size: meta.len().to_string(),
      }
    }).collect())
}
