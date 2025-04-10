import PropTypes from "prop-types";
import { BsStar, BsStarFill } from "react-icons/bs";

const FavoriteStar = ({ isFavorite, onToggle, floating = false }) => {
  const containerClass = floating
    ? "position-absolute top-0 end-0 m-2 d-flex justify-content-center align-items-center rounded-circle bg-primary"
    : "d-inline-flex align-items-center";

  const containerStyle = floating
    ? {
        width: "32px",
        height: "32px",
        cursor: "pointer",
      }
    : {
        cursor: "pointer",
      };

  const iconColor = floating ? (isFavorite ? "gold" : "white") : "gold";
  const iconSize = floating ? 18 : 20;

  return (
    <div className={containerClass} style={containerStyle} onClick={onToggle}>
      {isFavorite ? (
        <BsStarFill color={iconColor} size={iconSize} />
      ) : (
        <BsStar color={iconColor} size={iconSize} />
      )}
    </div>
  );
};

FavoriteStar.propTypes = {
  isFavorite: PropTypes.bool.isRequired,
  onToggle: PropTypes.func.isRequired,
  floating: PropTypes.bool,
};

export default FavoriteStar;

