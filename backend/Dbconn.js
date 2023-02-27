mongoose = require("mongoose")


const DB =  "mongodb://127.0.0.1:27017/MilindIntern"

mongoose.connect(DB,{useNewUrlParser:true,useUnifiedTopology:true}).then(()=>{
   console.log("connect success")
}).catch((err)=>{
   console.log("not success")
})  