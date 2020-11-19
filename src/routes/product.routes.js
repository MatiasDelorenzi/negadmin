const express = require('express');
const router = express.Router();

const Product = require('../models/product');

router.get('/', async (req, res) =>{
    const products = await Product.find();
    res.json(products);
});

router.get('/:id', async (req, res) =>{
    const product = await Product.findById(req.params.id);
    res.json(product);
});

router.post('/', async (req, res) =>{
    const { code, name, price, stock } = req.body;
    const product = new Product({code, name, price, stock});
    await product.save();
    res.json({status: 'Product saved'});
});

router.put('/:id', async (req, res) =>{
    const { code, name, price, stock } = req.body;
    const newProduct = {code, name, price, stock};
    await Product.findByIdAndUpdate(req.params.id, newProduct);
    res.json({status: 'Product updated'});
});

router.delete('/:id', async (req, res) =>{
    await Product.findByIdAndRemove(req.params.id);
    res.json({status: "Prudct deleted"})
});

router.get('/', function(req, res, next){
    products.find(function(err, result){
        if (err) return console.log(err);
        res.json(result);
    })
});

/*
router.put('/:id', async(req, res) =>{
    await Product.findByIdAndUpdate(req.params.id, req.body, (err, productUpdated =>{
        if (err) return console.log(err)
        res.json({ status: "Product Updated" })
    }));
})*/

module.exports = router;