use std::collections::HashMap;
use std::fs::File;
use std::io::Write;
use std::path::{Path, PathBuf};
use serde_json;
use rayon::prelude::*;
use std::fs;
use std::sync::{Arc, Mutex};

pub fn create_cache() {
    let start = std::time::Instant::now();
    let path = PathBuf::from("C:\\");
    let map: Arc<Mutex<HashMap<String, Vec<String>>>> = Arc::new(Mutex::new(HashMap::new()));
    recursive_add(&path, map.clone());
    let json = serde_json::to_string(&*map.lock().unwrap()).unwrap();
    let mut file = File::create("C:/temp/cache.json").unwrap();
    file.write_all(json.as_bytes()).unwrap();
    println!("Cache created in {:?}", start.elapsed());
}

fn recursive_add(path: &Path, map: Arc<Mutex<HashMap<String, Vec<String>>>>) {
    if let Ok(entries) = fs::read_dir(path) {
        entries.par_bridge().for_each(|entry| {
            if let Ok(entry) = entry {
                let path = entry.path();
                let name = entry.file_name().to_string_lossy().into_owned();
                let map_clone = Arc::clone(&map);
                let mut map = map_clone.lock().unwrap();
                let paths = map.entry(name.clone()).or_insert_with(Vec::new);
                paths.push(path.to_string_lossy().into_owned());
                drop(map); 
                if let Ok(metadata) = path.metadata() {
                    if metadata.is_dir() {
                        recursive_add(&path, map_clone);
                    }
                }
            }
        });
    }
}