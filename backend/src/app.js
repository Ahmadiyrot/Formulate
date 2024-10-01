import express from "express";
import cookieParser from "cookie-parser"
import cors from "cors"
import "./DB/mongoose.js";
import accountRouter from "./routers/accountRouter.js"
import formsRouter from "./routers/formsRouter.js"
const app = express()

app.use(cors({
    origin: process.env.REACT_URL,
    credentials: true,
    optionsSuccessStatus: 200
}));

app.use(express.json())
app.use(cookieParser())


app.use(accountRouter)
app.use(formsRouter)



app.listen(5000, () => {
    console.log("connected")
})