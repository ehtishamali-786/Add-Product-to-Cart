import React, { useState } from "react";
import { FC } from "react";
import { ProductData } from "../type";

interface Props {
  products: ProductData[];
}

const Product: FC<Props> = ({ products }) => {

  const [searchQuery, setSearchQuery] = useState<any>("");
  const [cartItems, setCartItems] = useState<ProductData[]>([]);


  const handleSearchInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  // Add Product to Cart Method 
  const handleAddToCart = () => {
    const fruit: any = products.find((fruit: any) =>
      fruit.name.toLowerCase() === searchQuery.toLowerCase()
    );
    if (fruit) {
      const existingItem = cartItems.find((item: any) => item.id === fruit.id);
      if (existingItem) {
        setCartItems((prevCartItems: any) =>
          prevCartItems.map((item: any) =>
            item.id === fruit.id ? { ...item, quantity: item.quantity + 1 } : item
          )
        );
      } else {
        setCartItems((prevCartItems) => [
          ...prevCartItems,
          { ...fruit, quantity: 1 },
        ]);
      }
    }
    setSearchQuery("");
  };

  //Increase item quantity in cart method
  const handleIncreaseQuantity = (id: number) => {
    setCartItems((prevCartItems) =>
      prevCartItems.map((item: any) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };
  //Decrease item quantity in cart method
  const handleDecreaseQuantity = (id: number) => {
    setCartItems((prevCartItems) =>
      prevCartItems
        .map((item: any) =>
          item.id === id ? { ...item, quantity: item.quantity - 1 } : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  return (

    <div className="container-fluid ">
      <div className="Products">
        <div className="product-header">
          <h2>Add Products</h2>
        </div>
        <div className="add-product">
          <div className="product-input-field">
            <label>Product</label>
            <br />
            <input type="text" placeholder="search product" onChange={handleSearchInputChange} value={searchQuery} />
          </div>
          <div className="">
            <button className="add-button" onClick={handleAddToCart}>
              Add
            </button>
          </div>
        </div>
        <div className="cartList">
          {cartItems.map((item: any, index) => (
            <div key={index} className="cartItems">
              <div>{item.name}</div>
              <div className="cartItem-Quantity">
                <span className="increaseQuantity" onClick={() => handleIncreaseQuantity(item.id)}>+</span>
                <span className="itemQuantity">{item.quantity}</span>
                <span className="increaseQuantity" onClick={() => handleDecreaseQuantity(item.id)}>-</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>


  );
};

export default Product;
