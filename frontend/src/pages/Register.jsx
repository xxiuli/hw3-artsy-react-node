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
import httpService from "../services/httpService";

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

  const checkEmailExist = async (emailToCheck) => {
    if (!validateEmail(emailToCheck)) return;
  
    try {
      const res = await httpService.get(`/api/auth/check-email?email=${encodeURIComponent(emailToCheck)}`);
      if (res.data.exists) {
        setEmailError("Email is already registered.");
      } else {
        setEmailError("");
      }
    } catch (err) {
      console.error("Email check failed:", err);
      setEmailError("Could not validate email.");
    }
  };

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
      console.log("In Register page, sign up:", user)
      setUser(user);
      navigate("/");
    } catch (err) {
      setError("Registration failed. Try again.");
      const message = err.response?.data?.message;
      if (message?.includes("email")) setEmailError(message);
      else if (message?.includes("fullname")) setFullnameError(message);
      else setError("Registration failed. Try again.");
    }
  };

  const isFormValid =
    fullname && email && password &&
    !fullnameError && !emailError && !passwordError;

  return (
    <Container style={{ maxWidth: "400px", marginTop: "100px" }}>
      <Card className="p-4 shadow-sm border">
        <h3 className="mb-4">Register</h3>
        <Form noValidate onSubmit={handleSubmit}>
            <Form.Group controlId="formFullname" className="mb-3 text-start">
                <Form.Label>Fullname</Form.Label>
                <Form.Control
                    type="text"
                    value={fullname}
                    onChange={(e) => setFullname(e.target.value)}
                    onBlur={() => setFullnameError(validateFullname(fullname))}
                    isInvalid={!!fullnameError}
                    placeholder="John Doe"
                    required
                />
                <Form.Control.Feedback type="invalid">{fullnameError}</Form.Control.Feedback>
            </Form.Group>

            <Form.Group controlId="formEmail" className="mb-3 text-start">
                <Form.Label>Email address</Form.Label>
                <Form.Control
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    onBlur={() => {
                      const emailValidationError = validateEmail(email);
                      setEmailError(emailValidationError);
                      if (!emailValidationError) checkEmailExist(email);
                    }}
                    isInvalid={!!emailError}
                    placeholder="Enter email"
                    required
                />
                <Form.Control.Feedback type="invalid">{emailError}</Form.Control.Feedback>
            </Form.Group>

            <Form.Group controlId="formPassword" className="mb-4 text-start">
                <Form.Label className="text-start">Password</Form.Label>
                <Form.Control
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    onBlur={() => setPasswordError(validatePassword(password))}
                    isInvalid={!!passwordError}
                    required      
                    placeholder="Password"
                />
                <Form.Control.Feedback type="invalid">{passwordError}</Form.Control.Feedback>
            </Form.Group>

            <Button variant="primary" type="submit" className="w-100 mb-3"
              disabled={!isFormValid}>
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
