import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
const ProductList = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    getProducts();
  }, []);

  //   ######## ADDING/GETTING PRODUCTS API ########

  const getProducts = async () => {
    let result = await fetch("http://192.168.0.196:5000/products",{
      headers:{
        authorization:`bearer ${JSON.parse(localStorage.getItem('token'))}`
      }
    })
    result = await result.json();
    setProducts(result);
  };

  //   ######## DELETING PRODUCTS API ########

  const deleteProduct = async (id) => {
    console.warn(id);

    let result = await fetch(`http://192.168.0.196:5000/product/${id}`, {
      method: "Delete",
      headers:{
        authorization:`bearer ${JSON.parse(localStorage.getItem('token'))}`
      }
    });
    result = await result.json();
    console.warn(result);
    if (result) {
      getProducts();
    }
    console.warn("products:", products);
  };


  //   ######## PRODUCT DISPLAY TABLE ########
  
const searchHandle= async (event)=>{
    // console.warn(event.target.value)
    let key= event.target.value;
    if(key){

        let result=await fetch(`http://192.168.0.196:5000/search/${key}`,{
          headers:{
            authorization:`bearer ${JSON.parse(localStorage.getItem('token'))}`
          }
        })
        result=await result.json();
        if (result)
        {
            setProducts(result)
        } 
    }else{
        getProducts();
    }
}
  return (
    <div className="product-list">
      <h1>Product List</h1>
      <input className="search-bar" type="text" placeholder="Search Product"
     onChange={searchHandle}
      />

      <ul>
        <li>S. No</li>
        <li>Name</li>
        <li>Price</li>
        <li>Category</li>
        <li>Operation</li>
      </ul>
      {
      products.length>0? products.map((item, index) => (
        <ul key={item._id}>
          <li>{index + 1}</li>
          <li>{item.name}</li>
          <li>{item.price}$</li>
          <li>{item.category}</li>
          <li>
            <button onClick={() => deleteProduct(item._id)}>Delete</button>

            {/* ###### CREATING ROUTE TO UPDATE SECTION ###### */}
            <Link to={"/update/" + item._id}>Update</Link>
          </li>
        </ul>
      ))
      :<h1>No Result Found</h1>
      }
    </div>
  );
};

export default ProductList;
