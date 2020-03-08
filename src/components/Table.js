import React from "react";

function Table(props) {
  const { products } = props;

  const renderProducts = ({ product_id, name, price }) => (
    <tr key={product_id}>
      <td>{product_id}</td>
      <td>{name}</td>
      <td>{price}</td>
    </tr>
  );

  return (
    <div>
      <table className="table table-dark table-striped">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>{products.map(renderProducts)}</tbody>
      </table>
    </div>
  );
}

export default Table;
