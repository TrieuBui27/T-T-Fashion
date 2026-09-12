require('../utils/MongooseUtil');
const Models = require('./Models');

const ProductDAO = {
  async getCategoryAndDescendantIDs(rootID) {
    const root = String(rootID);
    const categories = await Models.Category.find({}).select('_id parent').lean().exec();
    const childrenByParent = new Map();

    categories.forEach((cat) => {
      const parentKey = cat.parent ? String(cat.parent) : null;
      if (!childrenByParent.has(parentKey)) childrenByParent.set(parentKey, []);
      childrenByParent.get(parentKey).push(String(cat._id));
    });

    const ids = new Set([root]);
    const queue = [root];

    while (queue.length > 0) {
      const current = queue.shift();
      const children = childrenByParent.get(current) || [];
      children.forEach((childID) => {
        if (!ids.has(childID)) {
          ids.add(childID);
          queue.push(childID);
        }
      });
    }

    return Array.from(ids);
  },

  async selectAll() {
    const query = {};
    const products = await Models.Product.find(query).exec();
    return products;
  },

  async insert(product) {
    const mongoose = require('mongoose');
    product._id = new mongoose.Types.ObjectId();
    const result = await Models.Product.create(product);
    return result;
  },

  async selectByID(_id) {
    const product = await Models.Product.findById(_id).exec();
    return product;
  },

  async selectByCatID(_cid) {
    const categoryIDs = await ProductDAO.getCategoryAndDescendantIDs(_cid);
    const products = await Models.Product.aggregate([
      {
        $addFields: {
          normalizedCategoryID: {
            $ifNull: [
              {
                $convert: {
                  input: '$category._id',
                  to: 'string',
                  onError: null,
                  onNull: null
                }
              },
              {
                $convert: {
                  input: '$category',
                  to: 'string',
                  onError: null,
                  onNull: null
                }
              }
            ]
          }
        }
      },
      { $match: { normalizedCategoryID: { $in: categoryIDs } } },
      { $project: { normalizedCategoryID: 0 } }
    ]).exec();
    return products;
  },

  async update(product) {
    const newvalues = {
      name: product.name,
      price: product.price,
      image: product.image,
      description: product.description,
      sizes: product.sizes,
      category: product.category
    };
    const result = await Models.Product.findByIdAndUpdate(
      product._id,
      newvalues,
      { new: true }
    );
    return result;
  },

  async delete(_id) {
    const result = await Models.Product.findByIdAndDelete(_id);
    return result;
  },

  async selectTopNew(top) {
    const query = {};
    const mysort = { cdate: -1 };
    const products = await Models.Product.find(query).sort(mysort).limit(top).exec();
    return products;
  },

  async selectTopHot(top) {
    const items = await Models.Order.aggregate([
      { $match: { status: 'APPROVED' } },
      { $unwind: '$items' },
      { $group: { _id: '$items.product._id', sum: { $sum: '$items.quantity' } } },
      { $sort: { sum: -1 } },
      { $limit: top }
    ]).exec();

    var products = [];
    for (const item of items) {
      const product = await ProductDAO.selectByID(item._id);
      products.push(product);
    }
    return products;
  },

  async selectByKeyword(keyword) {
    const query = { name: { $regex: new RegExp(keyword, "i") } };
    const products = await Models.Product.find(query).exec();
    return products;
  }
};

module.exports = ProductDAO;