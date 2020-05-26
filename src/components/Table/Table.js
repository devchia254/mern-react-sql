import React from "react";
import EditModal from "./EditModal/EditModal.js";

// Bootstrap components
import DarkTable from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";

function Table(props) {
  const { products, deleteProduct, editProduct } = props;

  // Make each product added from the top of the table, instead of the bottom
  const reversedProducts = products.reverse();

  const renderProducts = ({ product_id, name, price }, row_no) => (
    <tr key={product_id}>
      <td>{row_no + 1}</td>
      <td>{name}</td>
      <td>{price}</td>
      <td>
        <EditModal
          product_id={product_id}
          name={name}
          price={price}
          editProduct={editProduct}
        />
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
          <th>No.</th>
          <th>Name</th>
          <th>Price</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>{reversedProducts.map(renderProducts)}</tbody>
    </DarkTable>
  );
}

export default Table;
