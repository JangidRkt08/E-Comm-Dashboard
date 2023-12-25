const express = require("express");
const cors = require("cors");
const Product = require("./db/Product");
require("./db/config");

const Jwt = require("jsonwebtoken");
const jwtKey = "e-comm";

const User = require("./db/user");
const app = express();
app.use(express.json());
app.use(cors());

app.post("/register", async (req, resp) => {
  let user = new User(req.body);
  let result = await user.save();

  //   ######## DELETING PASSWORD #########

  result = result.toObject();
  delete result.password;
  Jwt.sign({ result }, jwtKey, { expiresIn: "2h" }, (err, token) => {
    if (err) {
      resp.send({ result: "Something went wrong" });
    }
    resp.send({ result, auth: token });
  });
});
// ####### ADDING PRODUCTS ######

app.post("/add-product", verifyToken,async (req, resp) => {
  let product = new Product(req.body);
  let result = await product.save();
  resp.send(result);
});

app.post("/login", async (req, resp) => {
  // ######## REMOVING PASSWORD USING SELECT ########

  if (req.body.password && req.body.Email) {
    let user = await User.findOne(req.body).select("-password");
    // user=await user.json();

    if (user) {
      Jwt.sign({ user }, jwtKey, { expiresIn: "2h" }, (err, token) => {
        if (err) {
          resp.send({ result: "Something went wrong" });
        }
        resp.send({ user, auth: token });
      });
    } else {
      resp.send({ result: "User not Found" });
    }
  } else {
    resp.send({ result: "No User Found" });
  }
});

// ###### DELETING PRODUCTS ######

app.get("/products",verifyToken, async (req, resp) => {
  let products = await Product.find();
  if (products.length > 0) {
    resp.send(products);
  } else {
    resp.send({ result: "no products found" });
  }
});

app.delete(`/product/:id`,verifyToken, async (req, resp) => {
  const result = await Product.deleteOne({ _id: req.params.id });
  resp.send(result);
});

// ###### UPDATING PRODUCT ######

app.get("/product/:id", verifyToken,async (req, resp) => {
  let result = await Product.findOne({ _id: req.params.id });
  if (result) {
    resp.send(result);
  } else {
    resp.send({ result: "No Record Found" });
  }
});

app.put(`/product/:id`,verifyToken, async (req, resp) => {
  let result = await Product.updateOne(
    { _id: req.params.id },
    {
      $set: req.body,
    }
  );
  resp.send(result);
});

// ###### SEARCHING PRODUCT ######

app.get("/search/:key", verifyToken, async (req, resp) => {
  let result = await Product.find({
    $or: [
      { name: { $regex: req.params.key } },
      { company: { $regex: req.params.key } },
      { price: { $regex: req.params.key } },
      { category: { $regex: req.params.key } },
    ],
  });
  resp.send(result);
});
// ###### MIDDLEWARE ######

function verifyToken(req, resp, next) {
  let token = req.headers["authorization"];
  if (token) {
    token = token.split(" ")[1];
    Jwt.verify(token, jwtKey, (err, valid) => {
      if (err) {
        resp.status(401).send({ result: "Please add valid token " });
      } else {
        next();
      }
    });
  } else {
    resp.status(403).send({ result: "Please add token with header" });
  }
  // console.warn("middleware called...", token);
  // next();
}

app.listen(5000);
