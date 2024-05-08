use std::collections::HashMap;
use std::fs::File;
use std::io::Write;
use std::path::{Path, PathBuf};
use serde_json;

pub fn create_cache() {
    let path = PathBuf::from("C:/");
    let mut map: HashMap<String, Vec<String>> = HashMap::new();
    recursive_add(&path, &mut map);
    let json = serde_json::to_string(&map).unwrap();
    let mut file = File::create("C:/temp/cache.json").unwrap();
    file.write_all(json.as_bytes()).unwrap();
}

fn recursive_add(path: &Path, map: &mut HashMap<String, Vec<String>>) {
  let entries = match path.read_dir() {
      Ok(entries) => entries,
      Err(_) => return,
  };
  for entry in entries {
      let entry = entry.unwrap();
      let path = entry.path();
      if path.is_dir() && !is_blacklisted(&path) {
          recursive_add(&path, map);
      } else if let Some(filename) = path.file_name() {
          let filename = filename.to_string_lossy().into_owned();
          let paths = map.entry(filename).or_insert_with(Vec::new);
          paths.push(path.to_string_lossy().into_owned());
      }
  }
}

fn is_blacklisted(path: &PathBuf) -> bool {
  let blacklist = vec!["C:\\Windows\\System32"];
  for blacklisted in blacklist {
      if path.starts_with(blacklisted) {
          return true;
      }
  }
  return false;
}
// TODO BLACKLIST SYS32...
// TODO format filename

/*  EN JSON : 
coucou:
  [C:\Users\coucou\Documents\coucou.txt,	C:\Users\coucou\Download\coucou.txt]
*/