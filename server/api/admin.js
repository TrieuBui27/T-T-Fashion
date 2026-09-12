const express = require('express');
const router = express.Router();

// daos
const JwtUtil = require('../utils/JwtUtil');
const AdminDAO = require('../models/AdminDAO');
const CategoryDAO = require('../models/CategoryDAO');
const ProductDAO = require('../models/ProductDAO');
const OrderDAO = require('../models/OrderDAO');
const CustomerDAO = require('../models/CustomerDAO');
const EmailUtil = require('../utils/EmailUtil');
const CloudinaryUtil = require('../utils/CloudinaryUtil');

// LOGIN
router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    const admin = await AdminDAO.selectByUsernameAndPassword(username, password);

    if (!admin) {
      return res.json({ success: false });
    }

    const token = JwtUtil.genToken(username, password);
    res.json({ success: true, token });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// GET categories
router.get('/categories', JwtUtil.checkToken, async (req, res) => {
  try {
    const categories = await CategoryDAO.selectAll();
    res.json(categories);
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// POST category
router.post('/categories', JwtUtil.checkToken, async (req, res) => {
  try {
    const category = { name: req.body.name };
    const result = await CategoryDAO.insert(category);
    res.json(result);
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// PUT category
router.put('/categories/:id', JwtUtil.checkToken, async (req, res) => {
  try {
    const _id = req.params.id;
    const result = await CategoryDAO.updateById(_id, req.body);
    res.json(result);
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// DELETE category
router.delete('/categories/:id', JwtUtil.checkToken, async (req, res) => {
  try {
    const result = await CategoryDAO.delete(req.params.id);
    res.json(result);
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// GET products
router.get('/products', JwtUtil.checkToken, async (req, res) => {
  try {
    let products = await ProductDAO.selectAll();
    const sizePage = 4;
    const noPages = Math.ceil(products.length / sizePage);
    let curPage = 1;

    if (req.query.page) curPage = parseInt(req.query.page);

    const offset = (curPage - 1) * sizePage;
    products = products.slice(offset, offset + sizePage);

    const result = {
      products: products,
      noPages: noPages,
      curPage: curPage
    };

    res.json(result);
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// UPLOAD product image
router.post('/upload', JwtUtil.checkToken, async (req, res) => {
  try {
    if (!CloudinaryUtil.isConfigured()) {
      return res.status(500).json({
        success: false,
        message: 'Cloudinary is not configured'
      });
    }

    const imageData = req.body.imageData;
    if (!imageData) {
      return res.status(400).json({ success: false, message: 'imageData is required' });
    }

    const upload = await CloudinaryUtil.uploadImageDataUrl(imageData);
    res.json({
      success: true,
      url: upload.secure_url,
      public_id: upload.public_id
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// POST product
router.post('/products', JwtUtil.checkToken, async (req, res) => {
  try {
    const name = req.body.name;
    const price = req.body.price;
    const cid = req.body.category;
    const image = req.body.image;
    const sizes = req.body.sizes;
    const description = req.body.description;
    const now = new Date();

    if (!cid) {
      return res.status(400).json({ success: false, message: 'Category is required' });
    }

    const category = await CategoryDAO.selectByID(cid);
    if (!category) {
      return res.status(400).json({ success: false, message: 'Category not found' });
    }

    const product = {
      name: name,
      price: price,
      image: image,
      description: description,
      cdate: now,
      sizes: sizes,
      category: category
    };

    const result = await ProductDAO.insert(product);
    res.json(result);
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// PUT product
router.put('/products/:id', JwtUtil.checkToken, async (req, res) => {
  try {
    const _id = req.params.id;
    const name = req.body.name;
    const price = req.body.price;
    const cid = req.body.category;
    const image = req.body.image;
    const description = req.body.description;
    const sizes = req.body.sizes;
    const now = new Date();

    if (!cid) {
      return res.status(400).json({ success: false, message: 'Category is required' });
    }

    const category = await CategoryDAO.selectByID(cid);
    if (!category) {
      return res.status(400).json({ success: false, message: 'Category not found' });
    }

    const product = {
      _id: _id,
      name: name,
      price: price,
      image: image,
      description: description,
      sizes: sizes,
      cdate: now,
      category: category
    };

    const result = await ProductDAO.update(product);
    res.json(result);
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// DELETE product
router.delete('/products/:id', JwtUtil.checkToken, async (req, res) => {
  try {
    const _id = req.params.id;
    const result = await ProductDAO.delete(_id);
    res.json(result);
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// GET orders
router.get('/orders', JwtUtil.checkToken, async (req, res) => {
  try {
    const orders = await OrderDAO.selectAll();
    res.json(orders);
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// PUT order status
router.put('/orders/status/:id', JwtUtil.checkToken, async (req, res) => {
  try {
    const _id = req.params.id;
    const newStatus = req.body.status;
    const result = await OrderDAO.update(_id, newStatus);
    res.json(result);
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// GET orders by customer
router.get('/orders/customer/:cid', JwtUtil.checkToken, async (req, res) => {
  try {
    const _cid = req.params.cid;
    const orders = await OrderDAO.selectByCustID(_cid);
    res.json(orders);
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// GET customers
router.get('/customers', JwtUtil.checkToken, async (req, res) => {
  try {
    const customers = await CustomerDAO.selectAll();
    res.json(customers);
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// PUT deactive customer
router.put('/customers/deactive/:id', JwtUtil.checkToken, async (req, res) => {
  try {
    const _id = req.params.id;
    const token = req.body.token;
    const result = await CustomerDAO.active(_id, token, 0);
    res.json(result);
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// GET send mail customer
router.get('/customers/sendmail/:id', JwtUtil.checkToken, async (req, res) => {
  try {
    const _id = req.params.id;
    const cust = await CustomerDAO.selectByID(_id);

    if (!cust) {
      return res.json({ success: false, message: 'Not exists customer' });
    }

    const send = await EmailUtil.send(cust.email, cust._id, cust.token);

    if (send) {
      res.json({ success: true, message: 'Please check email' });
    } else {
      res.json({ success: false, message: 'Email failure' });
    }
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

module.exports = router;