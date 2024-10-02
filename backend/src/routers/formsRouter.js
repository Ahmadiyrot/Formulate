import express from "express"
import formsController from "../controllers/formsController.js"
const router = new express.Router()

router.post("/CreateForm", formsController.createForm);

router.patch("/AddQuestions/:id", formsController.addQuestionsToForm);

router.get("/forms/:ownerId", formsController.getFormsByOwnerId);

router.get("/AnswerForm/:id",formsController.getFormById)

export default router