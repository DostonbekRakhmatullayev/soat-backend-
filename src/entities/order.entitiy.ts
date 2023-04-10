import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm"
import { Products } from "./products.entitiy"

@Entity({
  name: "order",
})
export class Orders {
  @PrimaryGeneratedColumn("uuid", {
    name: "id",
  })
  id: string

  @Column()
  username: string

  @Column()
  tel: number

  @Column()
  email: string

  @Column()
  address: string

  @ManyToOne(() => Products, (products) => products.order, { cascade: true })
  product: Products
}
