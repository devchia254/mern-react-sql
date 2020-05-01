import React from "react";
import { useForm } from "react-hook-form";

import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";

function ProductForm(props) {
  const { addProduct, handleChange, product } = props;

  const { register, handleSubmit, watch, errors } = useForm();

  const submit = (string) => {};

  const testSubmit = (data) => console.log(data);

  return (
    <Card body>
      <Form onSubmit={handleSubmit(testSubmit)}>
        <Form.Row>
          <Form.Group as={Col}>
            {/* <Form.Label>Product name:</Form.Label> */}
            <Form.Control
              placeholder="Product name"
              value={product.name}
              onChange={handleChange}
              name="name"
              type="text"
              ref={register({
                required: true,
                maxLength: 20,
              })}
            />
            {errors.name?.type === "required" && <p>Your input is required</p>}
            {errors.name?.type === "maxLength" && (
              <p>Your input exceed maxLength</p>
            )}
          </Form.Group>
          <Form.Group as={Col}>
            {/* <Form.Label>Price:</Form.Label> */}
            <Form.Control
              placeholder="Price"
              value={product.price}
              onChange={handleChange}
              name="price"
              type="number"
              ref={register({ required: true, min: 2 })}
            />
            {errors.price?.type === "min" && <p>Your input is too small</p>}
          </Form.Group>
          <Form.Group as={Col}>
            <Button variant="primary" type="submit">
              Add product
            </Button>
          </Form.Group>
        </Form.Row>
      </Form>
    </Card>
  );
}
export default ProductForm;
