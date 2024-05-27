use std::fs;
use std::path::Path;

#[tauri::command]
pub fn rename_file(path: String, new_name: String) -> Result<(), String> {
    let path = Path::new(&path);
    let new_name = Path::new(&new_name);
    match fs::rename(path, new_name) {
        Ok(_) => Ok(()),
        Err(e) => Err(e.to_string()),
    }
}

#[tauri::command]
pub fn copy_file(path: String, new_path: String) -> Result<(), String> {
    let path = Path::new(&path);
    let new_path = Path::new(&new_path);
    match fs::copy(path, new_path) {
        Ok(_) => Ok(()),
        Err(e) => Err(e.to_string()),
    }
}

#[tauri::command]
pub fn delete_file(path: String) -> Result<(), String> {
    print!("Deleting file: {}", path);
    let path = Path::new(&path);
    match fs::remove_file(path) {
        Ok(_) => Ok(()),
        Err(e) => Err(e.to_string()),
    }
}

#[tauri::command]
pub fn delete_dir(path: String) -> Result<(), String> {
    print!("Deleting directory: {}", path);
    let path = Path::new(&path);
    match fs::remove_dir_all(path) {
        Ok(_) => Ok(()),
        Err(e) => Err(e.to_string()),
    }
}

#[tauri::command]
pub fn create_file(path: String) -> Result<(), String> {
    let path = Path::new(&path);
    match fs::File::create(path) {
        Ok(_) => Ok(()),
        Err(e) => Err(e.to_string()),
    }
}

#[tauri::command]
pub fn create_dir(path: String) -> Result<(), String> {
    let path = Path::new(&path);
    match fs::create_dir(path) {
        Ok(_) => Ok(()),
        Err(e) => Err(e.to_string()),
    }
}
