import PropTypes from "prop-types";
import { Modal, Row, Col, Card } from "react-bootstrap";
import GeneCard from "./GeneCard";

const ArtworkCategoriesModal = ({ show, onHide, artwork, categories }) => {
  console.log("check artwok: ", artwork)
  return (
    <Modal show={show} onHide={onHide} centered size="lg">
      <Modal.Header closeButton>
        <Modal.Title>
        {artwork &&  (
          <div className="d-flex align-items-center mb-3">
              {/* 小图 */}
              <img
                src={artwork.imageUrl}
                alt="Artwork thumbnail"
                style={{
                  width: "48px",
                  height: "48px",
                  objectFit: "cover",
                  borderRadius: "1px",
                  marginRight: "12px",
                }}
              />

              {/* 标题 + 日期 */}
              <div>
                <div style={{ fontWeight: "300", fontSize: "1rem", lineHeight: "1.2" }}>
                  {artwork.titleModal}
                </div>
                <div style={{ fontSize: "0.85rem", color: "#666" }}>{artwork.date}</div>
              </div>
            </div>
          )}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Row>
          {/* gene: id, name, imageurl */}
          {Array.isArray(categories) && categories.length > 0 ? (
            categories.map((cat) => (
              <Col md={3} key={cat.id} className="mb-3">
                <GeneCard 
                  gene={cat}/>         
              </Col>
            ))
          ):(
            <p>No categories found.</p>
          )}
          
        </Row>
      </Modal.Body>
    </Modal>
  );
};

ArtworkCategoriesModal.propTypes = {
  show: PropTypes.bool.isRequired,
  onHide: PropTypes.func.isRequired,
  artwork: PropTypes.shape({
    title: PropTypes.string,
    date: PropTypes.string,
  }),
  categories: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      name: PropTypes.string,
      imageUrl: PropTypes.string,
    })
  ).isRequired,
};

export default ArtworkCategoriesModal;
