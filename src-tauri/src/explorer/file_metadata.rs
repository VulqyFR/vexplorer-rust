use serde::{Serialize, Deserialize};
use std::fs;
use std::path::PathBuf;
use chrono::{DateTime, Utc};
use std::ffi::OsString;
use std::os::windows::ffi::OsStrExt;
use winapi::um::shellapi::SHGetFileInfoW;
use winapi::um::shellapi::SHFILEINFOW;
use winapi::um::shellapi::SHGFI_ICON;
use winapi::um::winuser::DestroyIcon;
use crate::helper::icon_converter::icon_to_base64;


#[derive(Debug, Serialize, Deserialize)]
pub struct FileMetadata {
    pub file_name: String,
    pub file_path: String,
    pub file_type: String,
    pub file_modified: String,
    pub file_size: String,
    pub file_icon: Option<String>,
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
            let file_type = get_file_type(entry.clone()).unwrap_or("Unknown".to_string());
            let file_icon = get_file_icon(&entry);
            let metadata = FileMetadata {
                file_name: entry.file_name().unwrap().to_str().unwrap().to_string(),
                file_path: entry.to_str().unwrap().to_string(),
                file_type,
                file_modified: DateTime::<Utc>::from(meta.modified().unwrap()).format("%Y-%m-%d %H:%M:%S").to_string(),
                file_size: meta.len().to_string(),
                file_icon,
            };
            result.push(metadata);
        }
    }
    Ok(result)
}


pub fn get_file_icon(entry: &PathBuf) -> Option<String> {
    let mut sh_file_info: SHFILEINFOW = unsafe { std::mem::zeroed() };
    let file_path: Vec<u16> = OsString::from(entry.as_os_str()).encode_wide().chain(Some(0)).collect();

    unsafe {
        let result = SHGetFileInfoW(
            file_path.as_ptr(),
            0,
            &mut sh_file_info,
            std::mem::size_of::<SHFILEINFOW>() as u32,
            SHGFI_ICON,
        );
        if result != 0 {
            let icon = sh_file_info.hIcon;
            let base64_icon = icon_to_base64(icon);
            DestroyIcon(icon);
            base64_icon
        } else {
            None
        }
    }
}

