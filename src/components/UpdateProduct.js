import React, { useEffect } from "react";
import { useParams,useNavigate } from "react-router-dom";

const UpdateProduct = () => {
  const [name, setName] = React.useState("");
  const [price, setPrice] = React.useState("");
  const [category, setCategory] = React.useState("");
  const [company, setCompany] = React.useState("");
  const params = useParams();
  const navigate=useNavigate();

  useEffect(() => {
    console.warn(params);
    getProductdetails();
  }, []);

  const getProductdetails = async () => {
    let result = await fetch(`http://192.168.0.196:5000/product/${params.id}`,{
      headers:{
        authorization:`bearer ${JSON.parse(localStorage.getItem('token'))}`
      }
    });
    result = await result.json();
    setName(result.name);
    setPrice(result.price);
    setCategory(result.category);
    setCompany(result.company);
  };

  const updateProduct = async () => {
    console.warn(name, price, category, company);
    let result=await fetch(`http://192.168.0.196:5000/product/${params.id}`,{
        method:'Put',
        body:JSON.stringify({name,price,company,category}),
        headers:{
            'content-Type':"application/json",
            authorization:`bearer ${JSON.parse(localStorage.getItem('token'))}`
        }
    })
    result=await result.json();
    console.warn(result);
    navigate('/')
  };
  return (
    <div className="product">
      <h1>Update Product</h1>
      <input
        type="text"
        value={name}
        onChange={(e) => {
          setName(e.target.value);
        }}
        placeholder="Enter product Name"
        className="inputbox"
      />

      <input
        type="text"
        value={price}
        onChange={(e) => {
          setPrice(e.target.value);
        }}
        placeholder="Enter product Price"
        className="inputbox"
      />

      <input
        type="text"
        value={category}
        onChange={(e) => {
          setCategory(e.target.value);
        }}
        placeholder="Enter product category"
        className="inputbox"
      />

      <input
        type="text"
        value={company}
        onChange={(e) => {
          setCompany(e.target.value);
        }}
        placeholder="Enter product Company"
        className="inputbox"
      />

      <button onClick={updateProduct} className="Appbutton">
        Update Product
      </button>
    </div>
  );
};

export default UpdateProduct;
