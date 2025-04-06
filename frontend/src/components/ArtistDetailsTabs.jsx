import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import httpService from "../services/httpService"; // 如果 artworks 需要从后端拿
import { BsStar, BsStarFill } from "react-icons/bs";
import { Tab, Nav, Modal, Row, Col, Card } from "react-bootstrap";
import ArtworkCard from "./ArtworkCard"; 
import ArtistCard from "./ArtistCard";

const ArtistDetailsTabs = ({ 
  artist, 
  isLoggedIn, 
  isFavorited, 
  toggleFavorite, 
  onCardSelect,
  favorites = [],onToggleFavorite = () => {}
 }) => {
  const [artworks, setArtworks] = useState([]);
  const [similarArtists, setSimilarArtists] = useState([]);
  const [loading, setLoading] = useState(false);

  // Modal 状态
  const [showModal, setShowModal] = useState(false);
  const [selectedArtwork, setSelectedArtwork] = useState(null);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchArtworks = async () => {
      setLoading(true);
      try {
        const data = await httpService.get(`/artsy/artworks/${ artist.id}`);
        // setArtworks(data.slice(0, 5)); // 最多展示 5 个作品
        setArtworks(data);
      } catch (err) {
        setArtworks([]);
      } finally {
        setLoading(false);
      }
    };

    fetchArtworks();
  }, [artist]);

  // 获取相似艺术家
  useEffect(() => {
    const fetchSimilarArtists = async () => {
      if (!isLoggedIn) return;
      try {
        const data = await httpService.get(`/artsy/artists/${artist.id}/similar`);
        // setSimilarArtists(data);
        console.log("🎯 similar artists from backend:", data);
        setSimilarArtists(data.slice(0, 5));
      } catch (err) {
        setSimilarArtists([]);
      }
    };

    fetchSimilarArtists();
  }, [artist, isLoggedIn]);

  const handleViewCategories = async (artworkId, title, date) => {
    try {
      const data = await httpService.get(`/artsy/genes/${artworkId}`);
      console.log("Frontend get GENE: ", data)
      setCategories(data);
      setSelectedArtwork({ title, date });
      setShowModal(true);
    } catch (err) {
      console.error("Failed to load gene categories", err);
    }
  };

  return (
    <Tab.Container defaultActiveKey="info">
      <Nav variant="tabs"
          className="justify-content-center border rounded overflow-hidden">
            <Nav.Item className="w-50 text-center">
              <Nav.Link eventKey="info" className="fw-bold">
                Artist Info
              </Nav.Link>
            </Nav.Item>
            <Nav.Item className="w-50 text-center">
              <Nav.Link eventKey="artworks" className="fw-bold">
                Artworks
              </Nav.Link>
            </Nav.Item>
          </Nav>

          <Tab.Content className="p-3 border rounded bg-light mt-3">
            <Tab.Pane eventKey="info">
              <h4 className="text-primary d-flex align-items-center justify-content-center gap-2">
                {artist.name}
                {isLoggedIn && (
                  <button
                    className="btn btn-link p-0"
                    onClick={() => toggleFavorite(artist.id)} // 你可以实现这个函数
                  >
                    <i className={`bi ${isFavorited ? "bi-star-fill" : "bi-star"}`}></i>
                  </button>
                )}
              </h4>
              <h6>{artist.nationality}</h6>
              {/* 渲染段落格式的 biography */}
              {(artist.biography || "No biography available.")
                .split("\n\n")
                .map((para, idx) => (
                  <p key={idx}>{para}</p>
              ))}

              {/* Similar Artists */}
          {isLoggedIn && similarArtists.length > 0 && (
            <div className="mt-4">
              <h5>Similar Artists</h5>
              <div className="d-flex overflow-auto gap-3">
                {similarArtists.map((artist) => (
                  <ArtistCard
                    key={artist.id}
                    artist={artist}
                    isSelected={selectedArtist === artist.id}
                    onClick={() => onCardSelect(artist.id)}
                    isFavorite={favorites.includes(artist.id)}  // ✅ 是否已收藏
                    onToggleFavorite={onToggleFavorite}  
                  />
                ))}
              </div>
            </div>
          )}

            </Tab.Pane>

            <Tab.Pane eventKey="artworks">
          {loading ? (
            <p>spinner...</p>
          ) : artworks.length === 0 ? (
            <p>No artworks found.</p>
          ) : (
            <Row className="g-3">
              {artworks.map((artwork) => (
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

            {/* <Tab.Pane eventKey="artworks">
              {loading ? (<p>spinner...</p>) : (
                <div className="d-flex flex-wrap gap-3 justify-content-center">
                  {artworks.length === 0 ? (<p>No artworks found.</p>) : (
                    artworks.map((artwork) => (
                      <div key={artwork.id} className="text-center">
                        <img
                          src={artwork.imageUrl || "https://via.placeholder.com/150"}
                          alt={artwork.title}
                          style={{ width: "150px", height: "150px", objectFit: "cover" }}
                        />
                        <p className="mt-2 small">{artwork.title}</p>
                      </div>)))}
                </div>)}
            </Tab.Pane> */}
          </Tab.Content>

          {/* Modal for artwork categories */}
      <Modal show={showModal} onHide={() => setShowModal(false)} centered size="lg">
        <Modal.Header closeButton>
          <Modal.Title>
            {selectedArtwork?.title}, {selectedArtwork?.date}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row>
            {categories.map((cat) => (
              <Col md={4} key={cat.id} className="mb-3">
                <Card className="text-center">
                    <Card.Img 
                  variant="top" 
                  src={cat.imageUrl} 
                  alt={cat.name} 
                  style={{ height: "200px", objectFit: "cover" }} 
                />
                  <Card.Body>{cat.name}</Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Modal.Body>
      </Modal>
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
  isLoggedIn: PropTypes.bool,
  isFavorited: PropTypes.bool,
  toggleFavorite: PropTypes.func,
  onCardSelect: PropTypes.func,
  favorites: PropTypes.arrayOf(PropTypes.string),  // ✅ 收藏 artist 的 ID 列表
  onToggleFavorite: PropTypes.func,               // ✅ 收藏按钮点击事件
};

export default ArtistDetailsTabs;
