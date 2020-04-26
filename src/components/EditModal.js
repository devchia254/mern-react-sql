import React, { Component } from "react";

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Modal from "react-bootstrap/Modal";

class EditModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
      editProduct: {
        product_id: props.product_id,
        name: props.name,
        price: props.price,
      },
    };
  }

  closeModal = () => this.setState({ show: false });
  openModal = () => this.setState({ show: true });

  handleChange = (e) => {
    const { editProduct } = this.state;
    this.setState({
      editProduct: { ...editProduct, [e.target.name]: e.target.value },
    });
  };

  onSubmitEdit = (e) => {
    const { editProduct } = this.state;

    const id = editProduct.product_id;
    const editName = editProduct.name;
    const editPrice = editProduct.price;
    const closeModal = this.closeModal();

    this.props.submitEdit(id, editName, editPrice, closeModal);

    // this.closeModal();

    // const putData = new URLSearchParams({
    //   name: editProduct.name,
    //   price: editProduct.price,
    // });
  };

  render() {
    const { editProduct } = this.state;

    return (
      <div>
        <Button variant="primary" onClick={this.openModal}>
          Edit
        </Button>

        <Modal show={this.state.show} onHide={this.closeModal}>
          <Modal.Header closeButton>
            <Modal.Title>Product ID: {editProduct.product_id}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Row>
                <Form.Group as={Col}>
                  <Form.Label>Product name</Form.Label>
                  <Form.Control
                    placeholder="Product name"
                    name="name"
                    value={editProduct.name}
                    onChange={this.handleChange}
                  />
                </Form.Group>
                <Form.Group as={Col}>
                  <Form.Label>Price</Form.Label>
                  <Form.Control
                    placeholder="Price"
                    name="price"
                    value={editProduct.price}
                    onChange={this.handleChange}
                  />
                </Form.Group>
              </Form.Row>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={this.closeModal}>
              Close
            </Button>
            {/* <Button variant="primary" onClick={this.closeModal}> */}
            <Button variant="primary" onClick={this.onSubmitEdit}>
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}

export default EditModal;
