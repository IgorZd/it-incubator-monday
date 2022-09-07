import { KanbanBoardType, TaskState } from "../repositories/db";
import { kanbanBoardRepository } from "../repositories/kanban-board-db-repository";

export const kanbanBoardService = {
  async findBoard(): Promise<KanbanBoardType[]> {
    return await kanbanBoardRepository.findBoard();
  },
  async createColumn(): Promise<KanbanBoardType> {
    const newColumn = {
      id: "2",
      title: "Done",
      tasksList: [
        {
          id: "0",
          description: "Description 1",
          author: "Author 1",
        },
      ],
    };
    const createdColumn = await kanbanBoardRepository.createColumn(newColumn);
    return createdColumn;
  },
  async deleteColumn(id: string): Promise<boolean> {
    return await kanbanBoardRepository.deleteColumn(id);
  },
  async getColumnById(columnId: string) {
    const column = await kanbanBoardRepository.getColumnById(columnId);
    return column;
  },
  async createTask(
    columnId: string,
    description: string,
    author: string
  ): Promise<TaskState> {
    const newTask = { id: `${+new Date()}`, description, author };
    const createdTask = await kanbanBoardRepository.createTask(
      columnId,
      newTask
    );

    return createdTask;
  },
  async deleteTask(columnId: string, taskId: string): Promise<boolean> {
    return await kanbanBoardRepository.deleteTask(columnId, taskId);
  },
  async updateTask(
    columnId: string,
    taskId: string,
    updatedTask: TaskState
  ): Promise<boolean> {
    return await kanbanBoardRepository.updateTask(
      columnId,
      taskId,
      updatedTask
    );
  },
  async getTaskById(
    columnId: string,
    taskId: string
  ): Promise<TaskState | undefined> {
    const column = await kanbanBoardRepository.getColumnById(columnId);
    const task = column?.tasksList.find(
      (task: TaskState) => task.id === taskId
    );
    return task;
  },
};
