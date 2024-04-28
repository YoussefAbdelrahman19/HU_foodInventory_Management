import { Column, Entity, PrimaryColumn } from "typeorm";
import { SharedEntity } from "./shared.entity";
@Entity({})
export class Supplier extends SharedEntity {
  @PrimaryColumn()
  supplierId!: string;
  @Column({ nullable: false })
  supplierName: string;
  @Column({ nullable: false })
  address: string;
  @Column({ nullable: false })
  ownerEmail: string;
  @Column({ nullable: false })
  phoneNumber: string;
  @Column({ nullable: false })
  ownerPhoneNumber: string;
  @Column({ nullable: false, unique: true })
  email: string;
  @Column({
    nullable: false,
  })
  vat: string;
  @Column({
    nullable: false,
  })
  euVat: string;
  @Column({ nullable: false })
  bankAccount: string;
  @Column({ nullable: false })
  paymentMethod: string;
  @Column({ nullable: false })
  paymentCurrency: string;
}
