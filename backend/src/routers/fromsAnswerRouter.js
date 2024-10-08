import express from "express"
import formsAnswerController from "../controllers/formsAnswerController.js"
const router = new express.Router()

router.post("/Answer", formsAnswerController.createFormAnswer);

router.delete("/DeleteAnswer", formsAnswerController.deleteFormAnswer)

router.get("/responses/:formId", formsAnswerController.getFormAnswers);

router.post("/isAnswered", formsAnswerController.isAnswered);
export default router