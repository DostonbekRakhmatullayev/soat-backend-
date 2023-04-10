import { NextFunction, Request, Response } from "express"
import { string } from "joi"
import path from "path"
import { json } from "stream/consumers"
import { AppDataSource } from "../../config/config"
import { Products } from "../../entities/products.entitiy"
import { Users } from "../../entities/users.entitiy"
import { ErrorHandling } from "../../exceptions/error.handling"
import { img } from "../../types/multer"
const host = `http://localhost:3030/`
const PRODUCTS_GET_ONE = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params as any

    const find_product = await AppDataSource.getRepository(Products)
      .findOne({
        where: { id },
      })
      .catch((error) => next(new ErrorHandling(error.message, 400)))

    res.status(200).json({
      status: 200,
      message: "Succsseful",
      data: find_product,
    })
  } catch (error) {
    console.log(error)
    next(new ErrorHandling(error as any, 400))
  }
}
const PRODUCTS_GET = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const products = (await AppDataSource.getRepository(Products)
      .find()
      .catch((error) => next(new ErrorHandling(error.message as string, 400)))) as any

    // console.log(products)

    // const asdf = products:<Array>

    const prod = products.filter((e: any) => {
      e.img = `${host}${e.img}`
      return e
    }) as any

    res.status(200).json({
      status: 200,
      message: "Succsseful",
      data: products,
    })
  } catch (error) {
    console.log(error)
    next(new ErrorHandling(error as any, 400))
  }
}

const IMGGETFILE = (req: Request, res: Response, next: NextFunction) => {
  try {
    // console.log(req)
    const { file } = req.params
    res.sendFile(path.join(process.cwd(), "src", "uploads", file))
  } catch (error) {}
}

const PRODUCTS_POST = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { product_name, price, protuctes_brend, discount, protuctes_title, model } = req.result
    const { filename } = req.file as img

    const img = filename

    const products = await AppDataSource.getRepository(Products)
      .createQueryBuilder()
      .insert()
      .into(Products)
      .values({ discount, img, model, price, product_name, protuctes_brend, protuctes_title })
      .returning(["*"])
      .execute()
      .catch((error) => next(new ErrorHandling(error.message, 400)))

    res.status(200).json({
      status: 201,
      message: "Succsseful",
    })
  } catch (error) {
    console.log(error)
    next(new ErrorHandling(error as any, 400))
  }
}

const PRODUCTS_PATCH = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params
    const {} = req.result

    const users = await AppDataSource.getRepository(Products)
      .createQueryBuilder()
      .update(Products)
      .set({})
      .where("id = :id", { id: id })
      .execute()
      .catch((error) => next(new ErrorHandling(error.message as string, 400)))

    res.status(200).json({
      message: "Succcessful",
      status: 201,
    })
  } catch (error) {
    console.log(error)
    next(new ErrorHandling(error as any, 400))
  }
}

const PRODUCTS_DELETE = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params
    console.log(id)

    const category = await AppDataSource.getRepository(Products)
      .createQueryBuilder()
      .delete()
      .from(Products)
      .where("id = :id", { id: id })
      .execute()
      .catch((error) => next(new ErrorHandling(error.message, 400)))

    res.status(200).json({
      status: 200,
      message: "Successful",
    })
  } catch (error) {
    console.log(error)
    next(new ErrorHandling(error as string, 500))
  }
}

export { PRODUCTS_POST, IMGGETFILE, PRODUCTS_GET_ONE, PRODUCTS_PATCH, PRODUCTS_DELETE, PRODUCTS_GET }
