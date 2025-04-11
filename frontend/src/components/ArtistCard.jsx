import PropTypes from "prop-types";
import { useAuth } from "../contexts/AuthContext";    // ✅ 检查是否登录
import FavoriteStar from "./FavoriteStar";
import { useFavorites } from "../contexts/FavoritesContext";
import { useNotification } from "../contexts/NotificationContext";

const ArtistCard = ({ artist, isSelected, onClick}) => {
  const { isAuthenticated } = useAuth();
  const { favorites, toggleFavorite } = useFavorites();
  const { addNotification } = useNotification();

  const defaultImg = "/images/artsy_logo.svg";
  // console.log("imgurl:", artist.imageUrl)
  // console.log("is missing? ", artist.imageUrl.includes("missing_image") )
  const artistImg = artist.imageUrl.includes("missing_image") 
                    ? defaultImg 
                    : artist.imageUrl;

  const isFavorite = favorites.some((f) => f.artistId === artist.id);

  return (
    <div className={`card border-0 text-white text-center `}
          style={{ backgroundColor: isSelected ? "#074c8f" : "#205375",
                    width: "200px",
                    minWidth:"200px",
                    height: "250px", 
                    padding:"0",
                    cursor: "pointer",
                    flexShrink: 0,
                    overflow: "hidden", // ✅ 保证圆角裁剪图片
                    border: "none",     // ✅ 保险措施
                  }} 
          onMouseEnter={(e) => {
            if (!isSelected) e.currentTarget.style.backgroundColor = "#074c8f"; // hover 蓝色
          }}
          onMouseLeave={(e) => {
            if (!isSelected) e.currentTarget.style.backgroundColor = "#205375"; // 恢复原色
          }}
          onClick={() => {
            // onClick(artist.id)
            onClick(artist)

          }} 
          >
            {/* #074c8f */}

          {/* STAR FAVORITE */}
          {isAuthenticated && (
            <FavoriteStar
              isFavorite={favorites.some((f) => f.artistId=== artist.id)}
              onToggle={(e) => {
                e.stopPropagation();               // ✅ 阻止点击冒泡
                toggleFavorite(artist);
                
                if (favorites.some((f) => f.artistId === artist.id)) {
                  addNotification("Removed from favorites", "danger");
                } else {
                  addNotification("Added to favorites", "success");
                }
              }}
              floating={true}                      // ✅ 表示右上角悬浮样式
            />)}


            <div className="mb-2">
                <img src={artistImg} alt="artist" 
                    className="w-100"
                    style={{ height: "200px", objectFit: "cover" }} />
            </div>
            <div className="fw-semibold">{artist.name}</div>
      </div>

  );
};

ArtistCard.propTypes = {
  artist: PropTypes.object.isRequired,
  isSelected: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default ArtistCard;
