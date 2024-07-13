
const express = require("express");
const router = express.Router();
const isloggedin = require("../middlewares/isLoggedin");
const productModel = require("../models/product-model");
const userModel = require("../models/user-model");


router.get("/", (req, res) => {
    const success = req.flash('success');
    let error = req.flash("error");
    res.render("index", { error,loggedin: false,success});
});

router.get("/shop", isloggedin, async function(req, res) {
    let products = await productModel.find();
    let success = req.flash("success");
    res.render("shop", { products,success });
});

router.get("/cart", isloggedin, async function(req, res) {
    let user = await userModel.findOne({ email: req.user.email }).populate("cart");

    let total = 0;
    let bill = [];

    user.cart.forEach((item, index) => {
        bill[index] = Number(item.price) + 20 - Number(item.discount);
        total += bill[index];
    });

    res.render("cart", { user, bill, total });
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
