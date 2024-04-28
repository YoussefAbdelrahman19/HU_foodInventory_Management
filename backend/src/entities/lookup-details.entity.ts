import { Column, Entity, PrimaryColumn } from "typeorm";
import { SharedEntity } from "./shared.entity";
@Entity({ name: "lookup_detail" })
export class LookupDetail extends SharedEntity {
  @Column()
  lookupDetailName: string;
  @PrimaryColumn()
  lookupDetailCode: string;
  @Column()
  lookupParentCode: string;
  @Column()
  lookupGroupId: string;
}
