use serde::{Serialize, Deserialize};
use std::fs;
use std::path::Path;
use std::process::Command;
use clipboard::ClipboardProvider;
use clipboard::ClipboardContext;
use std::os::windows::process::CommandExt;

const CREATE_NO_WINDOW: u32 = 0x08000000;

#[derive(Deserialize)]
pub enum FileOperation {
    Copy,
    Cut,
    Paste,
    Delete,
    Rename,
    CreateFile,
    CreateDir,
}

#[derive(Serialize)]
pub struct OperationResult {
    result: u64,
    error: Option<String>,
}

#[tauri::command]
pub fn file_operation(operation: FileOperation, path: String, old_name: Option<String>, new_name: Option<String>) -> Result<OperationResult, String> {
    match operation {
        FileOperation::Rename => {
            let output = Command::new("cmd")
            .args(&["/C", "ren", &old_name.unwrap().as_str(), new_name.unwrap().as_str()])
            .current_dir(&path)
            .output()
            .map_err(|e| e.to_string())?;
            println!("Output: {:?}", output);
            Ok(OperationResult {
                result: output.stdout.len() as u64,
                error: None,
            })
        },
        FileOperation::Copy => {
            println!("Copying file: {:?}", path);
            let mut ctx: ClipboardContext = ClipboardProvider::new().unwrap();
            ctx.set_contents(path.to_string()).unwrap();
            Ok(OperationResult {
                result: 0,
                error: None,
            })
        },
        FileOperation::Paste => {
            println!("Pasting file: {:?}", path);
            let mut ctx: ClipboardContext = ClipboardProvider::new().unwrap();
            let source_path = ctx.get_contents().unwrap();
            let destination_path = Path::new(&path);
            let output = Command::new("cmd")
                .args(&["/C", "copy", &source_path, destination_path.to_str().unwrap()])
                .creation_flags(CREATE_NO_WINDOW)
                .output()
                .expect("Failed to execute command");
            Ok(OperationResult {
                result: output.stdout.len() as u64,
                error: None,
            })
        },
        FileOperation::Delete => {
            let path = Path::new(&path);
            match trash::delete(path) {
                Ok(_) => Ok(OperationResult {
                    result: 0,
                    error: None,
                }),
                Err(e) => Err(e.to_string()),
            }
        },
        FileOperation::CreateFile => {
            let path = Path::new(&path);
            match fs::File::create(path) {
                Ok(_) => Ok(OperationResult {
                    result: 0,
                    error: None,
                }),
                Err(e) => Err(e.to_string()),
            }
        },
        FileOperation::CreateDir => {
            let path = Path::new(&path);
            match fs::create_dir(path) {
                Ok(_) => Ok(OperationResult {
                    result: 0,
                    error: None,
                }),
                Err(e) => Err(e.to_string()),
            }
        },
        _ => Err("Operation not supported".to_string()),
    }
}
