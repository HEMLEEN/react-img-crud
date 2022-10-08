const express = require ('express');
const dotenv = require('dotenv').config();
const bp  = require('body-parser');
const cors = require('cors');
const colors = require('colors')
const {errorHandler} =require ('./middeleWares/errorHandler');
const routerPage = require('./routes/routes')

const app = express();
const port =7000

// body parser
app.use(cors());
app.use(bp.urlencoded({extended:true}));
app.use(bp.json());



// middelwares
app.use(errorHandler);

// all routes
app.use("/uploads",express.static("./picture/uploads"))
app.use(routerPage);



// Port Listen
app.listen(port, () =>{
    console.log(`hi local host connected" ${port}`.underline.cyan)
})




