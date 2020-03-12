import React, { Component } from "react";
import Table from "./components/Table";
import "./App.css";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

class App extends Component {
  state = {
    products: [],
    product: {
      name: "sample product",
      price: 20
    }
  };

  componentDidMount() {
    this.getProducts();
  }

  // This function fetches data from the server then stores it in the state "products"
  getProducts = () => {
    fetch("http://localhost:4000/products")
      .then(response => response.json())
      .then(response => this.setState({ products: response.dataBaby }))
      // .then(data => console.log(data)) Testing whether data is fetched
      .catch(err => console.error(err));
  };

  addProduct = () => {
    const { product } = this.state;
    fetch(
      `http://localhost:4000/products/add?name=${product.name}&price=${product.price}`
    )
      .then(this.getProducts)
      .catch(err => console.error(err));
  };

  handleChange = e => {
    const { product } = this.state;
    this.setState({
      product: { ...product, [e.target.name]: e.target.value }
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
              <Table products={products} />
              <div>
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
                <button onClick={this.addProduct}>Add product</button>
              </div>
            </Col>
            <Col></Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default App;
