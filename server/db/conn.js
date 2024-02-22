const mongoose = require('mongoose')

const DB = "mongodb+srv://kumarsuraj07553:YtO5JWMhqR82ij7u@authentation.yv3opzd.mongodb.net/AuthUser?retryWrites=true&w=majority"

mongoose.connect(DB,{
    useUnifiedTopology:true,
    useNewUrlParser:true
}).then(()=> console.log("DataBase Connected")).catch((errr)=>{
    console.log(errr);
})