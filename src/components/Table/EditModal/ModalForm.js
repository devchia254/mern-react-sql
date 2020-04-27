import React from "react";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";

function ModalForm(props) {
  const { modalProduct, handleChange } = props;

  return (
    <Form>
      <Form.Row>
        <Form.Group as={Col}>
          <Form.Label>Product name</Form.Label>
          <Form.Control
            placeholder="Product name"
            name="name"
            value={modalProduct.name}
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group as={Col}>
          <Form.Label>Price</Form.Label>
          <Form.Control
            placeholder="Price"
            name="price"
            value={modalProduct.price}
            onChange={handleChange}
          />
        </Form.Group>
      </Form.Row>
    </Form>
  );
}
export default ModalForm;
