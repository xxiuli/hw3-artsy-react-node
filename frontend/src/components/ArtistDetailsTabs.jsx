import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import httpService from "../services/httpService"; // 
import { Tab, Nav, Row, Col,  } from "react-bootstrap";
import ArtworkCard from "./ArtworkCard"; 
import ArtistInfo from "../components/ArtistInfo"
import ArtworkModal from "../components/ArtworkModal";
import { useAuth } from "../contexts/AuthContext"; 
import NoResult from "./NoResult";import SimilarArtistWindow from "./SimilarArtistWindow";
import { useFavorites } from "../contexts/FavoritesContext"; 
import LoadingSpinner from "./LoadingSpinner";


const ArtistDetailsTabs = ({ 
  artist, 
  // isFavorited, 
  onCardSelect,
  activeTab,
  setActiveTab
 }) => {
  const { isAuthenticated } = useAuth();

  const [allArtworks, setNewArtworks] = useState([]);
  const [similarArtists, setSimilarArtists] = useState([]);
  const [loading, setLoading] = useState(false);
  const { favorites, toggleFavorite } = useFavorites();

  // const [activeTab, setActiveTab] = useState("info");

  // Modal 
  const [showModal, setShowModal] = useState(false);
  const [selectedArtwork, setSelectedArtwork] = useState(null);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    console.log("🎯 ArtistDetailsTabs received artist.id:", artist.id);
  }, [artist.id]);
  // console.log("sLoggedIn:", isAuthenticated);
  
  useEffect(() => {
    const fetchArtworks = async () => {
      setNewArtworks([]); // 
      setLoading(true);
      try {
        //artwork: id, title, date, imageUrl
        const data = await httpService.get(`/artsy/artworks/${ artist.id}`);
        console.log("🧪 useEffect activated, artist.id:", artist?.id);

        // setArtworks(data.slice(0, 5));
        setNewArtworks(data || []);
      } catch (err) {
        setNewArtworks([]);
      } finally {
        setLoading(false);
      }
    };

    fetchArtworks();
  }, [artist]);


  const handleViewCategories = async (artwork ) => {
    try {
      const gene = await httpService.get(`/artsy/genes/${artwork.id}`);
      console.log("Frontend get GENE: ", gene)

      const safeGene = Array.isArray(gene) ? gene : [];

    if (safeGene.length === 0) {
      console.warn("No categories to show.");
      return; // 
    }

      setCategories(safeGene);
      setSelectedArtwork(artwork);
      console.log("selected artwork: ", artwork)
      setShowModal(true);
    } catch (err) {
      console.error("Failed to load gene categories", err);
    }
  };

  return (
    <Tab.Container defaultActiveKey="info" activeKey={activeTab} onSelect={(k) => setActiveTab(k)}>
      <Nav variant="tabs"
          className="justify-content-center border-0 rounded overflow-hidden">
            <Nav.Item className="w-50 text-center">
              <Nav.Link eventKey="info" 
                style={{
                  border: "none",
                  borderRadius: "0.1rem",
                  backgroundColor: activeTab === "info" ? "#074c8f" : "white",
                  color: activeTab === "info" ? "white" : "#205375",
                }}>
                Artist Info
              </Nav.Link>
            </Nav.Item>
            <Nav.Item className="w-50 text-center">
              <Nav.Link eventKey="artworks"
                style={{
                  border: "none",
                  borderRadius: "0.5rem",
                  backgroundColor: activeTab === "info" ? "white" : "#074c8f",
                  color: activeTab === "info" ? "#205375" : "white",
                }} >
                Artworks
              </Nav.Link>
            </Nav.Item>
      </Nav>

      <Tab.Content className="rounded mt-3">
        <Tab.Pane eventKey="info">
          <ArtistInfo
            artist={artist}
            onCardSelect={onCardSelect}
            />
          {/* <SimilarArtistWindow
            artistId={artist.id}
            onCardSelect={onCardSelect}
            favorites={favorites}
            onToggleFavorite={toggleFavorite}
          /> */}
        </Tab.Pane>

        <Tab.Pane eventKey="artworks">
          {loading ? (
             <LoadingSpinner />
          ) : allArtworks.length === 0 ? (
            <NoResult message="No artworks."/>
          ) : (
            <Row className="g-1">
              {allArtworks.map((artwork) => (
                <Col md={3} key={artwork.id}>
                  <ArtworkCard
                    artwork={artwork}
                    onViewCategories={handleViewCategories}
                  />
                </Col>
              ))}
            </Row>
          )}
        </Tab.Pane>
      </Tab.Content>

      {/* Modal for artwork categories */}
      <ArtworkModal
        show={showModal}
        onHide={() => setShowModal(false)}
        artwork={selectedArtwork}
        categories={categories}
      />
    </Tab.Container>
  );
};

ArtistDetailsTabs.propTypes = {
  artist: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    nationality: PropTypes.string,
    biography: PropTypes.string,
  }).isRequired,
  onCardSelect: PropTypes.func,
};

ArtistDetailsTabs.defaultProps = {
  favorites: [],
  onToggleFavorite: () => {},
  onCardSelect: () => {},
};

export default ArtistDetailsTabs;
