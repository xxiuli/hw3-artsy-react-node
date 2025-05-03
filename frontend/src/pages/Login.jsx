import { useState } from "react";
import { useNavigate } from "react-router-dom";
import authService from "../services/authService";
import { useAuth } from "../contexts/AuthContext";
import { Form, Button, Container, Alert, Card } from "react-bootstrap";
import { Link, useLocation } from "react-router-dom";
import {
    validateFullname,
    validateEmail,
    validatePassword,
  } from "../utils/validators";

const Login = () => {
  const { setUser } = useAuth();           
  const navigate = useNavigate();          
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState(null);
  const [emailError, setEmailError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const emailErr = validateEmail(email);
    const passwordError = validatePassword(password);
    setEmailError(emailErr);
    setPasswordError(passwordError);

    // 阻止提交
    if ( emailErr || passwordError) return;

    try {
      const user = await authService.login({ email, password }); 
      setUser(user);     
      navigate("/");    
    } catch (err) {
      setPasswordError("Invalid email or password");
    }
  };

  const isFormValid = email && password && !emailError;

  return (
    <Container style={{ maxWidth: "400px", marginTop: "100px" }}>
      <Card className="p-4 shadow-sm border">
        <h3 className="mb-4">Login</h3>
        <Form noValidate onSubmit={handleSubmit}>
            <Form.Group controlId="formEmail" className="mb-3 text-start">
                <Form.Label>Email address</Form.Label>
                <Form.Control
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    onBlur={() => {
                      const emailValidationError = validateEmail(email);
                      setEmailError(emailValidationError);
                    }}
                    isInvalid={!!emailError}
                    placeholder="Enter email"
                />
                <Form.Control.Feedback type="invalid">{emailError}</Form.Control.Feedback>
            </Form.Group>

            <Form.Group controlId="formPassword" className="mb-4 text-start">
                <Form.Label>Password</Form.Label>
                <Form.Control
                    type="password"
                    value={password}
                    required
                    onChange={(e) => setPassword(e.target.value)}
                    onBlur={() => {
                      const passwordValidationError = validatePassword(password);
                      setPasswordError(passwordValidationError);
                    }}
                    isInvalid={!!passwordError}
                    placeholder="Password"
                />
                <Form.Control.Feedback type="invalid">{passwordError}</Form.Control.Feedback>
            </Form.Group>

            <Button variant="primary" type="submit" className="w-100 mb-3" disabled={!isFormValid}>
            Log In
            </Button>
        </Form>

        <div className="text-center">
            <small>
            Don’t have an account yet? <Link to="/register">Register</Link>
            </small>
        </div>
      </Card>
    </Container>
  );
};

export default Login;
