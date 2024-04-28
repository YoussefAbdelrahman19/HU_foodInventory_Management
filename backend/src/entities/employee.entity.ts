import {
  BeforeInsert,
  Column,
  Entity,
  PrimaryColumn,
  PrimaryGeneratedColumn,
} from "typeorm";
import { SharedEntity } from "./shared.entity";
@Entity({
  name: "employees",
})
export class Employee extends SharedEntity {
  @PrimaryColumn({ type: "varchar", unique: true, nullable: false })
  empId: string;
  @Column({ type: "varchar", unique: true, nullable: false })
  userName: string;
  @Column()
  password: string;
  @Column()
  role: string;
}
