use std::path::PathBuf;
use serde::Serialize;
use sysinfo::{Disk, Disks,};

#[derive(Serialize, Debug)]
pub struct Volume {
    name: String,
    mount_point: PathBuf,
    available_space: u64,
    total_space: u64,
    used_space: u64,
}

impl Volume {
    pub fn new(disk: &Disk) -> Self {
        let name = {
            let volume_name = disk.name().to_str().unwrap();
            match volume_name.is_empty() {
                true => "Local Volume",
                false => volume_name,
            }
            .to_string()
        };
        let mount_point = disk.mount_point().to_path_buf();
        let available_space = disk.available_space();
        let total_space = disk.total_space();
        let used_space = total_space - available_space;
        
        Self {
            name,
            mount_point,
            available_space,
            total_space,
            used_space,
        }
    }
}

#[tauri::command]
pub fn get_volumes() -> Vec<Volume> {
    let disks = Disks::new_with_refreshed_list();
    let volumes: Vec<Volume> = disks.list().iter().map(|disk| Volume::new(disk)).collect();
  
    // TODO: Create cache for volumes

    volumes
}