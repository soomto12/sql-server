// importing Database
const mongodb = require('mongodb');
const { GetDB } = require('../util/database');
const getDb = require("../util/database").GetDB

class Product {
    constructor(title,description,price,imageUrl,id){
this.title =title,
this.description=description,
this.price= price,
this.imageUrl =imageUrl
this._id = id
    }

//inserting Data in the dataBase
    save(){
  const db = getDb();
  let dbOp;
        if (this._id) {
            dbOp = db .collection("products").updateOne({_id : new mongodb.ObjectId(this._id)}, {$set:this})
        } else {
            dbOp = db
            .collection('products')
            .insertOne(this)
        }
      
   return dbOp
   .then((result)=>{         
        console.log(result);
    })
    .catch(err=>{
console.log(err)
    });
}
// getting all the data from the dataBase
static fetchAll(){
    const db = getDb()
    return db
    .collection("products")
    .find()
    .toArray()
    .then((product)=>{
console.log(product)
return product
    })
}

// getting a single product
static getProductById(prodsID){
const db = getDb()
  return db
  .collection("products")
.find({_id: new mongodb.ObjectId(prodsID)})
.next()
.then((products)=>{
console.log(products)
return products
})
.catch((err)=>{
console.log(err);
})
}

 static DeleteById(prodID){
    const Db = GetDB();
    Db.collection("products")
    .deleteOne({_id: new mongodb.ObjectId(prodID)})
    .then((result)=>{
        console.log("deleted");
    })
    .catch((err)=>{
console.log(err);
    })


 }


}

module.exports =Product;