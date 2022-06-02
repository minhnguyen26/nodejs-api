import { processFilterOptions } from './../commons/functions';
import { FilterQuery } from "mongoose";
import { CreateInput, FilterOptions } from "../commons/interfaces";
import User, { IUser } from "../models/User";


export async function createUser(data: CreateInput<IUser>) {
  let users = await countUser({});
  let count = users + 1;
  let code = `SC${("0000" + count).slice(-5)}`;

  data.code = code;
  let user = await User.create(data)
  return user;
}

export async function getUser(filter: FilterQuery<IUser> = {}, options: Omit<FilterOptions<IUser>, "select"> = {}, includePassword: boolean = false) {
  let query = User.findOne(filter);
  if (!includePassword) (options as FilterOptions<IUser>).select = "-password";
  query = processFilterOptions(query, options);
  
  return query.lean();
}

export async function countUser(filter: FilterQuery<IUser>) {
  let count = await User.countDocuments(filter);
  return count;
}