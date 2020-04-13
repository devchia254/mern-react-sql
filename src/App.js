import React, { Component } from "react";
import Table from "./components/Table";
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
        name: "sample product",
        price: 20,
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
        // console.log("getProducts function: ", response);
        return response.json();
      })
      .then((response) => this.setState({ products: response.dataBaby }))
      .catch((err) => console.error("Error with fetching GET: ", err));
    // .then(data => console.log("GET results: ", data)) // Testing whether data is fetched
  };

  addProduct = (e) => {
    e.preventDefault();

    const { product } = this.state;

    const formData = new URLSearchParams({
      name: product.name,
      price: product.price,
    });

    fetch("http://localhost:4000/products/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: formData,
    })
      .then((response) => response.text())
      // console.log("addProduct function: ", response);
      // .then((text) => console.log(text))
      .catch((error) =>
        console.error(`Error with addProduct function : ${error}`)
      )
      .then(this.getProducts());
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

    return (
      <div className="App">
        <Container>
          <Row>
            <Col></Col>
            <Col xs={8}>
              <Table products={products} />
              <form onSubmit={this.addProduct}>
                <input
                  name="name"
                  value={product.name}
                  onChange={this.handleChange}
                />
                <input
                  name="price"
                  value={product.price}
                  onChange={this.handleChange}
                />
                <button type="submit">Add product</button>
              </form>
            </Col>
            <Col></Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default App;
