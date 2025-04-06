// src/components/ArtworkCard.jsx
import React from "react";
import PropTypes from "prop-types";
import { Card, Button } from "react-bootstrap";

const ArtworkCard = ({ artwork, onViewCategories }) => {
  return (
    <Card className="h-100 text-center">
      <Card.Img
        variant="top"
        src={artwork.imageUrl || "https://via.placeholder.com/150"}
        style={{ objectFit: "cover", height: "200px" }}
      />
      <Card.Body className="d-flex flex-column justify-content-between">
        <Card.Title className="fs-6">
          {artwork.title}, {artwork.date}
        </Card.Title>
        <Button
          variant="outline-primary"
          size="sm"
          onClick={() => onViewCategories(artwork.id, artwork.title, artwork.date)}
        >
          View categories
        </Button>
      </Card.Body>
    </Card>
  );
};

ArtworkCard.propTypes = {
  artwork: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    date: PropTypes.string,
    imageUrl: PropTypes.string,
  }).isRequired,
  onViewCategories: PropTypes.func.isRequired,
};

export default ArtworkCard;
