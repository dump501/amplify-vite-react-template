import React, { useEffect, useState } from "react";
import { Button, Card, Col, Container, Row, Stack } from "react-bootstrap";
import { Link } from "react-router-dom";
import { amplifyClient } from "../utils";
import { Schema } from "../../amplify/data/resource";
import { StorageImage } from "@aws-amplify/ui-react-storage";

const Posts = () => {
  const [posts, setposts] = useState<Array<Schema["Post"]["type"]>>([]);

  useEffect(() => {
    amplifyClient.models.Post.observeQuery().subscribe({
      next: (data) => setposts([...data.items]),
    });
  }, []);

  return (
    <Container>
      <Stack direction="horizontal">
        <Link to="/post/create" className="btn btn-primary">
          Create Post
        </Link>
      </Stack>
      <Row>
        {posts.map((item, i) => (
          <Col md={4} key={i}>
            <Card>
              <StorageImage height={200} alt="" path={item.thumbnail!} />
              <Card.Body>
                <Card.Title>{item.title}</Card.Title>
                {item.smallDescription}
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default Posts;
