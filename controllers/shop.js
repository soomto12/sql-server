const Product = require('../models/product');
const Cart = require('../models/cart');


exports.getProducts = (req, res, next) => {
Product.fetchAll()
 .then((product)=>{
res.render("shop/product-list",{
  prods:product,
  pageTitle: "all products",
  path:"/products"
})
 })
};

exports.getProduct = (req, res, next) => {
  const prodId = req.params.productId;
  Product.getProductById(prodId)
  .then(prodsID=>{
    console.log(prodsID)
res.render("shop/product-detail",{
  product: prodsID,
  pageTitle: prodsID.title,
  path:"/products"
})
  })
  .catch((err)=>{
console.log(err)
  })
}

exports.getIndex = (req, res, next) => {
  Product.fetchAll()
 .then((product)=>{
res.render("shop/index",{
  prods:product,
  pageTitle: "shop",
  path:"/"
})
 })
    
};

exports.getCart = (req, res, next) => {
  Cart.getCart(cart => {
    Product.fetchAll(products => {
      const cartProducts = [];
      for (product of products) {
        const cartProductData = cart.products.find(
          prod => prod.id === product.id
        );
        if (cartProductData) {
          cartProducts.push({ productData: product, qty: cartProductData.qty });
        }
      }
      res.render('shop/cart', {
        path: '/cart',
        pageTitle: 'Your Cart',
        products: cartProducts
      });
    });
  });
};

exports.postCart = (req, res, next) => {
  const prodId = req.body.productId;
  Product.findById(prodId, product => {
    Cart.addProduct(prodId, product.price);
  });
  res.redirect('/cart');
};

exports.postCartDeleteProduct = (req, res, next) => {
  const prodId = req.body.productId;
  Product.findById(prodId, product => {
    Cart.deleteProduct(prodId, product.price);
    res.redirect('/cart');
  });
};

exports.getOrders = (req, res, next) => {
  res.render('shop/orders', {
    path: '/orders',
    pageTitle: 'Your Orders'
  });
};

exports.getCheckout = (req, res, next) => {
  res.render('shop/checkout', {
    path: '/checkout',
    pageTitle: 'Checkout'
  });
};
