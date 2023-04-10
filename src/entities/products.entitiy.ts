import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm"
import { Orders } from "./order.entitiy"

@Entity({
  name: "products",
})
export class Products {
  @PrimaryGeneratedColumn("uuid", {
    name: "id",
  })
  id: string

  @Column()
  img: string

  @Column()
  product_name: string

  @Column()
  price: string

  @Column()
  protuctes_title: string

  @Column()
  protuctes_brend: string

  @Column()
  discount: number

  @Column()
  model: string

  @OneToMany(() => Orders, (order) => order.product)
  order: Orders[]
}
