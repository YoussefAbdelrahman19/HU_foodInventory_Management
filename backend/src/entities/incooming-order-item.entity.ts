import { Column, Entity, ManyToOne, PrimaryColumn } from "typeorm";
import { SharedEntity } from "./shared.entity";
import { IncoomingOrder } from "./incooming-order.entity";
@Entity({
  name: "incooming_order_item",
})
export class IncoomingOrderItem extends SharedEntity {
  @PrimaryColumn()
  orderItemId: string;
  @Column()
  itemName: string;
  @Column()
  lotNum: number;
  @Column()
  warehouse: string;
  @Column()
  weightUnit: string;
  @Column()
  weightQuantity: number;
  @Column()
  price: number;
  @Column({ default: "pending" })
  status: string;
  @ManyToOne(() => IncoomingOrder, (order) => order.orderItems)
  order: IncoomingOrder;
  @Column()
  orderId: string;
}
