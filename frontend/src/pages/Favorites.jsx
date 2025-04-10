import React from "react";
import { useFavorites } from "../contexts/FavoritesContext";
import FavoriteCard from "../components/FavoriteCard";

const FavoritesPage = () => {
  const { favorites } = useFavorites();

  if (favorites.length === 0) {
    return <div className="text-center mt-5">No favorite artists</div>;
  }

  return (
    <div className="container mt-4">
      <div className="d-flex flex-wrap gap-3 justify-content-start mt-5">
        {favorites.map((artist) => (
          <FavoriteCard key={artist.artistId} artist={artist} />
        ))}
      </div>
    </div>
  );
};

export default FavoritesPage;
