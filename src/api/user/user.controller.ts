import { Request, Response } from "express";
import { hash } from "../../helper/password";
import {createUser, getUser} from "../../services/user.service"
import { SuccessResponse, ErrorResponse } from '../../helper/response';
import {IUser} from "../../models/User"

const userController = {

  async post(req: Request, res: Response) {
    let data = req.body as IUser;

    if (data.password) data.password = await hash(data.password);
    try {
      let user = await createUser(data)
      return SuccessResponse(res,user)
    } catch (err: any) {
      return ErrorResponse(res,err._message)
    }
  },

  async getById(req: Request, res: Response) {
    const id = req.params.id;
    console.log("=>oid",id)
    try {
      let user = await getUser({ _id: id });
      return SuccessResponse(res, user);
    } catch (err: any) {
    console.log("=>oid",id)

      return ErrorResponse(res,err._message)
    }
  }

}

export default userController