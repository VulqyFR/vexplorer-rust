use base64::engine::general_purpose::STANDARD;
use base64::Engine as _;
use image::{ExtendedColorType, ImageBuffer, ImageEncoder, Rgba};
use image::codecs::png::PngEncoder;
use winapi::um::wingdi::{GetDIBits, BITMAPINFOHEADER, BITMAPINFO, DIB_RGB_COLORS, CreateCompatibleDC};
use winapi::um::winuser::GetIconInfo;
use winapi::shared::windef::HICON;
use std::ptr::null_mut;
use rayon::prelude::*;
use std::collections::HashMap;
use std::sync::Mutex;
use lazy_static::lazy_static;
use std::sync::Arc;

lazy_static! {
    pub static ref ICON_MAP: Arc<Mutex<HashMap<String, String>>> = Arc::new(Mutex::new(HashMap::new()));
}

pub fn icon_to_base64(icon: HICON) -> Option<String> {
    unsafe {
        let mut icon_info = std::mem::zeroed();
        if GetIconInfo(icon, &mut icon_info) == 0 {
            return None;
        }

        let hdc = CreateCompatibleDC(null_mut());
        if hdc.is_null() {
            return None;
        }

        let hbitmap = icon_info.hbmColor;
        let mut bmi = BITMAPINFO {
            bmiHeader: BITMAPINFOHEADER {
                biSize: std::mem::size_of::<BITMAPINFOHEADER>() as u32,
                biWidth: 32,
                biHeight: -32,
                biPlanes: 1,
                biBitCount: 32,
                biCompression: 0,
                biSizeImage: 0,
                biXPelsPerMeter: 0,
                biYPelsPerMeter: 0,
                biClrUsed: 0,
                biClrImportant: 0,
            },
            bmiColors: [std::mem::zeroed(); 1],
        };
        let mut pixels = vec![0u8; 4 * 32 * 32];
        if GetDIBits(hdc, hbitmap, 0, 32, pixels.as_mut_ptr() as *mut _, &mut bmi, DIB_RGB_COLORS) == 0 {
            return None;
        }

        pixels.par_chunks_exact_mut(4).for_each(|chunk| {
            chunk.swap(0, 2);
        });

        let img = ImageBuffer::<Rgba<u8>, _>::from_raw(32, 32, pixels).unwrap();
        let mut buf = Vec::new();
        {
            let encoder = PngEncoder::new(&mut buf);
            encoder.write_image(&img.into_raw(), 32, 32, ExtendedColorType::Rgba8).unwrap();
        }
        Some(STANDARD.encode(&buf))
    }
}
