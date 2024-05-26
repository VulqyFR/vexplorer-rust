// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]
mod explorer;
mod helper;

use explorer::finder::search_directory;
use explorer::cache::create_cache;
use explorer::explorer::open_directory;
use explorer::explorer::open_file;
use explorer::sys_user::get_user;
use lazy_static::lazy_static;
use std::sync::Arc;
use std::collections::HashMap;
use std::fs;
use std::io::Read;
use std::sync::Mutex;
use explorer::volumes::get_volumes;

lazy_static! {
  static ref CACHE: Arc<Mutex<Option<HashMap<String, Vec<String>>>>> = Arc::new(Mutex::new(None));
}
pub fn load_cache() {
  let start = std::time::Instant::now();
  let mut file = fs::File::open("C:/temp/cache.json").unwrap();
  let mut contents = String::new();
  file.read_to_string(&mut contents).unwrap();
  let cache = serde_json::from_str(&contents).unwrap();
  println!("Cache loaded in {:?}", start.elapsed());
  *CACHE.lock().unwrap() = Some(cache);
}

#[tokio::main]
async fn main() {
  std::thread::spawn(|| {
    //create_cache();
  });
  std::thread::spawn(|| {
    _ = load_cache();
  });
  tauri::Builder::default()
  .invoke_handler(tauri::generate_handler![
    search_directory,
    get_user,
    open_directory,
    open_file,
    get_volumes,
  ])
    .run(tauri::generate_context!())
    .expect("Error while running vexplorer");
}
