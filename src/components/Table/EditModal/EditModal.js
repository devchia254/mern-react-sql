import React, { Component } from "react";
import ModalForm from "./ModalForm.js";

import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

class EditModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
      modalProduct: {
        product_id: props.product_id,
        name: props.name,
        price: props.price,
      },
    };
  }

  closeModal = () => this.setState({ show: false });
  openModal = () => this.setState({ show: true });

  handleChange = (e) => {
    const { modalProduct } = this.state;
    this.setState({
      modalProduct: { ...modalProduct, [e.target.name]: e.target.value },
    });
  };

  handleEdit = (e) => {
    const { modalProduct } = this.state;

    const id = modalProduct.product_id;
    const editName = modalProduct.name;
    const editPrice = modalProduct.price;
    const closeModal = this.closeModal();

    this.props.editProduct(id, editName, editPrice, closeModal);
  };

  render() {
    const { modalProduct } = this.state;

    return (
      <div>
        <Button variant="primary" onClick={this.openModal}>
          Edit
        </Button>

        <Modal show={this.state.show} onHide={this.closeModal}>
          <Modal.Header closeButton>
            <Modal.Title>Product ID: {modalProduct.product_id}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <ModalForm
              modalProduct={this.state.modalProduct}
              handleChange={this.handleChange}
            />
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={this.closeModal}>
              Close
            </Button>
            {/* <Button variant="primary" onClick={this.closeModal}> */}
            <Button variant="primary" onClick={this.handleEdit}>
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}

export default EditModal;
