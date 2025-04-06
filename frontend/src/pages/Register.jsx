// src/pages/Register.jsx
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Form, Button, Container, Alert, Card } from "react-bootstrap";
import authService from "../services/authService";
import { useAuth } from "../contexts/AuthContext";
import {
    validateFullname,
    validateEmail,
    validatePassword,
  } from "../utils/validators";

const Register = () => {
  const { setUser } = useAuth();
  const navigate = useNavigate();

  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  // 单独的错误状态
  const [fullnameError, setFullnameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    const nameErr = validateFullname(fullname);
    const emailErr = validateEmail(email);
    const passErr = validatePassword(password);

    setFullnameError(nameErr);
    setEmailError(emailErr);
    setPasswordError(passErr);

    // 阻止提交
    if (nameErr || emailErr || passErr) return;

    try {
      const user = await authService.register({ fullname, email, password });
      setUser(user);
      navigate("/");
    } catch (err) {
      setError("Registration failed. Try again.");
    }
  };

  return (
    <Container style={{ maxWidth: "400px", marginTop: "100px" }}>
      <Card className="p-4 shadow-sm border">
        <h3 className="mb-4">Register</h3>
        {error && <Alert variant="danger">{error}</Alert>}

        <Form noValidate onSubmit={handleSubmit}>
            <Form.Group controlId="formFullname" className="mb-3">
                <Form.Label>Fullname</Form.Label>
                <Form.Control
                    type="text"
                    value={fullname}
                    onChange={(e) => setFullname(e.target.value)}
                    onBlur={() => setFullnameError(validateFullname(fullname))}
                    isInvalid={!!fullnameError}
                    placeholder="John Doe"
                />
                <Form.Control.Feedback type="invalid">{fullnameError}</Form.Control.Feedback>
            </Form.Group>

            <Form.Group controlId="formEmail" className="mb-3">
                <Form.Label>Email address</Form.Label>
                <Form.Control
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    onBlur={() => setEmailError(validateEmail(email))}
                    isInvalid={!!emailError}
                    placeholder="Enter email"
                />
                <Form.Control.Feedback type="invalid">{emailError}</Form.Control.Feedback>
            </Form.Group>

            <Form.Group controlId="formPassword" className="mb-4">
                <Form.Label>Password</Form.Label>
                <Form.Control
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    onBlur={() => setPasswordError(validatePassword(password))}
                    isInvalid={!!passwordError}
                    placeholder="Password"
                />
                <Form.Control.Feedback type="invalid">{passwordError}</Form.Control.Feedback>
            </Form.Group>

            <Button variant="primary" type="submit" className="w-100 mb-3">
                Register
            </Button>
        </Form>

        <div className="text-center">
            <small>
            Already have an account? <Link to="/login">Login</Link>
            </small>
        </div>
      </Card>
    </Container>
  );
};

export default Register;
