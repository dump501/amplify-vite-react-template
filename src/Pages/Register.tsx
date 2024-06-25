import { signUp } from "aws-amplify/auth";
import { observer } from "mobx-react";
import React, { useState } from "react";
import { Button, Card, Container, Form, Stack } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import AuthStore from "../Store/AuthStore";

const Register = observer(() => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    lastName: "",
    firstName: "",
  });

  let navigate = useNavigate();

  const handleChange = (e: any) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    console.log(formData);
    try {
      // TODO: validate form
      const { nextStep, userId } = await signUp({
        username: formData.email,
        password: formData.password,
        options: {
          userAttributes: {
            family_name: formData.lastName,
            given_name: formData.firstName,
          },
        },
      });
      if (nextStep.signUpStep === "CONFIRM_SIGN_UP") {
        if (userId) {
          let user = AuthStore.user;
          user.username = formData.email;
          user.id = userId;
          AuthStore.setUser(user);
        }

        // redirect to confirm signup page
        navigate("/confirm-signup");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Container>
      <Card>
        <Card.Body>
          <Card.Title>
            <h2>Register</h2>
          </Card.Title>
          <Stack className="mb-2">
            <Form.Label>First name</Form.Label>
            <Form.Control
              type="text"
              name="firstName"
              onChange={(e) => handleChange(e)}
              placeholder="John"
            />
          </Stack>
          <Stack className="mb-2">
            <Form.Label>Last name</Form.Label>
            <Form.Control
              type="text"
              name="lastName"
              onChange={(e) => handleChange(e)}
              placeholder="Doe"
            />
          </Stack>
          <Stack className="mb-2">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              name="email"
              onChange={(e) => handleChange(e)}
              placeholder="your@email.com"
            />
          </Stack>
          <Stack className="mb-2">
            <Form.Label>Password</Form.Label>
            <Form.Text className="text-danger">
              The password should contain at least: <br /> - minimun 8
              characters <br /> - 1 uppercase <br /> - 1 lowercase <br /> - 1
              digit <br />
            </Form.Text>
            <Form.Control
              type="password"
              name="password"
              onChange={(e) => handleChange(e)}
              placeholder="Your password"
            />
          </Stack>
          <Button onClick={handleSubmit} className="mt-2" variant="primary">
            Register
          </Button>
        </Card.Body>
      </Card>
    </Container>
  );
});

export default Register;
