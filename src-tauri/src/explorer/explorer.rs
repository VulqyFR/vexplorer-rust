use std::fs::{read_dir, metadata};
use std::path::PathBuf;
use crate::explorer::file_metadata::FileMetadata;
use chrono::{DateTime, Utc};
use crate::explorer::file_metadata::get_file_type;
use std::process::Command;
use crate::explorer::file_metadata::get_file_icon;

#[tauri::command]
pub async fn open_directory(path: PathBuf) -> Result<Vec<FileMetadata>, String> {
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
                file_type: get_file_type(path.clone()).unwrap_or_else(|| "Unknown".to_string()),
                file_modified: DateTime::<Utc>::from(meta.modified().unwrap()).format("%Y-%m-%d %H:%M:%S").to_string(),
                file_size: meta.len().to_string(),
                file_icon: get_file_icon(&path),
            }
        })
        .collect())
}

#[tauri::command]
pub async fn open_file(path: PathBuf) -> Result<(), String> {
    println!("Opening file: {:?}", path);
    let os = std::env::consts::OS;
    let command = match os {
        "windows" => {
            let path_str = path.to_str().ok_or("Failed to convert path to string")?;
            Command::new("cmd")
                .args(&["/C", "start", "", &path_str])
                .output()
        },
        "macos" => Command::new("open").arg(path).output(),
        _ => Command::new("xdg-open").arg(path).output(),
    };

    match command {
      Ok(output) => {
        if output.status.success() {
          Ok(())
        } else {
          Err(String::from_utf8_lossy(&output.stderr).to_string())
        }
      },
      Err(err) => Err(err.to_string()),
    }
}
