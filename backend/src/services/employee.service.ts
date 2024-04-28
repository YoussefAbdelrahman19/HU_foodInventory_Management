import { Employee } from "../entities/employee.entity";
import { AppUtils } from "../utils/app.utils";
import { AppError } from "../utils/error.util";
import { nanoid, customAlphabet } from "nanoid";
const repo = () => {
  return AppUtils.getRepository(Employee);
};
export const register = async (data: Partial<Employee>) => {
  data.password = await AppUtils.hashText(data.password!);
  data.empId = nanoid(8);
  const result = await repo().insert(data);
  return result;
};
export const login = async (userName: string, password: string) => {
  const employee = await repo().findOneBy({ userName });
  if (!employee) throw new AppError("wrong username or password", "NOT_FOUND");
  const validPass = await AppUtils.compareHash(password, employee.password);
  if (!validPass) throw new AppError("wrong username or password", "NOT_FOUND");
  return employee;
};
