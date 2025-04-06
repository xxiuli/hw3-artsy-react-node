import React, { useState } from "react";
import SearchBar from "../components/SearchBar.jsx";
import ArtistCardWindow from "../components/ArtistCardWindow.jsx"
import httpService from "../services/httpService.js";
import NoResult from "../components/NoResult";
import ArtistDetailsTabs from "../components/ArtistDetailsTabs"
import { useAuth } from "../contexts/AuthContext";


const Home = () => {
  const [searchResults, setSearchResults] = useState([]);
  const [selectedArtist, setArtistDetail] = useState(null); //detail of a selected artist
  const [selectedArtistId, setSelectedArtistId] = useState(null);
  
  const [hasSearched, setHasSearched] = useState(false);
  const [favorites, setFavorites] = useState([]);

  const { isAuthenticated } = useAuth();

  const handleSearch = async (query) => {
    if (!query) {
      setSearchResults([]);
      setArtistDetail(null);
      setHasSearched(false)
      return;
    }

    try {
      const data = await httpService.get("/artsy/search", { query });
      setSearchResults(data || []);
      console.log("HOME get data:", data)
    } catch (err) {
      setSearchResults([]);
    } finally {
      setArtistDetail(null);// 如果你想每次新搜索都清除选中 
      setHasSearched(true)
    }
  };

  const getDetail_byArtistId = async (artistid) => {
    try {
      const data = await httpService.get(`/artsy/artists/${artistid}`);
      setArtistDetail(data || []);
      console.log("HOME get artist Detail:", data)
    } catch (err) {
      setArtistDetail(null);
    } 
  };

  const handleToggleFavorite = (artistId) => {
    if (!isAuthenticated) return;
  
    setFavorites((prevFavorites) => {
      if (prevFavorites.includes(artistId)) {
        // 如果已经收藏 → 取消
        return prevFavorites.filter((id) => id !== artistId);
      } else {
        // 没收藏 → 添加
        return [...prevFavorites, artistId];
      }
    });
  
    // 👉 可选：将操作发到后端
    // await favoriteService.toggleFavorite(artistId);
  };

  return (
    <div className="d-flex flex-column min-vh-100" >
      <main className="flex-fill">
        <div className="container mt-5 pt-3" style={{ width: "90%", maxWidth: "900px" }}>  
          <SearchBar onSearch={handleSearch}/>

          {hasSearched && searchResults.length === 0 && (<NoResult />) }

          {searchResults.length > 0 && (
              <ArtistCardWindow
                artists={searchResults}
                selectedArtist={selectedArtist}
                onCardSelect={getDetail_byArtistId}
                favorites={favorites}                          // ✅ 传收藏数据
                onToggleFavorite={handleToggleFavorite}        // ✅ 传事件函数
              />
            )}
          
          {selectedArtist && <ArtistDetailsTabs artist={selectedArtist} />}

        </div>
      </main>
    </div>
  );
};

export default Home;
