import React, { Component } from "react";
import Table from "./components/Table";
import ProductForm from "./components/ProductForm";
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
        id: null,
        name: "",
        price: "",
      },
    };
  }

  componentDidMount() {
    this.getProducts();
  }

  // This function fetches data from the server then stores it in the state "products"
  getProducts = () => {
    fetch("http://localhost:4000/products")
      .then((response) => {
        return response.json();
      })
      .then((response) => {
        const jsonData = response.dataBaby;

        this.setState({ products: jsonData });
      })
      .catch((err) => console.error("Error with fetching GET: ", err));
    // .then(data => console.log("GET results: ", data)) // Testing whether data is fetched
  };

  addProduct = (e) => {
    e.preventDefault();

    const { product } = this.state;

    const addDetails = {
      id: product.product_id,
      name: product.name,
      price: product.price,
    };

    const postData = new URLSearchParams(addDetails);

    fetch("http://localhost:4000/products/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: postData,
    })
      .then((response) => response.text())
      // console.log("addProduct function: ", response);
      // .then((text) => console.log(text))
      .catch((error) =>
        console.error(`Error with addProduct function : ${error}`)
      )
      .then(
        this.setState({ products: [...this.state.products, { ...addDetails }] })
      );
  };

  deleteProduct = (id, e) => {
    const { products } = this.state;

    const updateProducts = products.filter(
      (product, i, arr) => product.product_id !== id
    );

    // console.log(updateProducts);

    if (window.confirm("Are you sure?")) {
      this.setState({ products: updateProducts });

      fetch(`http://localhost:4000/products/${id}`, {
        method: "DELETE",
      })
        .then((response) => response.text())
        // .then((text) => console.log(text))
        .catch((error) =>
          console.error(`Error with deleteProduct function : ${error}`)
        );
    }
  };

  submitEdit = (id, editName, editPrice, closeModal) => {
    // console.log("id: ", id);
    // console.log("editName: ", editName);
    // console.log("editPrice: ", editPrice);

    const { products } = this.state;

    const stateProducts = [...products];

    const editDetails = {
      name: editName,
      price: editPrice,
    };

    const filterEdit = stateProducts.map((product) => {
      if (id === product.product_id) {
        // This object copies the properties of every product and replaces the values of the properties from editDetails
        return {
          ...product,
          ...editDetails,
        };
      }
      return product;
    });

    // console.log(filterEdit);

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
        console.error(`Error with onSubmitEdit function : ${error}`)
      )
      .then(closeModal);
  };

  handleChange = (e) => {
    const { product } = this.state;
    this.setState({
      product: { ...product, [e.target.name]: e.target.value },
    });
    // console.log("State product: ", product);
  };

  render() {
    const { products, product } = this.state;

    // console.log(products);

    return (
      <div className="App">
        <Container>
          <Row>
            <Col></Col>
            <Col xs={8}>
              <Table
                products={products}
                deleteProduct={this.deleteProduct}
                getProducts={this.getProducts}
                submitEdit={this.submitEdit}
              />
              <ProductForm
                addProduct={this.addProduct}
                handleChange={this.handleChange}
                product={product}
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
