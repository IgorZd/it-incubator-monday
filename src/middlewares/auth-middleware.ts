import { NextFunction, Request, Response } from "express";
import { basicAuthHeaderBase64 } from "../consts/basicAuthHeaderBase64";

export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;
  const isAuthorized = authHeader === basicAuthHeaderBase64;

  if (!isAuthorized) {
    res.status(401).send({
      errorsMessages: [
        {
          message: "Not authorized",
          field: "Authorization",
        },
      ],
    });
  } else next();
};
