const express = require("express");
const proRoutes = express.Router();
const productModel = require("../Model/model.product")
const auth = require("../Middleware/authmiddleare");

proRoutes.get("/form", auth, (req, res) => {
    res.render("form");
});

proRoutes.get("/edit/:id", async (req, res) => {
    let { id } = req.params;
    const data = await productModel.findById(id);
    if (!data) {
        return res.status(404).json({ msg: "Product not found" });
    }
    console.log(data)
    res.render("editpage", { data });
});

proRoutes.patch("/edit/:id", async (req, res) => {
    try {
        let { id } = req.params;
        const { productName, price, rating, quantity, category, discription } = req.body;
        let updateProduct = await productModel.findByIdAndUpdate(id, { productName, price, rating, quantity, category, discription });
        if (!updateProduct) {
            return res.status(404).json({ msg: "product not found" });
        }
        req.flash('info', 'Data Updated successfully');

        res.status(200).json({ success: true, msg: "product updated successfully", updateProduct });
    } catch (error) {
        res.status(400).json({ msg: "Something went wrong", error });
    }
})

proRoutes.post("/formData", async (req, res) => {
    const { productName, price, rating, quantity, category, discription } = req.body;
    const product = new productModel({
        productName, price, rating, quantity, category, discription
    });
    if (!productName || !price || !rating || !quantity || !category || !discription) {
        res.status(401).json({ msg: "All fields are required" });
    }
    else {
        res.status(200).json({ success: true, msg: "Product added successfully..." });
    }
    await product.save();
});

proRoutes.get("/getData", auth, async (req, res) => {
    const data = await productModel.find();
    console.log(data);
    const infoMessage = req.flash("info")
    res.render("home", { data, infoMessage });
})

// proRoutes.get("/delete", async (req, res) => {
//     let id = req.query.id;
//     console.log(id);
//     try {
//         let deleteData = await productModel.findByIdAndDelete(id);
//         console.log(deleteData);
//         if (deleteData) {
//             res.redirect("back");
//         } else {
//             res.status(404).json({ message: "Data not found" });
//         }
//     } catch (err) {
//         console.error(err);
//         res.status(500).json({ message: "Error deleting data" });
//     }
// })

proRoutes.delete("/delete/:id", async (req, res) => {
    try {
        const { id } = req.params;
        console.log(id)
        const deleteData = await productModel.findByIdAndDelete(id);
        req.flash('info', 'Data delete successfully');
        res.status(200).json({ msg: "data deleted successfully", deleteData })
    } catch (error) {
        res.status(400).json({ msg: "something is wrong", error })
    }
});

module.exports = proRoutes;