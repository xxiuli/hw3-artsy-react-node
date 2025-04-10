import PropTypes from "prop-types";
import ArtistCard from "./ArtistCard";

const ArtistCardWindow = ({ artists, selectedArtistId, onCardSelect}) => {
  
  console.log("ArtistCardWindow received selectedArtist ID:", selectedArtistId);

  return (
    <div className="my-4 scrollbar-visible" style={{ height: "280px",overflowX:"auto",whiteSpace: "nowrap", }}>
      <div className="d-inline-flex gap-3 ">
        {artists.map((artist) => (
          <ArtistCard
            key={artist.id}
            artist={artist}
            isSelected={selectedArtistId === artist.id}
            // onClick={() => onCardSelect(artist.id)}
            onClick={() => onCardSelect(artist)}
          />
        ))}
      </div>
    </div>
  );
};

ArtistCardWindow.propTypes = {
  artists: PropTypes.array.isRequired,
  selectedArtistId: PropTypes.string,
  onCardSelect: PropTypes.func.isRequired,
};

export default ArtistCardWindow;
