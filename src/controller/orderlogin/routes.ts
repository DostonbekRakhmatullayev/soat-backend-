import { Router } from "express"
import upload from "../../lib/multer"
import validateMiddleware from "../../middleware/validate.middleware"
import { login_joi, users_joi, users_pacht } from "../../validate/validate"
import { ORDERLOGIN_PATCH, ORDERLOGIN_POST, ORDERLOGIN_TOKEN, ORDER_LOGIN_POST } from "./orderlogin"

const router = Router()

router.patch("/order/registrasiya/patch", validateMiddleware(users_pacht), ORDERLOGIN_PATCH)
router.get("/order/registrasiya/get", ORDERLOGIN_TOKEN)

router.post("/order/registrasiya/create", validateMiddleware(users_joi), ORDERLOGIN_POST)

router.post("/order/login/post", validateMiddleware(login_joi), ORDER_LOGIN_POST)
export default router
