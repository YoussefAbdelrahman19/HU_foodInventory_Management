import { CreateDateColumn, UpdateDateColumn, VersionColumn } from "typeorm";

export class SharedEntity {
  @CreateDateColumn()
  createdAt!: string;
  @UpdateDateColumn()
  updatedAt!: string;
  @VersionColumn()
  version!: string;
}
