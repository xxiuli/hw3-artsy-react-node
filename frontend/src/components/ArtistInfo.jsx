import PropTypes from "prop-types";
//import SimilarArtistWindow from "./SimilarArtistWindow.jsx"; // ✅ 如果你已经抽出
import { useAuth } from "../contexts/AuthContext"; 
import SimilarArtistWindow from "./SimilarArtistWindow";
import FavoriteStar from "./FavoriteStar";
import { useFavorites } from "../contexts/FavoritesContext";

const ArtistInfo = ({
  artist,
  onCardSelect,
}) => {
  const { isAuthenticated } = useAuth();
  const { favorites, toggleFavorite } = useFavorites();

  const isFavorite = favorites.some((f) => f.id === artist.id);
  return (
    <div>
      <h2 className="d-flex align-items-center justify-content-center gap-2">
        {artist.name}
        {isAuthenticated && (
          <FavoriteStar
          isFavorite={favorites.some((f) => f.artistId=== artist.id)}
            onToggle={(e) => {
                e.stopPropagation();               // ✅ 阻止点击冒泡
                toggleFavorite(artist);
            }}
            floating={false}                      // ✅ 表示右上角悬浮样式
            />)}
      </h2>

      <h6>{artist.nationality}</h6>

      {(artist.biography)
        .split("\n\n")
        .map((para, idx) => <p key={idx} className="text-start"> {para} </p>)}

      {/* Similar Artists */}
      {isAuthenticated && (
        <SimilarArtistWindow
          artistId={artist.id}
          onCardSelect={onCardSelect}
          isFavorite={isFavorite}
              onToggle={(e) => {
                e.stopPropagation();               // ✅ 阻止点击冒泡
                toggleFavorite(artist);
              }}
        />
      )}
    </div>
  );
};

ArtistInfo.propTypes = {
  artist: PropTypes.object.isRequired,
  onCardSelect: PropTypes.func,
};

export default ArtistInfo;
