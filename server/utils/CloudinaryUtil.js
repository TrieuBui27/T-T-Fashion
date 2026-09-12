const cloudinary = require('cloudinary').v2;

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

const CloudinaryUtil = {
  isConfigured() {
    return !!(
      process.env.CLOUDINARY_CLOUD_NAME &&
      process.env.CLOUDINARY_API_KEY &&
      process.env.CLOUDINARY_API_SECRET
    );
  },

  async uploadImageDataUrl(imageDataUrl) {
    return cloudinary.uploader.upload(imageDataUrl, {
      folder: 'shoppingonline/products'
    });
  }
};

module.exports = CloudinaryUtil;