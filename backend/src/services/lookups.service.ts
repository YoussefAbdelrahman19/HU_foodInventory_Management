import { FindManyOptions } from "typeorm";
import { LookupDetail } from "../entities/lookup-details.entity";
import { LookupGroup } from "../entities/lookup-group.entity";
import { Lookup } from "../entities/lookup.entity";
import { AppUtils } from "../utils/app.utils";
import { AppError } from "../utils/error.util";

const lookupGroupRepo = () => {
  return AppUtils.getRepository(LookupGroup);
};
const lookupRepo = () => {
  return AppUtils.getRepository(Lookup);
};
const lookupDetailRepo = () => {
  return AppUtils.getRepository(LookupDetail);
};
export const insertLookupGroup = async (data: LookupGroup) => {
  data["groupId"] = AppUtils.getRandomId();
  await lookupGroupRepo().insert(data);
  return { groupId: data["groupId"] };
};
export const insertLookup = async (data: Lookup) => {
  data["lookupCode"] = AppUtils.getRandomId();
  const result = await lookupRepo().insert(data);
  return { lookupCode: data["lookupCode"] };
};
export const insertLookupDetail = async (data: LookupDetail) => {
  data["lookupDetailCode"] = AppUtils.getRandomId();
  const lookupParent = await lookupRepo().findOneBy({
    lookupCode: data.lookupParentCode,
  });
  if (!lookupParent) {
    throw new AppError(" lookup parent does not exist ", "BAD_REQUEST");
  }
  data["lookupGroupId"] = lookupParent.lookupGroupId;
  const result = await lookupDetailRepo().insert(data);
  return { lookupDetailCode: data["lookupDetailCode"] };
};
export const getLookupGroups = async () => {
  const result = await lookupGroupRepo().find({
    select: ["groupName", "groupId"],
  });
  return { lookups: result };
};
export const getLookup = async (groupId: string | undefined) => {
  let query: FindManyOptions<Lookup> | undefined = {};
  if (groupId) {
    query = {
      where: {
        lookupGroupId: groupId,
      },
    };
  }
  const result = await lookupRepo().find({
    ...query,
    select: ["lookupName", "lookupCode"],
  });
  return { lookups: result };
};
export const getLookupDetail = async (lookupParentCode: string | undefined) => {
  let query: FindManyOptions<LookupDetail> | undefined = {};
  if (lookupParentCode) {
    query = {
      where: {
        lookupParentCode,
      },
    };
  }
  const result = await lookupDetailRepo().find({
    ...query,
    select: ["lookupDetailName", "lookupDetailCode"],
  });
  return { lookups: result };
};
