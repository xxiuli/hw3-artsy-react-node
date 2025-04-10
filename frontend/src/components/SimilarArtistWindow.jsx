import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import httpService from "../services/httpService";
import ArtistCard from "./ArtistCard";

const SimilarArtistWindow = ({ artistId, onCardSelect, favorites, onToggleFavorite }) => {
  const [similarArtists, setSimilarArtists] = useState([]);

  useEffect(() => {
    const fetchSimilarArtists = async () => {
      try {
        const data = await httpService.get(`/artsy/artists/${artistId}/similar`);
        setSimilarArtists(data.slice(0, 5));
        console.log("✅ Got similar artists:", data);
      } catch (err) {
        console.error("❌ Fetch similar artists failed", err.response?.data || err.message);
        setSimilarArtists([]);
      }
    };

    if (artistId) fetchSimilarArtists();
  }, [artistId]);

  if (similarArtists.length === 0) return null;

  return (
    <div className="mt-4">
      <h5 className="text-start">Similar Artists</h5>
      <div className="d-flex overflow-auto gap-3">
        {similarArtists.map((artist) => (
          <ArtistCard
            key={artist.id}
            artist={artist}
            isSelected={false} // optional
            onClick={() => onCardSelect(artist.id)}
          />
        ))}
      </div>
    </div>
  );
};

SimilarArtistWindow .propTypes = {
  artistId: PropTypes.string.isRequired,
  onCardSelect: PropTypes.func.isRequired,
  favorites: PropTypes.array.isRequired,
  onToggleFavorite: PropTypes.func.isRequired,
};

export default SimilarArtistWindow;
