import { useLogsStore } from "../../../stores/logs.store";
import { StatusBarItem } from "../StatusBarItem/StatusBarItem";

function TasksList() {
  const { tasks, completedTask } = useLogsStore((state) => state);
  return (
    <div className="w-full h-full overflow-auto">
      {tasks.map((item) => (
        <StatusBarItem task={item} key={item.id} />
      ))}
      {completedTask.map((item) => (
        <StatusBarItem task={item} key={item.id} />
      ))}
    </div>
  );
}

export { TasksList };
