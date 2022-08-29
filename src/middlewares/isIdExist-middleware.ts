import e, { NextFunction, Request, Response } from "express";
import { isIdExist } from "../repositories/videos-repository";

export const isIdExistMiddleware = (
  checkingArr: any[],
  fieldNameIdFromBody?: string
) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const id = fieldNameIdFromBody
      ? +req.body[`${fieldNameIdFromBody}`]
      : +req.params.id;

    if (!isIdExist(id, checkingArr)) {
      if (fieldNameIdFromBody) {
        res.status(400).send({
          errorsMessages: [
            {
              message: `${fieldNameIdFromBody} doesn't exist`,
              field: `${fieldNameIdFromBody}`,
            },
          ],
        });
      } else {
        res.sendStatus(404);
      }
    } else next();
  };
};
