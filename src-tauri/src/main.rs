// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]
mod explorer;
use explorer::finder::fuzzy_search;

fn main() {
  tauri::Builder::default()
  .invoke_handler(tauri::generate_handler![
    fuzzy_search
  ])
    .run(tauri::generate_context!())
    .expect("error while running tauri application");
}