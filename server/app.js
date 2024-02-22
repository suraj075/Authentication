const express = require('express')
const app = express();
require('./db/conn');
// const cors = require(cors());
const router = require('./routes/router');
const cors = require('cors');
const cookieParser = require('cookie-parser')
const port = 8000;

// app.get('/',(req,res)=>{
//     res.status(201).json('server create')
// });

app.use(express.json());
app.use(cookieParser());
app.use(cors());
app.use(router);


app.listen(port,()=>{
    console.log(`server is running on : ${port}`);
})





