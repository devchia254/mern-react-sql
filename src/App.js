import React, { Component } from "react";
import "./App.css";

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

  renderProduct = ({ product_id, name, price }) => (
    <div key={product_id}>
      {name} {price}
    </div>
  );

  addProduct = () => {
    const { product } = this.state;
    fetch(
      `http://localhost:4000/products/add?name=${product.name}&price=${product.price}`
    )
      .then(this.getProducts)
      .catch(err => console.error(err));
  };

  render() {
    const { products, product } = this.state;

    return (
      <div className="App">
        {products.map(this.renderProduct)}
        <div>
          <input
            value={product.name}
            onChange={e =>
              this.setState({ product: { ...product, name: e.target.value } })
            }
          />
          <input
            value={product.price}
            onChange={e =>
              this.setState({ product: { ...product, price: e.target.value } })
            }
          />
          <button onClick={this.addProduct}>Add product</button>
        </div>
      </div>
    );
  }
}

export default App;
