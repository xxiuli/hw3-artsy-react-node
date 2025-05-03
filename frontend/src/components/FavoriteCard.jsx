import PropTypes from "prop-types";
import { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useFavorites } from "../contexts/FavoritesContext";
import { useEffect, useState } from "react";

// 
const formatRelativeTime = (dateString) => {
  const time = new Date(dateString);
  if (isNaN(time.getTime())) return "Just now"; 

  const now = new Date();
  const diff = Math.floor((now - time) / 1000);

  if (diff < 60) return `${diff} second${diff !== 1 ? "s" : ""} ago`;
  const mins = Math.floor(diff / 60);
  if (mins < 60) return `${mins} minute${mins !== 1 ? "s" : ""} ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs} hour${hrs !== 1 ? "s" : ""} ago`;
  const days = Math.floor(hrs / 24);
  return `${days} day${days !== 1 ? "s" : ""} ago`;
};

const FavoriteArtistCard = ({ artist }) => {
  const navigate = useNavigate();
  const { toggleFavorite } = useFavorites();
  const [relativeTime, setRelativeTime] = useState(formatRelativeTime(artist.createdAt));

  
  useEffect(() => {
    const interval = setInterval(() => {
      setRelativeTime(formatRelativeTime(artist.createdAt));
    }, 10000);
    return () => clearInterval(interval);
  }, [artist.createdAt]);

  const handleRemove = (e) => {
    e.stopPropagation(); 
    toggleFavorite({ id: artist.artistId });
  };

  const handleCardClick = () => {
    navigate(`/artist/${artist.artistId}`, { state: { artist } });
  };

  return (
<div className="mb-3">  
  <div
    className="card text-white shadow-sm"
    style={{
      width: "300px",
      height: "170px",
      marginBottom: "0px",         
      backgroundImage: `url(${artist.imageUrl})`,
      backgroundSize: "cover",
      backgroundPosition: "center",
      position: "relative",
      borderRadius: "0.5rem",
      overflow: "hidden",
      cursor: "pointer",
      backdropFilter: "blur(4px)",
    }}
    onClick={handleCardClick}
  >
    <div
      className="position-absolute top-0 start-0 w-100 h-100"
      style={{
        backgroundColor: "rgba(0,0,0,0.6)",
        padding: "1rem",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      <div className="text-start">
        <div className="fw-bold text-start fs-5">{artist.name}</div>
        <div>{artist.birthDeathday}</div>
        <div>{artist.nationality}</div>
      </div>
      <div className="d-flex justify-content-between align-items-center">
        <small>{relativeTime}</small>
        <button
          onClick={handleRemove}
          className="btn btn-link text-white text-decoration-underline p-0"
          style={{ fontSize: "0.85rem" }}
        >
          Remove
        </button>
      </div>
    </div>
  </div>
</div>
  );
};

FavoriteArtistCard.propTypes = {
  artist: PropTypes.shape({
    artistId: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    birthDeathday: PropTypes.string,
    nationality: PropTypes.string,
    imageUrl: PropTypes.string,
    createdAt: PropTypes.string.isRequired,
  }).isRequired,
};

export default FavoriteArtistCard;
