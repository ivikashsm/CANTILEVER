// const express = require("express");
// const router = express.Router();
// const ownerModel = require("../models/owner-model");

// if(process.env.NODE_ENV === "development")
//     {
//         router.post("/create", async function(req,res){
//             let owners = await ownerModel.find();
//              if(owners.length > 0)
//             {
//                 return res
//                 .status(503)
//                 .send("You don't have permission to create a new owner.");
//             }
        
//         let {fullname,email,password} = req.body;
        
//         let createdOwner = await ownerModel.create({
//                 fullname,
//                 email,
//                 password,
//                 });
//                 res.status(201).send(createdOwner);
            
//         });
        
//     }
//     router.get("/admin", function(req,res){
//      res.render("createproducts");
//       });    

// module.exports = router;

//the below is from chatgpt
const express = require("express");
const router = express.Router();
const ownerModel = require("../models/owner-model");

if (process.env.NODE_ENV === "development") {
    router.post("/create", async function(req, res) {
        let owners = await ownerModel.find();
        if (owners.length > 0) {
            return res
                .status(503)
                .send("You don't have permission to create a new owner.");
        }
    
        let { fullname, email, password } = req.body;
    
        let createdOwner = await ownerModel.create({
            fullname,
            email,
            password,
        });
        res.status(201).send(createdOwner);
    });
}

router.get("/admin", function(req, res) {
    let success = req.flash("success") || [];
    res.render("createproducts", { success });
});

router.post("/createproducts", function(req, res) {
    // Your logic to handle form submission and product creation goes here.

    // If product creation is successful, set the success message.
    req.flash("success", "Product created successfully!");
    res.redirect("/owners/admin");
});

module.exports = router;
