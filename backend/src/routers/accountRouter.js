import express from "express"
import accountController from "../controllers/accountController.js"
const router = new express.Router()

router.post("/SignUp", accountController.createAccount)

router.post('/signIn', accountController.signInAccount);

router.get("/refresh", accountController.refreshAccount);

router.post("/send-verification-code", accountController.sendVerificationCode);
export default router