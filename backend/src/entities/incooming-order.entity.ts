import { Column, Entity, OneToMany, PrimaryColumn } from "typeorm";
import { SharedEntity } from "./shared.entity";
import { IncoomingOrderItem } from "./incooming-order-item.entity";
@Entity({
  name: "incooming_order",
})
export class IncoomingOrder extends SharedEntity {
  @PrimaryColumn()
  orderId: string;
  @Column()
  supplierId: string;
  @Column({ type: "date" })
  arrivalDate: Date;
  @Column({ type: "date" })
  expirationDate: Date;
  @Column()
  paymentMethod: string;
  @Column()
  paymentCurrency: string;
  @Column({ default: "pending" })
  status: string;
  @OneToMany(() => IncoomingOrderItem, (orderItem) => orderItem.order)
  orderItems: IncoomingOrderItem[];
}
