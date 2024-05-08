use std::io;
use std::fs;
use fuzzy_matcher::skim::SkimMatcherV2;
use std::path::PathBuf;
use fuzzy_matcher::FuzzyMatcher;
use std::io::Read;
use rayon::prelude::*;

/* 
 * This function does a fuzzy search on the given directory and his subdirectories for the given searched file.
 * 
 * @params path: The path to the directory to search in.
 * @params filename: The name of the file to search for.
 * 
 * @return: The path to the file if it was found, otherwise an error.
 */
pub async fn fuzzy_search(filename: &str) -> io::Result<Vec<PathBuf>> {
    let matcher = SkimMatcherV2::default();
    let mut file = match fs::File::open("C:/temp/cache.json") {
        Ok(file) => file,
        Err(_) => return Err(io::Error::new(io::ErrorKind::NotFound, "Cache not found")),
    };
    let mut contents = String::new();
    file.read_to_string(&mut contents).unwrap();
    let map: std::collections::HashMap<String, Vec<String>> = serde_json::from_str(&contents).unwrap();
    let paths: Vec<PathBuf> = map.into_par_iter()
        .filter_map(|(key, value)| {
            if matcher.fuzzy_match(&key, filename).is_some() {
                Some(value.into_iter().map(PathBuf::from).collect::<Vec<_>>())
            } else {
                None
            }
        })
        .flatten()
        .collect();
    Ok(paths)
}