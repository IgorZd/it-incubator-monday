import { NextFunction, Request, Response } from "express";
import { kanbanBoardService } from "../domain/kanban-board-service";

export const isColumnIdExistMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const columnId = req.params.columnId;
  if (typeof columnId !== "string") {
    res.sendStatus(404);
    return;
  }
  const column = await kanbanBoardService.getColumnById(columnId);

  if (!column) {
    res.status(404).send("Column ID doesn't exist");
  } else next();
};

export const isTaskIdExistMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const columnId = req.params.columnId;
  const taskId = req.params.taskId;
  if (typeof columnId !== "string" || typeof taskId !== "string") {
    res.sendStatus(404);
    return;
  }
  const column = await kanbanBoardService.getColumnById(columnId);
  if (!column) {
    res.status(404).send("Column ID doesn't exist");
  } else {
    const task = await kanbanBoardService.getTaskById(columnId, taskId);
    if (!task) {
      res.status(404).send("Task ID doesn't exist");
    } else next();
  }
};
