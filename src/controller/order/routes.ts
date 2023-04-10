import { Router } from "express"
import validateMiddleware from "../../middleware/validate.middleware"
import { orderJoi } from "../../validate/validate"
import { orderAll, orderCreate } from "./order"

const router = Router()

router.post("/order/create", validateMiddleware(orderJoi), orderCreate)
router.get("/order/all", orderAll)

export default router
