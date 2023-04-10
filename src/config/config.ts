import path from "path"
import { DataSource } from "typeorm"
import { Orders } from "../entities/order.entitiy"
import { OrderLogin } from "../entities/orderLogin.entity"
import { Products } from "../entities/products.entitiy"
import { Users } from "../entities/users.entitiy"

const AppDataSource = new DataSource({
  type: "postgres",
  host: "fanny.db.elephantsql.com",
  password: "ScfzjtLTN3xOSQtrAOdDdJ2Zp0IT96iu",
  port: 5432,
  username: "inbdpegt",
  database: "inbdpegt",
  entities: [Users, Products, Orders, OrderLogin],
  migrations: [path.resolve(__dirname, "..", "migrations", "**/*.{ts,js}")],
  logging: true,
  synchronize: true,
})

const SECRET_KEY = String(process.env.SECRET_KEY) || "(*‿*)"

export { AppDataSource, SECRET_KEY }

// psql postgres://inbdpegt:ScfzjtLTN3xOSQtrAOdDdJ2Zp0IT96iu@fanny.db.elephantsql.com/inbdpegt
