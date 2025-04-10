import { useState } from "react";
import PropTypes from "prop-types";
import { Form, InputGroup, Button } from "react-bootstrap";

const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);


  const handleSearch = async (e) => {
    e.preventDefault();
    if (!query.trim()) return;

    setLoading(true);

    try {
      await onSearch(query.trim());
    } finally {
      setLoading(false); // 👈 无论成功失败都结束 loading
    }
  };

  const handleClear = () => {
    setQuery("");
    setLoading(false);
    onSearch(""); // 清空搜索结果
  };

  return (
    
    <Form onSubmit={handleSearch} className="d-flex justify-content-center">
      <InputGroup>
        <Form.Control
          placeholder="Please enter an artist name."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <Button 
            type="submit" 
            disabled={!query||loading} 
            style= {{
              backgroundColor: "#0b4a8b", 
              borderColor: "#0b4a8b", 
              color: "white", 
              fontSize: "0.9rem", 
              width:"90px",
            }}
            className="d-flex align-items-center"
              >Search
          {loading && (
           <span className="spinner-border spinner-border-sm ms-auto" role="status" aria-hidden="true"></span>
          )}
        </Button>
        <Button variant="outline-secondary" className="btn btn-secondary " style={{color:"white", fontSize: "0.9rem", width:"70px"}} type="button" onClick={handleClear}>
          Clear
        </Button>
      </InputGroup>
    </Form>
  );
};

SearchBar.propTypes = {
  onSearch: PropTypes.func.isRequired,
};

export default SearchBar;
