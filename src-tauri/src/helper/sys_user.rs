use std::env;

/*
* This function gets the current user of the system.
*
* @return: The current user of the system.
*/
#[tauri::command]
pub fn get_user() -> Result<String, String> {
    let os = get_os()?;
    let os_user = match os.as_str() {
        "windows" => "USERNAME",
        "macos" => "USER",
        "linux" => "USER",
        _ => return Err("Unsupported OS".to_string()),
    };
    let user = env::var(os_user).map_err(|err| err.to_string())?;
    Ok(user.to_lowercase())
}

/*
* This function gets the current operating system.
*
* @return: The current operating system.
*/
fn get_os() -> Result<String, String> {
    let os = env::consts::OS.to_string();
    Ok(os)
}