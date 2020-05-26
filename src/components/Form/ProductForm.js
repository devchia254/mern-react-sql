import React from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";

function ProductForm(props) {
  const { addProduct, handleChange, product } = props;

  return (
    <Form
      style={{ marginTop: "2em", marginBottom: "2em" }}
      onSubmit={addProduct}
    >
      <Form.Row>
        <Form.Group as={Col}>
          {/* <Form.Label>Product name:</Form.Label> */}
          <Form.Control
            placeholder="Product name"
            name="name"
            value={product.name}
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group as={Col}>
          {/* <Form.Label>Price:</Form.Label> */}
          <Form.Control
            placeholder="Price"
            name="price"
            value={product.price}
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group as={Col}>
          <Button variant="primary" type="submit">
            Add product
          </Button>
        </Form.Group>
      </Form.Row>
    </Form>
  );
}
export default ProductForm;
