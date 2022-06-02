import { Response } from "express"

export function SuccessResponse(
  res: Response,
  data: any,
  options: {
    paginate?: {
      page: number;
      pageSize?: number;
      total: number;
    };
    extraKey?: string;
  } = {},
  status:number = 200,
) {
  if (options.paginate) data = Object.assign(data, { paginate: options.paginate });
  if (options.extraKey) data = { [options.extraKey]: data, extra: { [options.extraKey]: data }, paginate: data.paginate };
  return res.status(status).send(data)
}

export function ErrorResponse(res: Response, message: string | undefined = undefined, data: any | undefined = undefined, status: number = 500) {
  let responseData = {
      status_code: "INTERNAL_SERVER_ERROR",
      data: data,
      error: { message: message || "Internal Server Error" },
  };
  return res.status(status).send(responseData);
}

export function BadRequestResponse(res: Response, message: string | undefined = undefined, data: any | undefined = undefined) {
  let responseData = {
      status_code: "BAD_REQUEST",
      data: data,
      error: {
          message: message || "Bad Request",
      },
  };
  return res.status(400).send(responseData);
}