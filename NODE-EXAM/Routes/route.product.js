const express = require("express");

const proRoutes = express.Router();

const auth = require("../authMiddleWare/authMiddleware");
const productModel = require("../Model/model.product");

proRoutes.get("/formData", auth, (req, res) => {
    res.render("form");
})

proRoutes.get("/home", async (req, res) => {
    const data = await productModel.find();
    res.render("home", {
        data
    });

})

proRoutes.post("/addProduct", async (req, res) => {
    try {
        const { productName, productPrice, productQuantity, discription } = req.body;
        const product = new productModel({
            productName, productPrice, productQuantity, discription
        });
        await product.save();
        res.status(200).json({ success: true, msg: "Product Added successfully.." });
    } catch (error) {
        console.log("Product not added ", error);
    }
})

proRoutes.delete("/delete/:id", async (req, res) => {
    try {
        const { id } = req.params;
        console.log(id);
        const deleteData = await productModel.findByIdAndDelete(id);
        res.status(200).json({ msg: "Data deleted successfully", deleteData });
    } catch (error) {
        res.status(400).json({ msg: "Something went wrong", error });
    }
});

proRoutes.get("/edit/:id", async (req, res) => {
    let { id } = req.params;
    const data = await productModel.findById(id);
    if (!data) {
        return res.status(404).json({ msg: "Product not found" });
    }
    console.log(data);
    res.render("editpage", { data });
});

proRoutes.patch("/edit/:id", async (req, res) => {
    try {
        let { id } = req.params;
        const { productName, productPrice, productQuantity, discription } = req.body;
        let updateProduct = await productModel.findByIdAndUpdate(id, {
            productName, productPrice, productQuantity, discription
        });
        if (!updateProduct) {
            return res.status(404).json({ msg: "Product not found" });
        }
        res.status(200).json({ success: true, msg: "Product updated successfully", updateProduct });
    } catch (error) {
        res.status(400).json({ msg: "Something went wrong", error });
    }
});

module.exports = proRoutes;