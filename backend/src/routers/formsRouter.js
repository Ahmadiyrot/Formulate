import express from "express"
import formsController from "../controllers/formsController.js"
const router = new express.Router()

router.post("/CreateForm", formsController.createForm);

export default router