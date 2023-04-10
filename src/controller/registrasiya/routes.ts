import { Router } from "express"
import upload from "../../lib/multer"
import validateMiddleware from "../../middleware/validate.middleware"
import { users_joi, users_pacht } from "../../validate/validate"
import { USER_PATCH, USER_POST, USER_TOKEN } from "./registrasiya"

const router = Router()

router.patch("/user/patch", validateMiddleware(users_pacht), USER_PATCH)
router.get("/user/get", USER_TOKEN)

router.post("/user/create", validateMiddleware(users_joi), USER_POST)

export default router
