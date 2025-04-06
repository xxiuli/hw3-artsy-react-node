// src/components/ArtistCardWindow.jsx

import { useState } from "react";
import PropTypes from "prop-types";
import ArtistCard from "./ArtistCard";

const ArtistCardWindow = ({ artists, selectedArtist, onCardSelect, favorites,
  onToggleFavorite}) => {
  return (
    <div className="d-flex overflow-auto my-4"
          style={{ height: "280px"}}>
      <div className="d-flex gap-3">
        {artists.map((artist) => (
          <ArtistCard
            key={artist.id}
            artist={artist}
            isSelected={selectedArtist === artist.id}
            onClick={() => onCardSelect(artist.id)}
            isFavorite={favorites.includes(artist.id)}  // ✅ 是否已收藏
            onToggleFavorite={onToggleFavorite}     // ✅ 切换收藏状态
          />
        ))}
      </div>
    </div>
  );
};

ArtistCardWindow.propTypes = {
  artists: PropTypes.array.isRequired,
  selectedArtist: PropTypes.string,
  onSelect: PropTypes.func.isRequired,
  favorites:PropTypes.array,
  onToggleFavorite: PropTypes.func
};

export default ArtistCardWindow;
