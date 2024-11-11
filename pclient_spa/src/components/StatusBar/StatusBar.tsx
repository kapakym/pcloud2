import { ScrollText } from "lucide-react";
import { useMemo } from "react";
import { VSeparator } from "../ui/VSeparator/VSeparator";
import { TasksList } from "./TasksList/TasksList";
import { useLogsStore } from "../../stores/logs.store";
import { useFileActionsStore } from "../../stores/file-actions.store";
import { useDrawerStore } from "../../stores/drawer.store";

function StatusBar() {
  const { tasks, completedTask, addTask } = useLogsStore((state) => state);
  const { selected } = useFileActionsStore((state) => state);

  const { setOpen, setTitle, setChildrenDrawer } = useDrawerStore(
    (state) => state
  );

  const countWorkingTasks = useMemo(
    () => tasks.filter((item) => !item.completed),
    [tasks]
  );

  const handleShowLogs = () => {
    setTitle("Logs");
    setChildrenDrawer(<TasksList />);
    setOpen(true);
  };

  return (
    <div className="bg-gray-800 p-2  border-t-[1px] border-solid border-slate-600 flex justify-between items-center">
      <div className="flex flex-col">
        <div className="text-sm min-h-[3px]">
          {!!countWorkingTasks.length &&
            `[ ${countWorkingTasks.length} ] working...`}
        </div>
        {!!countWorkingTasks.length && <span className="loader"></span>}
      </div>
      <div className="flex space-x-2 h-full">
        <div className="bg-gray-800">
          {selected.length > 0 && selected.length}
        </div>
        <VSeparator />
        <ScrollText
          onClick={handleShowLogs}
          size={28}
          className="text-slate-400 hover:text-slate-200 cursor-pointer"
        />
      </div>
    </div>
  );
}

export { StatusBar };
