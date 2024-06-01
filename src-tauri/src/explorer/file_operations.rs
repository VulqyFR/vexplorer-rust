use std::fs;
use std::path::Path;
use std::process::Command;
use clipboard::ClipboardProvider;
use clipboard::ClipboardContext;
use std::os::windows::process::CommandExt;

const CREATE_NO_WINDOW: u32 = 0x08000000;

#[tauri::command]
pub fn rename_file(old_name: String, new_name: String, path: String) -> Result<u64, String> {
    let output = Command::new("cmd")
    .args(&["/C", "ren", &old_name, &new_name])
    .current_dir(&path)
    .output()
    .expect("Failed to execute command");
    println!("Output: {:?}", output);
    Ok(output.stdout.len() as u64)
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
        .creation_flags(CREATE_NO_WINDOW)
        .output()
        .expect("Failed to execute command");
    Ok(output.stdout.len() as u64)
}
#[tauri::command]
pub async fn delete_file(path: String) -> Result<(), String> {
    let path = Path::new(&path);
    println!("Deleting directory: {}", path.display());
    match trash::delete(path) {
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
