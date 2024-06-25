import { generateClient } from "aws-amplify/data";
import type { Schema } from "../../amplify/data/resource";
import React, { useState } from "react";
import {
  Button,
  Card,
  Col,
  Container,
  Form,
  Row,
  Stack,
} from "react-bootstrap";

import outputs from "../../amplify_outputs.json";

import { Amplify } from "aws-amplify";
import { useNavigate } from "react-router-dom";
import { uploadData } from "aws-amplify/storage";

Amplify.configure(outputs);

const client = generateClient<Schema>({
  authMode: "userPool",
});

const PostCreate = () => {
  const [formData, setFormData] = useState({
    title: "",
    smallDescription: "",
    Thumbnail: "",
    isPublished: false,
    content: "",
  });
  const [file, setfile] = useState<File>();

  let navigate = useNavigate();

  const handlePostCreate = async () => {
    console.log(formData);

    // upload the thumbnail
    if (file) {
      let newFileName = `${new Date().getTime()}.${file.name
        .split(".")
        .slice(-1)}`;
      console.log(newFileName);
      let path = `posts/${newFileName}`;

      let response = await uploadData({
        path,
        data: file,
      });

      await client.models.Post.create({
        title: formData.title,
        smallDescription: formData.smallDescription,
        content: formData.content,
        isPublished: true,
        thumbnail: path,
      });
      navigate("/post");
    }

    // navigate("/post");
  };

  const handleChange = (e: any) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <Container>
      <Card>
        <Card.Body>
          <Card.Title>
            <h2>Create a post</h2>
          </Card.Title>
          <Row>
            <Col md={6}>
              <Stack>
                <Form.Label>Title</Form.Label>
                <Form.Control
                  type="text"
                  name="title"
                  onChange={handleChange}
                />
              </Stack>
            </Col>
            <Col md={6}>
              <Stack>
                <Form.Label>Short description</Form.Label>
                <Form.Control
                  type="text"
                  name="smallDescription"
                  onChange={handleChange}
                />
              </Stack>
            </Col>
            <Col md={6}>
              <Stack>
                <Form.Label>Thumbnail</Form.Label>
                <Form.Control
                  type="file"
                  onChange={(e: any) => {
                    setfile(e.target.files[0]);
                  }}
                />
              </Stack>
            </Col>
            <Col md={6}>
              <Stack>
                <Form.Label>published</Form.Label>
                <Form.Check
                  type="checkbox"
                  name="isPublished"
                  onChange={handleChange}
                />
              </Stack>
            </Col>
            <Col md={12} className="mb-2">
              <Stack>
                <Form.Label>Content</Form.Label>
                <textarea
                  name="content"
                  rows={4}
                  className="form-control"
                  onChange={handleChange}
                ></textarea>
              </Stack>
            </Col>
            <Col>
              <Button onClick={handlePostCreate} variant="primary">
                Create
              </Button>
            </Col>
          </Row>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default PostCreate;
