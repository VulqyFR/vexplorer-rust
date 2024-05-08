mod finder;
mod cache;

#[tokio::main]
async fn main() {
  let start = std::time::Instant::now();
  let res = finder::fuzzy_search("java.exe").await;
  println!("{:?}", res);
  println!("Time: {:?}", start.elapsed());
  let start = std::time::Instant::now();
  println!("Start create_cache");
  cache::create_cache();
  println!("Time: {:?} to create_cache", start.elapsed());
}