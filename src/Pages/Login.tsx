import { signIn } from "aws-amplify/auth";
import { observer } from "mobx-react";
import React, { useState } from "react";
import { Button, Card, Container, Form, Stack } from "react-bootstrap";
import AuthStore from "../Store/AuthStore";

const Login = observer(() => {
  const [formData, setFormData] = useState({
    email: "liamgrenier95@gmail.com",
    password: "Albin123!",
  });

  const handleChange = (e: any) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    console.log(formData);
    const { nextStep } = await signIn({
      username: formData.email,
      password: formData.password,
    });

    console.log(nextStep);
    if (nextStep.signInStep === "DONE") {
      AuthStore.setIsAuthenticated(true);
      alert("authenticated !");
    }
  };

  return (
    <Container>
      <Card>
        <Card.Body>
          <Card.Title>
            <h2>Login</h2>
          </Card.Title>
          <Stack className="mb-2">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              name="email"
              onChange={(e) => handleChange(e)}
              placeholder="your@email.com"
              value={formData.email}
            />
          </Stack>

          <Stack className="mb-2">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              name="password"
              onChange={(e) => handleChange(e)}
              placeholder="Your password"
              value={formData.password}
            />
          </Stack>
          <Button onClick={handleSubmit} className="mt-2" variant="primary">
            Login
          </Button>
        </Card.Body>
      </Card>
    </Container>
  );
});

export default Login;
