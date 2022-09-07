import { kanbanBoardCollection, KanbanBoardType, TaskState } from "./db";

export const kanbanBoardRepository = {
  async findBoard(): Promise<KanbanBoardType[]> {
    return kanbanBoardCollection.find({}).toArray();
  },
  async createColumn(newColumn: KanbanBoardType): Promise<KanbanBoardType> {
    const result = await kanbanBoardCollection.insertOne(newColumn);

    return newColumn;
  },
  async deleteColumn(id: string): Promise<boolean> {
    const result = await kanbanBoardCollection.deleteOne({ id: id });

    return result.deletedCount === 1;
  },
  async createTask(columnId: string, newTask: TaskState): Promise<TaskState> {
    const result = await kanbanBoardCollection.updateOne(
      { id: columnId },
      { $push: { tasksList: newTask } }
    );
    return newTask;
  },
  async deleteTask(columnId: string, taskId: string): Promise<boolean> {
    const result = await kanbanBoardCollection.updateOne(
      { id: columnId },
      { $pull: { tasksList: { id: taskId } } }
    );

    return result.matchedCount === 1 && result.modifiedCount === 1;
  },
  async updateTask(
    columnId: string,
    taskId: string,
    updatedTask: TaskState
  ): Promise<boolean> {
    const result = await kanbanBoardCollection.updateOne(
      { id: columnId, tasksList: { $elemMatch: { id: taskId } } },
      {
        $set: { "tasksList.$": updatedTask },
      }
    );
    return result.matchedCount === 1 && result.modifiedCount === 1;
  },
  async getColumnById(columnId: string): Promise<KanbanBoardType | null> {
    let column: any = await kanbanBoardCollection.findOne({
      id: columnId,
    });
    return column;
  },
};
