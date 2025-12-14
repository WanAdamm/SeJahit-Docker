import "bootstrap/dist/css/bootstrap.min.css";
import { useRef } from "react";
import { Container, Row, Col, Form, Button, Card } from "react-bootstrap";
import { useFetcher, Link } from "react-router-dom";

const LoginPage = () => {
  const formFetcher = useFetcher();
  const formRef = useRef();

  return (
    <div>
      <Container
        className="d-flex justify-content-center align-items-center"
        style={{ height: "70vh" }}
      >
        <Row>
          <Col>
            <Card className="shadow-sm" style={{ width: "24rem" }}>
              <Card.Body className="text-center">
                {/* Logo */}
                <div className="flex justify-center items-center">
                  <img src="src/assets/logo2.png" alt="Logo" className="mb-1" />
                </div>

                {/* Login Title */}
                <h4 className="mb-3 font-bold">Log in</h4>
                {/* Form */}
                <formFetcher.Form method="post" action="" ref={formRef}>
                  {/* Username Field */}
                  <Form.Group controlId="Username" className="mb-3">
                    <Form.Control
                      type="text"
                      name="username"
                      placeholder="Username"
                      className="py-2"
                      required
                    />
                  </Form.Group>

                  {/* Password Field */}
                  <Form.Group controlId="Password" className="mb-3">
                    <Form.Control
                      type="password"
                      name="password"
                      placeholder="Password"
                      className="py-2"
                      required
                    />
                  </Form.Group>

                  {/* Hidden Input */}
                  <input type="hidden" name="_action" value="login" />

                  {/* Submit Button */}
                  <Button variant="dark" type="submit" className="w-100 py-2">
                    Log In
                  </Button>

                  <Link to="/register" className="text-black no-underline">
                    <p>No account? Register instead.</p>
                  </Link>
                </formFetcher.Form>

                {/* Privacy */}
                <p className="mt-3 mb-0">
                  <a
                    href="#privacy"
                    className="text-muted"
                    style={{ fontSize: "0.9rem" }}
                  >
                    Privacy
                  </a>
                </p>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default LoginPage;
