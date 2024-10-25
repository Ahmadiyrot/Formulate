import express from "express"
import formsController from "../controllers/formsController.js"
const router = new express.Router()

router.post("/CreateForm", formsController.createForm);

router.patch("/AddQuestions/:id", formsController.addQuestionsToForm);

router.get("/forms/:ownerId", formsController.getFormsByOwnerId);

router.get("/AnswerForm/:id", formsController.getFormById)

router.delete("/DeleteForm/:id", formsController.deleteFormById);

router.patch("/ChangeFormStatus/:id", formsController.changeFormStatus);

router.get("/GetDeleted/:Id", formsController.getDeletedByUserId);

router.get("/GetDrafts/:id", formsController.getDraftsByUserId)

router.patch("/ChangePinStatus/:id", formsController.changePinStatus);

router.patch("/RetrieveForm/:id", formsController.retrieveFormById);

export default router