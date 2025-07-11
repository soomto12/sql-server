const Product = require('../models/product');
const ObjectId = require("mongodb").ObjectId
// get admin page
exports.getAddProduct = (req, res, next) => {
  res.render('admin/edit-product', {
    pageTitle: 'Add Product',
    path: '/admin/add-product',
    editing: false
  });
};
// adding a new product 
exports.postAddProduct = (req, res, next) => {
  const title = req.body.title;
  const imageUrl = req.body.imageUrl;
  const price = req.body.price;
  const description = req.body.description;
  const product = new Product(title, imageUrl, price, description,);
  product
  .save()
  .then((result)=>{
console.log(result);
res.redirect("admin/products");
  });
}



exports.postEditProduct = (req, res, next) => {
  const prodId = req.body.productId;
  const updatedTitle = req.body.title;
  const updatedPrice = req.body.price;
  const updatedImageUrl = req.body.imageUrl;
  const updatedDesc = req.body.description;
const product = new Product( updatedTitle, updatedImageUrl,updatedPrice,updatedDesc, new ObjectId(prodId))
product
.save()
  .then((result)=>{
    console.log("UDATED PRODUCT");
 res.redirect("/admin/products")
  })
  .catch((err)=>{
    console.log(err);
  }) 
};

exports.getProducts = (req, res, next) =>{
  Product.fetchAll()
  .then((products)=>{
res.render("admin/products",{
  prods:products,
  pageTitle:"admin Products",
  path:"/admin"
})
  })
};

exports.postDeleteProduct = (req, res, next) => {
  const prodId = req.body.productId;
 Product.DeleteById(prodId)
 .then(()=>{
  console.log("Destroyed");
  res.redirect("/admin/products");
 })
.catch((err)=>{
console.log(err)
});
 
};

// Get Edit products
exports.getEditProduct = (req, res, next)=>{
const editProduct = req.query.edit;

if (!editProduct) {
 return res.redirect("/");
}

const prodID  = req.params.productId
Product.getProductById(prodID)
.then(product=>{ 
if (!product) {
  return res.redirect("/")
}
res.render("admin/edit-product",{
  pageTitle:"Edit product",
  path:"/admin/edit-product",
  editing:editProduct,
  product:product,
});
});
}




