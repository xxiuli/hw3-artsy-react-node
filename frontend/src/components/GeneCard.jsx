// src/components/ArtworkCard.jsx
import PropTypes from "prop-types";
import { Card} from "react-bootstrap";

const GeneCard = ({ gene }) => {

  return (
    <Card style={{
      width: "100%",
      border: "1px solid rgb(246, 240, 240)",
      borderRadius: "5px",
      overflow: "hidden", 
      backgroundColor:"white",
      padding: 0,}}
      >

      <Card.Img
        variant="top"
        src={gene.imageUrl}
        alt={gene.name}
        style={{
          objectFit: "cover",
          width: "100%",
          height: "220px",
          display: "block",}}/>

      {/* Info */}
      <div
        style={{
          backgroundColor: "#fff",
          padding: "0.5rem 0.75rem",
          minHeight: "48px", // ✅ 增加高度
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
        }}
      >
        <span
          style={{
            fontSize: "0.9rem",
            fontWeight: 400,
            lineHeight: "1.2",
            wordBreak: "break-word", // ✅ 避免长词溢出
          }}
        >
          {gene.name}
        </span>
      </div>
    </Card>
  );
};

GeneCard.propTypes = {
  gene: PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string,
    imageUrl: PropTypes.string,
  }).isRequired,
};

export default GeneCard;
