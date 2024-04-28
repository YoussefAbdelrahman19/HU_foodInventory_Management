import nanoid from "nanoid";
import { DataSourceConfig } from "../config/data-source.config";
import { EntityTarget, ObjectLiteral, Repository } from "typeorm";
import * as jwt from "jsonwebtoken";
import * as bcrypt from "bcrypt";
export class AppUtils {
  static getRandomId(len: number = 10) {
    return nanoid.nanoid(len);
  }
  static getRepository<T extends ObjectLiteral>(
    entity: EntityTarget<T>
  ): Repository<T> {
    return DataSourceConfig.getRepository(entity);
  }
  static async hashText(data: string | Buffer) {
    const hash = await bcrypt.hash(data, 10);
    return hash;
  }
  static compareHash(data: string | Buffer, hash: string) {
    const isSame = bcrypt.compare(data, hash);
    return isSame;
  }
  static jwtSign(
    payload: string | Buffer | object,
    key: string,
    options: {
      expiresIn?: string | number;
      algorithm?: jwt.Algorithm;
    } = {}
  ): string {
    options = { expiresIn: "1d", ...options };
    return jwt.sign(payload, key, {
      ...options,
    });
  }
  static verifyJwt<T>(token: string, key: string): T {
    return jwt.verify(token, key) as T;
  }
}
