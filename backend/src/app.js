import express from "express";
import cookieParser from "cookie-parser"
import cors from "cors"
import "./DB/mongoose.js";
import accountRouter from "./routers/accountRouter.js"
const app = express()

app.use(cors())

app.use(express.json())
app.use(cookieParser())


app.use(accountRouter)


app.listen(5000, () => {
    console.log("connected")
})