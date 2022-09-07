import { NextFunction, Request, Response } from "express";
import { validationResult } from "express-validator";

export const inputValidationMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const errors = validationResult(req);
  const errorsArr = Object.values(errors.mapped());

  if (!errors.isEmpty()) {
    const errorsList = errorsArr.map((item: any) => ({
      message: item.msg,
      field: item.param,
    }));
    res.status(400).json({ errorsMessages: errorsList });
  } else next();
};
