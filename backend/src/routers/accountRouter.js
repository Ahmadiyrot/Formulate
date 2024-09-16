import express from "express"
import accountController from "../controllers/accountController.js"
const router = new express.Router()

router.post("/SignUp", accountController.createAccount)

router.get('/find/email/:email', accountController.getAccountByEmail);
export default router