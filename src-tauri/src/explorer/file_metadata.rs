use serde::Serialize;
use std::fs;
use std::path::PathBuf;
use chrono::{DateTime, Utc};

#[derive(Serialize, Debug)] 
pub struct FileMetadata {
    pub file_name: String,
    pub file_modified: String,
    pub file_type: Option<String>,
    pub file_path: String,
    pub file_size: String,
}

/*
 * This function gets the file type of the given metadata.
 * 
 * @params meta: The metadata to get the file type from.
 * 
 * @return: The file type of the metadata.
 * 
*/
pub fn get_file_type(entry: PathBuf) -> Option<String> {
    if let Ok(meta) = fs::metadata(&entry) {
        if meta.file_type().is_dir() {
            Some("Directory".to_string())
        } else if meta.file_type().is_file() {
            Some(entry.extension()?.to_str()?.to_string())
        } else {
            None
        }
    } else {
        None
    }
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
            let file_type = get_file_type(entry.clone());
            let metadata = FileMetadata {
                file_name: entry.file_name().unwrap().to_str().unwrap().to_string(),
                file_path: entry.to_str().unwrap().to_string(),
                file_type,
                file_modified: DateTime::<Utc>::from(meta.modified().unwrap()).format("%Y-%m-%d %H:%M:%S").to_string(),
                file_size: meta.len().to_string(),
            };
            result.push(metadata);
        }
    }
    Ok(result)
}