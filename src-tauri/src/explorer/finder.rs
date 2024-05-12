use crate::CACHE;
use std::{fs, time::Instant};
use std::path::PathBuf;
use std::sync::Arc;
use fuzzy_matcher::skim::SkimMatcherV2;
use fuzzy_matcher::FuzzyMatcher;
use rayon::prelude::*;
use serde::Serialize;
use chrono::{DateTime, Utc};

// Minimum score to consider a match
const MINIMUM_SCORE: i16 = 60;

/* 
 * This struct represents the metadata of a file.
*/
#[derive(Serialize, Debug)] 
pub struct FileMetadata {
    pub file_name: String,
    pub file_modified: String,
    pub file_path: String,
    pub file_type: String,
    pub file_size: String,
}

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
 * This function checks if the query contains an extension.
 * 
 * @params query: The query to check.
 * 
 * @return: True if the query contains an extension, otherwise false.
*/
#[allow(dead_code)]
fn contains_extension(query: &String) -> bool {
    query.contains(".")
}

/* 
 * This function does a fuzzy search on the given directory and his subdirectories for the given searched file.
 * 
 * @params path: The path to the directory to search in.
 * @params query: The query to search for.
 * 
 * @return: All the paths of the files or directories that match the query.
*/
fn fuzzy_search(path: String, query: String) -> Result<Vec<PathBuf>, String> {
    let map = Arc::clone(&CACHE);
    let matcher = SkimMatcherV2::default();
    let results: Vec<_> = (*map).par_iter()
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
    Ok(filtered_results)
}

/*
    * This function searches for the given query in the given directory.
    * 
    * @params path: The path to the directory to search in.
    * @params query: The query to search for.
    * 
    * @return: An error if the query does not contain an extension, otherwise nothing.
    
*/
#[tauri::command]
pub fn search_directory(path: String, query: Option<String>) -> Result<Vec<FileMetadata>, String> {
    let start = Instant::now();
    let mut result = Vec::new();
    let entries: Vec<PathBuf> = match query {
        Some(q) => {
            fuzzy_search(path.clone(), q).expect("Fuzzy search failed")
        },
        None => fs::read_dir(path.clone()).unwrap().map(|res| res.unwrap().path()).collect(),
    };
    for entry in entries {
        if let Ok(meta) = fs::metadata(&entry) {
            let metadata = FileMetadata {
                file_name: entry.file_name().unwrap().to_str().unwrap().to_string(),
                file_type: if entry.is_file() {
                    match entry.extension() {
                        Some(ext) => ext.to_str().unwrap().to_string(),
                        None => String::from("Unknown")
                    }
                } else {
                    String::from("File folder")
                },
                file_path: entry.to_str().unwrap().to_string(),
                file_modified: DateTime::<Utc>::from(meta.modified().unwrap()).format("%Y-%m-%d %H:%M:%S").to_string(),
                file_size: meta.len().to_string(),
            };
            result.push(metadata);
        }
    }
    println!("Search took: {:?}", start.elapsed());
    Ok(result)
}
