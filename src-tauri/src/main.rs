// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]
mod explorer;
use explorer::finder::search_directory;
use explorer::cache::create_cache;
use lazy_static::lazy_static;
use std::sync::Arc;
use std::collections::HashMap;
use std::fs;
use std::io::Read;

lazy_static! {
  static ref CACHE: Arc<HashMap<String, Vec<String>>> = {
      let mut file = fs::File::open("C:/temp/cache.json").unwrap();
      let mut contents = String::new();
      file.read_to_string(&mut contents).unwrap();
      Arc::new(serde_json::from_str(&contents).unwrap())
  };
}

#[tokio::main]
async fn main() {
  std::thread::spawn(|| {
    create_cache();
  });
  tauri::Builder::default()
  .invoke_handler(tauri::generate_handler![
    search_directory
  ])
    .run(tauri::generate_context!())
    .expect("Error while running vexplorer");
}