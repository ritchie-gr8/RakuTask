import moment from "moment";
import { Task } from "./types";

export const formatTime = (createdAt: string) => {
  const now = moment();
  const createdMoment = moment(createdAt);

  if (createdMoment.isSame(now, "day")) {
    return "Today";
  }

  if (createdMoment.isSame(now.subtract(1, "days"), "day")) {
    return "Yesterday";
  }

  if (
    createdMoment.isAfter(moment().subtract(6, "days")) ||
    createdMoment.isAfter(moment().subtract(3, "weeks"), "week")
  ) {
    return createdMoment.fromNow();
  }

  return createdMoment.format("DD//MM/YYYY");
};

export const filterTasks = (tasks: Task[], priority: string): Task[] => {
  if (priority === "all") return tasks;

  return priority ? tasks.filter((task) => task.priority === priority) : tasks;
};

export const overdueTasks = (tasks: Task[]) => {
  const today = moment();
  return tasks.filter((task) => {
    return !task.completed && moment(task.dueDate).isBefore(today);
  });
};
