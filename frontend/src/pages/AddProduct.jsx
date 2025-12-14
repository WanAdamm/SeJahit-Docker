import "bootstrap/dist/css/bootstrap.min.css";
import { useRef } from "react";
import { Container, Row, Col, Form, Button, Card } from "react-bootstrap";
import { useFetcher } from "react-router-dom";

const AddProduct = () => {
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
                <h4 className="mb-3 font-bold">Add Your Product</h4>
                {/* Form */}
                <formFetcher.Form method="post" action="" ref={formRef}>
                  {/* Name Field */}
                  <Form.Group controlId="Name" className="mb-3">
                    <Form.Control
                      type="text"
                      name="name"
                      placeholder="Name"
                      className="py-2"
                      required
                    />
                  </Form.Group>

                  {/* Price Field */}
                  <Form.Group controlId="Price" className="mb-3">
                    <Form.Control
                      type="text"
                      name="price"
                      placeholder="RM 0"
                      className="py-2"
                      required
                    />
                  </Form.Group>

                  {/* About Field */}
                  <Form.Group controlId="About" className="mb-3">
                    <Form.Control
                      type="text"
                      name="about"
                      placeholder="About"
                      className="py-2"
                      required
                    />
                  </Form.Group>

                  {/* Type Field (Dropdown) */}
                  <Form.Group controlId="Type" className="mb-3">
                    <Form.Select name="type" required>
                      <option value="shirt">Shirt</option>
                      <option value="pants">Pants</option>
                      <option value="outerwear">Outerwear</option>
                    </Form.Select>
                  </Form.Group>

                  {/* Hidden Input */}
                  <input type="hidden" name="_action" value="addClothe" />

                  {/* Submit Button */}
                  <Button variant="dark" type="submit" className="w-100 py-2">
                    Add Product
                  </Button>
                </formFetcher.Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default AddProduct;
