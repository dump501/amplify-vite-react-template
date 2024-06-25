import React, { useState } from "react";
import { Button, Card, Container, Form, Stack } from "react-bootstrap";
import AuthStore from "../Store/AuthStore";
import { observer } from "mobx-react";
import { confirmSignUp, resendSignUpCode } from "aws-amplify/auth";
import { useNavigate } from "react-router-dom";

const ConfirmSignUp = observer(() => {
  const [formData, setFormData] = useState({
    code: "",
  });

  let navigate = useNavigate();

  const handleChange = (e: any) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    console.log(formData);
    try {
      const { nextStep } = await confirmSignUp({
        username: AuthStore.user.username!,
        confirmationCode: formData.code,
      });

      console.log(nextStep);

      if (nextStep.signUpStep === "DONE") {
        navigate("/login");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleResend = async () => {
    try {
      await resendSignUpCode({
        username: AuthStore.user.username!,
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Container>
      <Card>
        <Card.Body>
          <Card.Title>
            <h2>Confirm the code send to you</h2>
          </Card.Title>
          <div>
            A code has been sent to <strong>{AuthStore.user.username}</strong>{" "}
          </div>
          <Stack className="mb-2">
            <Form.Label>Code</Form.Label>
            <Form.Control
              type="text"
              name="code"
              onChange={(e) => handleChange(e)}
              placeholder="123456"
            />
          </Stack>
          <Button
            onClick={handleSubmit}
            className="mt-2 me-3"
            variant="primary"
          >
            confirm
          </Button>
          <Button onClick={handleResend} className="mt-2" variant="secondary">
            Re-send code
          </Button>
        </Card.Body>
      </Card>
    </Container>
  );
});

export default ConfirmSignUp;
