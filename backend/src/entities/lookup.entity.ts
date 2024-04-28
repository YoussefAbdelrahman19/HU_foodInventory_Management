import { Column, Entity, PrimaryColumn } from "typeorm";
import { SharedEntity } from "./shared.entity";
@Entity()
export class Lookup extends SharedEntity {
  @Column({ unique: true })
  lookupName: string;
  @PrimaryColumn()
  lookupCode: string;
  @Column()
  lookupGroupId: string;
}
