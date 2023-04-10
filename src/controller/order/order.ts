import { NextFunction, Request, Response } from "express"
import { AppDataSource } from "../../config/config"
import { Orders } from "../../entities/order.entitiy"
import { ErrorHandling } from "../../exceptions/error.handling"

const orderCreate = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { username, tel, email, address, product } = req.result as any

    console.log(username, tel, email, address, product)

    const order = await AppDataSource.getRepository(Orders)
      .createQueryBuilder()
      .insert()
      .into(Orders)
      .values({ address, email, tel, username, product })
      .execute()

    res.json({
      message: "Succcessful",
      status: 201,
    })
  } catch (error) {
    console.log(error)
    next(new ErrorHandling(error as any, 400))
  }
}

const orderAll = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const orders = await AppDataSource.getRepository(Orders).find()
    res.json({
      message: "Succcessful",
      status: 201,
      data: orders,
    })
  } catch (error) {
    console.log(error)
    next(new ErrorHandling(error as any, 400))
  }
}
export { orderCreate, orderAll }
