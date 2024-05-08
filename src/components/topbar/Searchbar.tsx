import { invoke } from "@tauri-apps/api/tauri";

const Searchbar = () => {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    invoke("fuzzy_search", { query: e.target.value });
  };
  return <input onChange={handleInputChange} />;
};

export default Searchbar;
