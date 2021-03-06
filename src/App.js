import React, { Component } from "react";
import Table from "./components/Table/Table.js";
import ProductForm from "./components/Form/ProductForm.js";
import "./App.css";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

class App extends Component {
  constructor() {
    super();
    this.state = {
      products: [],
      product: {
        id: null, // id is generated from DB, not from form
        name: "",
        price: "",
      },
    };
  }

  // Render upon viewing
  componentDidMount() {
    this.getProducts();
  }

  // Fetches all data (from server and stores in the state - products)
  getProducts = () => {
    fetch("http://localhost:4000/products")
      .then((response) => {
        return response.json();
      })
      .then((response) => {
        const jsonArr = response.dataBaby;
        this.setState({ products: jsonArr });
      })
      .catch((err) => console.error("Error with fetching GET: ", err));
  };

  // Add product (to server then triggers getProducts function)
  addProduct = (e) => {
    e.preventDefault();

    const { product } = this.state;

    const addDetails = {
      id: product.product_id,
      name: product.name,
      price: product.price,
    };

    console.log(addDetails);

    const postData = new URLSearchParams(addDetails);

    fetch("http://localhost:4000/products/", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: postData,
    })
      .then((response) => response.text())
      .catch((error) =>
        console.error(`Error with addProduct function : ${error}`)
      )
      .then(
        // this.setState({ products: [...this.state.products, { ...addDetails }] })
        this.getProducts()
      );
  };

  // Delete Product
  deleteProduct = (id, e) => {
    const { products } = this.state;

    const updateProducts = products.filter(
      (product, i, arr) => product.product_id !== id
    );

    if (window.confirm("Are you sure?")) {
      this.setState({ products: updateProducts });

      fetch(`http://localhost:4000/products/${id}`, {
        method: "DELETE",
      })
        .then((response) => response.text())
        .catch((error) =>
          console.error(`Error with deleteProduct function : ${error}`)
        );
    }
  };

  // Edit Product
  editProduct = (id, editName, editPrice, closeModal) => {
    const { products } = this.state;

    const stateProducts = [...products];

    const editDetails = {
      name: editName,
      price: editPrice,
    };

    const filterEdit = stateProducts.map((product) => {
      if (id === product.product_id) {
        // This object clones the product that satisfies the condition above and assigns the corresponding property values from 'editDetails'.
        return {
          ...product,
          ...editDetails,
        };
      }
      return product;
    });

    this.setState({ products: filterEdit });

    const putData = new URLSearchParams(editDetails);

    fetch(`http://localhost:4000/products/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: putData,
    })
      .then((response) => response.text())
      .catch((error) =>
        console.error(`Error with editProduct function : ${error}`)
      )
      .then(closeModal);
  };

  // onChange handler (enable form input based on "name" attr)
  handleChange = (e) => {
    const { product } = this.state;
    this.setState({
      product: { ...product, [e.target.name]: e.target.value },
    });
  };

  render() {
    const { products, product } = this.state;

    return (
      <div className="App">
        <Container>
          <Row>
            <Col></Col>
            <Col xs={8}>
              <ProductForm
                addProduct={this.addProduct}
                handleChange={this.handleChange}
                product={product}
              />
              <Table
                products={products}
                deleteProduct={this.deleteProduct}
                getProducts={this.getProducts}
                editProduct={this.editProduct}
              />
            </Col>
            <Col></Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default App;
