import { NextFunction, Request, Response } from "express"
// import  jwt, { JsonWebTokenError, sign } from "jsonwebtoken"
import { AppDataSource, SECRET_KEY } from "../../config/config"
import { OrderLogin } from "../../entities/orderLogin.entity"

import { ErrorHandling } from "../../exceptions/error.handling"
import jwt from "../../lib/jwt"

const ORDERLOGIN_TOKEN = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { token } = req?.headers as any
    const user_id = jwt.verify(token) as string | undefined

    console.log(user_id)

    const users = await AppDataSource.getRepository(OrderLogin).find({
      where: { id: user_id },
    })

    if (!users.length) {
      return next(new ErrorHandling("Token xato", 400))
    }
    res.status(200).json({
      message: "Successful",
      status: 200,
      data: users,
    })
  } catch (error) {
    console.log(error)
    next(new ErrorHandling(error as any, 400))
  }
}

const ORDERLOGIN_POST = async (req: Request, res: Response, next: NextFunction) => {
  try {
    console.log(req.result)

    const { first_name, last_name, email, password } = req.result
    const conplic = await AppDataSource.getRepository(OrderLogin).find({
      where: { email: email, password: password },
    })
    if (conplic.length) {
      return next(new ErrorHandling("email va password uzgartirnig", 409))
    }
    const {
      raw: [{ user_id }],
    } = await AppDataSource.getRepository(OrderLogin)
      .createQueryBuilder()
      .insert()
      .into(OrderLogin)
      .values({
        first_name,
        last_name,
        email,
        password,
      })
      .execute()
    res.status(200).json({
      message: "Successful",
      status: 201,
      token: jwt.sign(user_id),
    })
  } catch (error) {
    console.log(error)
    next(new ErrorHandling(error as any, 400))
  }
}

const ORDERLOGIN_PATCH = async (req: Request, res: Response, next: NextFunction) => {
  try {
    // const { token } = req?.headers as any
    // const user_id = jwt.verify(token) as any
    console.log(req)

    // const user = await AppDataSource.getRepository(Users)
    //   .findOne({
    //     where: { id: user_id },
    //   })
    //   .catch((error) => next(new ErrorHandling(error.message, 400)))
    // const { first_name, last_name, email, password } = req.result as any
    // const id = user_id

    // const users = await AppDataSource.createQueryBuilder()
    //   .update(Users)
    //   .set({
    //     first_name,
    //     last_name,
    //     email,
    //     password,
    //   })
    //   .where("id = :id", { id: id })
    //   .execute()

    res.status(200).json({
      message: "Succcessful",
      status: 201,
    })
  } catch (error) {
    console.log(error)
    next(new ErrorHandling(error as any, 400))
  }
}

const ORDER_LOGIN_POST = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, password } = req.result

    const users = (await AppDataSource.getRepository(OrderLogin).findOne({
      where: { email, password },
    })) as any
    if (!users) {
      return next(new ErrorHandling("Xato kirgizdingiz", 500))
    }
    if (users) {
      res.status(200).json({
        message: "Successful",
        status: 200,
        token: jwt.sign(users?.id),
      })
    }
  } catch (error) {
    console.log(error)
    next(new ErrorHandling(error as any, 400))
  }
}

export { ORDERLOGIN_POST, ORDER_LOGIN_POST, ORDERLOGIN_PATCH, ORDERLOGIN_TOKEN }
