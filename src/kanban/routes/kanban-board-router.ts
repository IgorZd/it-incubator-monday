import { Request, Response, Router } from "express";
import { kanbanBoardService } from "../domain/kanban-board-service";
import { inputValidationMiddleware } from "../middlewares/input-validation-middleware";
import {
  isColumnIdExistMiddleware,
  isTaskIdExistMiddleware,
} from "../middlewares/isIdExist-middleware";
import {
  authorValidation,
  descriptionValidation,
} from "../validations/tasks-validation";

export const kanbanBoardRouter = Router({});

const validations = [authorValidation, descriptionValidation];

kanbanBoardRouter.get("/", async (req: Request, res: Response) => {
  const foundedBoard = await kanbanBoardService.findBoard();
  res.send(foundedBoard);
});

kanbanBoardRouter.post("/column", async (req: Request, res: Response) => {
  const newColumn = await kanbanBoardService.createColumn();
  res.status(201).send(newColumn);
});

kanbanBoardRouter.delete(
  "/:columnId",
  isColumnIdExistMiddleware,
  async (req: Request, res: Response) => {
    const isColumnDeleted = await kanbanBoardService.deleteColumn(
      req.params.columnId
    );
    if (isColumnDeleted) {
      res.sendStatus(204);
    } else {
      res.sendStatus(404);
    }
  }
);

kanbanBoardRouter.get(
  "/:columnId",
  isColumnIdExistMiddleware,
  async (req: Request, res: Response) => {
    const column = await kanbanBoardService.getColumnById(req.params.columnId);
    if (column) {
      res.send(column);
    } else {
      res.sendStatus(404);
    }
  }
);

kanbanBoardRouter.post(
  "/:columnId/task",
  isColumnIdExistMiddleware,
  ...validations,
  inputValidationMiddleware,
  async (req: Request, res: Response) => {
    const newTask = await kanbanBoardService.createTask(
      req.params.columnId,
      req.body.description,
      req.body.author
    );
    res.status(201).send(newTask);
  }
);

kanbanBoardRouter.delete(
  "/:columnId/:taskId",
  isTaskIdExistMiddleware,
  async (req: Request, res: Response) => {
    const isTaskDeleted = await kanbanBoardService.deleteTask(
      req.params.columnId,
      req.params.taskId
    );
    if (isTaskDeleted) {
      res.sendStatus(204);
    } else {
      res.sendStatus(404);
    }
  }
);

kanbanBoardRouter.put(
  "/:columnId/:taskId",
  isTaskIdExistMiddleware,
  ...validations,
  inputValidationMiddleware,
  async (req: Request, res: Response) => {
    const data = {
      id: req.params.taskId,
      description: req.body.description,
      author: req.body.author,
    };
    const isTaskUpdated = await kanbanBoardService.updateTask(
      req.params.columnId,
      req.params.taskId,
      data
    );
    if (isTaskUpdated) {
      const task = await kanbanBoardService.getTaskById(
        req.params.columnId,
        req.params.taskId
      );
      res.send(task);
    } else {
      res.sendStatus(404);
    }
  }
);
kanbanBoardRouter.get(
  "/:columnId/:taskId",
  isTaskIdExistMiddleware,
  async (req: Request, res: Response) => {
    const task = await kanbanBoardService.getTaskById(
      req.params.columnId,
      req.params.taskId
    );
    if (task) {
      res.send(task);
    } else {
      res.sendStatus(404);
    }
  }
);
