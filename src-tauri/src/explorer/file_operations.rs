use std::fs;
use std::path::Path;
use std::process::Command;
use clipboard::ClipboardProvider;
use clipboard::ClipboardContext;

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
pub fn copy_file(path: String) -> Result<(), String> {
    let mut ctx: ClipboardContext = ClipboardProvider::new().unwrap();
    ctx.set_contents(path.to_string()).unwrap();
    Ok(())
}

#[tauri::command]
pub fn paste_file(destination_path: String) -> Result<u64, String> {
    let mut ctx: ClipboardContext = ClipboardProvider::new().unwrap();
    let source_path = ctx.get_contents().unwrap();
    let destination_path = Path::new(&destination_path);
    let output = Command::new("cmd")
        .args(&["/C", "copy", &source_path, destination_path.to_str().unwrap()])
        .output()
        .expect("Failed to execute command");
    Ok(output.stdout.len() as u64)
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
