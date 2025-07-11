const Mongodb = require("mongodb")
const MongoClient = Mongodb.MongoClient

let _db 

function mongoConnect (callback){
MongoClient.connect('mongodb+srv://somto:blockchain@cluster0.gocxpde.mongodb.net/shop?retryWrites=true&w=majority&appName=Cluster0')
.then((result)=>{
  console.log("connect");
  _db = result.db();
  callback();
})
.catch((err)=>{
console.log(err);
});
}

function GetDB(){
if (_db) {
  return _db

} 
throw "No dataBase found";

};




exports.mongoConnect = mongoConnect;

exports.GetDB = GetDB;



