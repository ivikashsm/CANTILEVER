// const express = require("express");
// const router = express.Router();

// router.get("/",function(req,res){
//     res.render("index.ejs");
// });

// module.exports = router;


// below 14 line code mera hai

// const express = require("express");
// const router = express.Router();
// const isloggedin = require("../middlewares/isLoggedin");

// router.get("/", (req, res) => {
//     let error = req.flash("error");
//     res.render("index", { error}); // Pass an empty error string or any default value
// });

// router.get("/shop",isloggedin,function(req,res){
//     res.render("shop");
// });

// module.exports = router;

// ye niche wala chatGpt ka hai
const express = require("express");
const router = express.Router();
const isloggedin = require("../middlewares/isLoggedin");
const productModel = require("../models/product-model");
const userModel = require("../models/user-model");

// Example products data (replace this with your actual data fetching logic)
// const products = [
//     { bgcolor: 'red', image: Buffer.from(''), name: 'Product 1', panelcolor: '#ffffff', textcolor: '#000000', price: 100 },
//     { bgcolor: 'yellow', image: Buffer.from(''), name: 'Product 2', panelcolor: '#eb9e34', textcolor: '#000000', price: 300 },
//     { bgcolor: 'blue', image: Buffer.from(''), name: 'Product 3', panelcolor: '#ffffff', textcolor: '#000000', price: 200 }
// ];

router.get("/", (req, res) => {
    let error = req.flash("error");
    res.render("index", { error,loggedin: false}); // Pass an empty error string or any default value
});

router.get("/shop", isloggedin, async function(req, res) {
    let products = await productModel.find();
    let success = req.flash("success");
    res.render("shop", { products,success });
});

router.get("/cart", isloggedin, async function(req, res) {
    let user = await userModel
      .findOne({ email: req.user.email })
      .populate("cart");

      const bill = Number(user.cart[0].price) + 20 - Number(user.cart[0].discount);

    res.render("cart",{ user,bill });
});

router.get("/addtocart/:productid", isloggedin, async function(req, res) {
    let user = await userModel.findOne({email: req.user.email});
    user.cart.push(req.params.productid);
    await user.save();
    req.flash("success","Added to cart");
    res.redirect("/shop");
});


router.get("/logout",isloggedin, function(req,res){
    res.render("shop");
})

module.exports = router;
