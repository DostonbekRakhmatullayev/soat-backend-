import { Router } from "express"
import upload from "../../lib/multer"
import validateMiddleware from "../../middleware/validate.middleware"
import { products_joi } from "../../validate/validate"
import { IMGGETFILE, PRODUCTS_DELETE, PRODUCTS_GET, PRODUCTS_GET_ONE, PRODUCTS_PATCH, PRODUCTS_POST } from "./products"

const router = Router()

router.post("/products/post", upload.single("img"), validateMiddleware(products_joi), PRODUCTS_POST)
router.get("/products/get", PRODUCTS_GET)
router.delete("/products/delete/:id", PRODUCTS_DELETE)

router.get("/products/get/:id", PRODUCTS_GET_ONE)
router.patch("/products/patch/:id", validateMiddleware(products_joi), PRODUCTS_PATCH)
router.get("/:file", IMGGETFILE)

export default router
