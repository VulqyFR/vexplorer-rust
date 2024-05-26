use crate::CACHE;
use std::time::Instant;
use std::path::PathBuf;
use std::sync::Arc;
use fuzzy_matcher::skim::SkimMatcherV2;
use fuzzy_matcher::FuzzyMatcher;
use crate::explorer::file_metadata::FileMetadata;
use rayon::prelude::*;
use crate::explorer::file_metadata::get_metadata;

// Minimum score to consider a match
const MINIMUM_SCORE: i16 = 60;

/* 
 * This function calculates the score of a match between the query and the element.
 * 
 * @params matcher: The matcher to use for the fuzzy search.
 * @params query: The query to search for.
 * @params element: The element to search in.
 * 
 * @return: The score of the match.
*/
fn calculate_score(matcher: &SkimMatcherV2, query: &str, element: &str) -> i16 {
    if query == element {
        return 999;
    }
    matcher.fuzzy_match(element, query).unwrap_or(0) as i16
}   

/* 
 * This function does a fuzzy search on the given directory and his subdirectories for the given searched file.
 * 
 * @params path: The path to the directory to search in.
 * @params query: The query to search for.
 * 
 * @return: All the paths of the files or directories that match the query.
*/
fn fuzzy_search(path: String, query: String) -> Vec<PathBuf> {
    let map = Arc::clone(&*CACHE);
    let map = map.lock().unwrap();
    let map = map.as_ref().unwrap();
    let matcher = SkimMatcherV2::default();
    let results: Vec<_> = map.par_iter()
        .filter_map(|(key, paths)| {
            let score = calculate_score(&matcher, &query, key);
            if score > MINIMUM_SCORE {
                Some(paths.clone())
            } else {                
                None
            }
        })
        .flatten()
        .map(PathBuf::from)
        .collect::<Vec<PathBuf>>();
    let filtered_results = results.into_par_iter().filter(|p| p.to_str().unwrap_or("").starts_with(&path)).collect();
    filtered_results
}
/*
 * This function searches for the files and folder in the given directory.
 * 
 * @params path: The path to the directory to search in.
 * @params query: The query to search for.
 * 
 * @return: The metadata of the files in the directory.
 * 
*/ 
#[tauri::command]
pub fn search_directory(path: String, query: String) -> Result<Vec<FileMetadata>, String> {
    let start = Instant::now();
    let entries = fuzzy_search(path.clone(), query.clone());
    let result = get_metadata(entries)?;
    println!("Search took: {:?}", start.elapsed());
    Ok(result)
}

/*
 * This function gets the type of the file.
 * 
 * @params entry: The entry to get the type from.
 * 
 * @return: The type of the file.
 * 
*/

// TODO implement the extension filter
#[allow(dead_code)]
fn get_file_type(entry: &PathBuf) -> String {
    if entry.is_file() {
        match entry.extension() {
            Some(ext) => ext.to_str().unwrap().to_string(),
            None => String::from("Unknown")
        }
    } else {
        String::from("File folder")
    }
}