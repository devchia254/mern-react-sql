import React from "react";
import DarkTable from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";

function Table(props) {
  const { products, deleteProduct } = props;

  const renderProducts = ({ product_id, name, price }) => (
    <tr key={product_id}>
      <td>{product_id}</td>
      <td>{name}</td>
      <td>{price}</td>
      <td>
        <Button variant="success">Edit</Button>
        <Button variant="danger" onClick={(e) => deleteProduct(product_id, e)}>
          Delete
        </Button>
      </td>
    </tr>
  );

  return (
    <DarkTable striped bordered hover variant="dark">
      <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Price</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>{products.map(renderProducts)}</tbody>
    </DarkTable>
  );
}

export default Table;
