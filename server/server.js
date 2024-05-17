const express=require("express")
const app=express()
const path=require("path")
const {v4: uuidv4}=require("uuid")
const loger=require("morgan")
const db=require("./model/connection")

require('dotenv').config()

const cors = require("cors");
app.use(cors({ origin: ['http://localhost:4200'] }));

const userrouter=require("../server/routes/userRoutes")
const doctorrouter=require("../server/routes/doctorRoutes")


app.use(loger("dev"))

const port=process.env.port_no

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use("/user",userrouter)
app.use("/doctor",doctorrouter)
db.connectToDatabase()

app.listen(port,()=>{
    console.log(`http://localhost:${port}`);
});

