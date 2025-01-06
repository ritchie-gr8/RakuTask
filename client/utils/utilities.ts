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

export const formatDuedateTime = (dueDate: string) => {
  const now = moment();
  const deadline = moment(dueDate);

  if (deadline.isSame(now, "day")) {
    return "Due today";
  }

  if (deadline.isAfter(now)) {
    const diffDays = deadline.diff(now, 'days');
    if (diffDays === 1) {
      return "Due tomorrow";
    }
    return `Due in ${diffDays} days`;
  }

  const diffDays = now.diff(deadline, 'days');
  return `Overdue by ${diffDays} days`;
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
