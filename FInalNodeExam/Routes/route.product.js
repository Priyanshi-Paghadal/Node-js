const express = require("express");
const productModel = require("../Model/model.product");
const authMiddleware = require("../MiddleWare/authMiddleware");
const proRoutes = express.Router();

proRoutes.get("/formData", authMiddleware, (req, res) => {
    res.render("form");
    res.status(200).json({ success: true });
});

proRoutes.get("/home", authMiddleware, async (req, res) => {
    const data = await productModel.find();
    console.log(data);
    res.render("home", { data });
});

proRoutes.post("/addProduct", authMiddleware, async (req, res) => {
    try {
        const { productName, productPrice, productQuantity, discription } = req.body;
        const product = new productModel({
            productName, productPrice, productQuantity, discription
        });
        await product.save();
        res.status(200).json({ success: true, msg: "Product Added successfully" });
    } catch (error) {
        console.log("Product Is not added..", error);
        res.status(400).json({ success: false, msg: "Product could not be added" });
    }
});

proRoutes.delete("/delete/:id", authMiddleware, async (req, res) => {
    try {
        const { id } = req.params;
        console.log(id);
        const deleteData = await productModel.findByIdAndDelete(id);
        res.status(200).json({ msg: "Data deleted successfully", deleteData });
    } catch (error) {
        res.status(400).json({ msg: "Something went wrong", error });
    }
});

proRoutes.get("/edit/:id", authMiddleware, async (req, res) => {
    let { id } = req.params;
    const data = await productModel.findById(id);
    if (!data) {
        return res.status(404).json({ msg: "Product not found" });
    }
    console.log(data);
    res.render("editpage", { data });
});

proRoutes.patch("/edit/:id", authMiddleware, async (req, res) => {
    try {
        let { id } = req.params;
        const { productName, productPrice, productQuantity, discription } = req.body;
        let updateProduct = await productModel.findByIdAndUpdate(id, {
            productName, productPrice, productQuantity, discription
        });
        if (!updateProduct) {
            return res.status(404).json({ msg: "Product not found" });
        }
        res.status(200).json({ msg: "Product updated successfully", updateProduct });
    } catch (error) {
        res.status(400).json({ msg: "Something went wrong", error });
    }
});

module.exports = proRoutes;