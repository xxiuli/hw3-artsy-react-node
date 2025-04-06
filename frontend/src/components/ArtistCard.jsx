import PropTypes from "prop-types";
import { BsStar, BsStarFill } from "react-icons/bs"; // ⭐️ 引入星星
import { useAuth } from "../contexts/AuthContext";    // ✅ 检查是否登录

const ArtistCard = ({ artist, isSelected, onClick, isFavorite, onToggleFavorite }) => {
  const { isAuthenticated } = useAuth();

  const defaultImg = "src/assets/artsy_logo.svg";
  // console.log("imgurl:", artist.imageUrl)
  // console.log("is missing? ", artist.imageUrl.includes("missing_image") )
  const artistImg = artist.imageUrl.includes("missing_image") 
                    ? defaultImg 
                    : artist.imageUrl;

  return (
    <div className={`card border-0 text-white text-center `}
          style={{ backgroundColor: isSelected ? "#112B3C" : "#205375",
                    width: "200px",
                    height: "250px", 
                    padding:"0",
                    cursor: "pointer",
                    flexShrink: 0,
                    overflow: "hidden", // ✅ 保证圆角裁剪图片
                    border: "none",     // ✅ 保险措施
                  }} 
          onMouseEnter={(e) => {
            if (!isSelected) e.currentTarget.style.backgroundColor = "#3E7CB1"; // hover 蓝色
          }}
          onMouseLeave={(e) => {
            if (!isSelected) e.currentTarget.style.backgroundColor = "#205375"; // 恢复原色
          }}
          onClick={() => onClick(artist.id)} 
          >

            {/* STAR FAVORITE */}
            {isAuthenticated && (
                                  <div
                                    className="position-absolute top-0 end-0 m-2"
                                    onClick={(e) => {
                                      e.stopPropagation();         // 🚫 防止冒泡触发整个卡片点击
                                      onToggleFavorite(artist.id); // ⭐️ 切换收藏状态
                                    }}
                                    style={{ fontSize: "1.2rem", cursor: "pointer" }}
                                  >
                                    {isFavorite ? (
                                      <BsStarFill color="gold" />
                                    ) : (
                                      <BsStar color="white" />
                                    )}
                                  </div>
                                )}


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
  isFavorite: PropTypes.bool,               // ✅ 新增
  onToggleFavorite: PropTypes.func,         // ✅ 新增
};

export default ArtistCard;
