import { Column, Entity, PrimaryColumn } from "typeorm";
import { SharedEntity } from "./shared.entity";
@Entity({ name: "lookup_group" })
export class LookupGroup extends SharedEntity {
  @Column({ unique: true })
  groupName: string;
  @PrimaryColumn()
  groupId: string;
}
