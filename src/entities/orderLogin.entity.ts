import { Column, Entity, PrimaryGeneratedColumn } from "typeorm"

@Entity({
  name: "orderlogin",
})
export class OrderLogin {
  @PrimaryGeneratedColumn("uuid", {
    name: "user_id",
  })
  id: string

  @Column({
    length: 63,
    nullable: false,
  })
  first_name: string

  @Column({
    length: 100,
    nullable: false,
  })
  last_name: string

  @Column({
    length: 100,
    nullable: false,
  })
  email: string

  @Column({
    length: 100,
    nullable: false,
  })
  password: string
}
