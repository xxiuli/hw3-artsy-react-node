// src/components/ArtworkCard.jsx
import PropTypes from "prop-types";
import { Card, Button } from "react-bootstrap";
import React, { useState } from "react";

const ArtworkCard = ({ artwork, onViewCategories }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Card style={{
      width: "230px",
      border: "1px solid rgb(246, 240, 240)",
      borderRadius: "8px",
      overflow: "hidden", 
      padding: 0,}}
      >

      <Card.Img
        variant="top"
        src={artwork.imageUrl}
        style={{
          objectFit: "cover",
          width: "100%",
          display: "block",}}/>

      {/* Info + Button Section */}
      <div style={{
          backgroundColor: "white",
          // padding: "0.75rem 0",
          textAlign: "center",}}>
            
          {/* Title */}
          <div style={{
            fontSize: "0.9rem",
            fontWeight: "500",
            padding: "0.75rem 1.5rem",
            marginBottom: "0.5rem",
          }}
            > {artwork.title}, {artwork.date}
          </div>

          {/* Full-width Button */}
          <div
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
            style={{
              width:"100%",
              backgroundColor: isHovered ? "#074c8f" : "#eceef1",
              color: isHovered ? "white" : "#333",  
              padding: "0.3rem 0",
              cursor: "pointer",                
              fontSize: "1rem",
              fontWeight: "500",
              userSelect: "none",   
                        }}           
            
            onClick={() => onViewCategories(artwork)}
            >View categories
          </div>
        </div>
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
