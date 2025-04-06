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
  const { setUser } = useAuth();           // ✅ 从 context 获取 setUser 方法
  const navigate = useNavigate();          // ✅ 登录成功后跳转首页
  const [email, setEmail] = useState("");  // 表单输入状态
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null); // 错误提示

  // 单独的错误状态
  const [emailError, setEmailError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    const emailErr = validateEmail(email);
    setEmailError(emailErr);

    // 阻止提交
    if ( emailErr) return;

    try {
      const user = await authService.login({ email, password }); // ✅ 向后端发起登录
      setUser(user);     // ✅ 把登录后的用户存入 AuthContext
      navigate("/");     // ✅ 登录成功后跳转首页
    } catch (err) {
      setError("Invalid email or password");
    }
  };

  return (
    <Container style={{ maxWidth: "400px", marginTop: "100px" }}>
      <Card className="p-4 shadow-sm border">
        <h3 className="mb-4">Login</h3>
        {error && <Alert variant="danger">{error}</Alert>}

        <Form noValidate onSubmit={handleSubmit}>
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
                    required
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                />
                <Form.Control.Feedback type="invalid">Password is required</Form.Control.Feedback>
            </Form.Group>

            <Button variant="primary" type="submit" className="w-100 mb-3">
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
