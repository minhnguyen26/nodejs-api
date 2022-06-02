import { NextFunction, Request, Response } from "express";
import { createToken } from "../../helper/jwt";
import { check } from "../../helper/password";
import { BadRequestResponse,SuccessResponse } from "../../helper/response";
import { getUser } from "../../services/user.service";


const loginController = {
  async login(req: Request, res: Response, next: NextFunction) {
    let body = req.body;
    if (!body.email) return BadRequestResponse(res, "login.controller.ts");
    if (!body.password) return BadRequestResponse(res, "login.controller.ts");
    try {
      let user = await getUser({ email: body.email },{},true)
      if(!user) return BadRequestResponse(res, "login invalid user pass1231312")
      if (await check(body.password, (user.password as string) || "")) {
        if (user.password) delete user.password
        
        let accessToken = await createToken(user, process.env.SECRET_KEY!, "7d");
        return SuccessResponse(res,{user,accessToken})
      }
      return BadRequestResponse(res, "login invalid user pass")

    } catch (err:any) {
      return next(err)
    }
  }

}
export default loginController