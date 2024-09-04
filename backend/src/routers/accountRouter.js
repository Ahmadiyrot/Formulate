import express from "express"
import accountController from "../controllers/accountController.js"
const router = new express.Router()

router.post("/SignUp", accountController.createAccount)


export default router