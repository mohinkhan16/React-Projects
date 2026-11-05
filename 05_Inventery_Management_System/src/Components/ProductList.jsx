
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {handleDetele,setEditval} from "../Features/InventerySlice";

const ProductList = () => {

  const product = useSelector((state) => state.inventory.products);

  const dispatch = useDispatch();

  const [productQuery, setProductQuery] = useState({
    search: "",
    sort: "asc",
  });

  const handleChange = (field, e) => {
    setProductQuery((prod) => ({
      ...prod,
      [field]: e.target.value,
    }));
  };


  const handleReset = () => {
    setProductQuery({
      search: "",
      sort: "asc",
    });
  };


  const filterList = product.filter((p) =>
    p.name.toLowerCase().includes(
      productQuery.search.toLowerCase()
    )
  );

  const sortedList = [...filterList].sort((a, b) => {

    if (productQuery.sort === "asc") {
      return Number(a.id) - Number(b.id);
    }

    if (productQuery.sort === "desc") {
      return Number(b.id) - Number(a.id);
    }

    if (productQuery.sort === "priceAscending") {
      return Number(a.price) - Number(b.price);
    }

    if (productQuery.sort === "priceDescending") {
      return Number(b.price) - Number(a.price);
    }

    if (productQuery.sort === "QtyAsc") {
      return Number(a.qty) - Number(b.qty);
    }

    if (productQuery.sort === "QtyDesc") {
      return Number(b.qty) - Number(a.qty);
    }

    return 0;
  });

  return (
    <>
      <hr />

      <h2>Product List</h2>

      <input
        type="text"
        value={productQuery.search}
        placeholder="Enter product name"
        onChange={(e) =>
          handleChange("search", e)
        }
      />

      <select
        value={productQuery.sort}
        onChange={(e) =>
          handleChange("sort", e)
        }
      >
        <option value="asc">Ascending</option>
        <option value="desc">Descending</option>
        <option value="priceAscending">Price Ascending</option>
        <option value="priceDescending">Price Descending</option>
        <option value="QtyAsc">Quantity Ascending</option>
        <option value="QtyDesc">Quantity Descending</option>
      </select>

      <button
        type="button"
        onClick={handleReset}
      >
        Reset
      </button>

<br />
<br />
      {sortedList.length > 0 ? (

        <table border={1} cellPadding={5}>

          <thead>
            <tr>
              <th>Id</th>
              <th>Name</th>
              <th>Qty</th>
              <th>Price</th>
              <th>Category</th>
              <th colSpan={2}>Actions</th>
            </tr>
          </thead>

          <tbody>
            {sortedList.map((p, index) => (

              <tr key={p.id}>
                <td>{index + 1}</td>
                <td>{p.name}</td>
                <td>{p.qty}</td>
                <td>₹{p.price}</td>
                <td>{p.category}</td>

                <td>
                  <button
                    onClick={() =>
                      dispatch(setEditval(p))
                    }
                  >
                    Edit
                  </button>
                </td>

                <td>
                  <button
                    onClick={() =>
                      dispatch(handleDetele(p.id))
                    }
                  >
                    Delete
                  </button>
                </td>

              </tr>

            ))}
          </tbody>

        </table>

      ) : (

        <h3>No Products found  </h3>

      )}

    </>
  );
};

export default ProductList;
