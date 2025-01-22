import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable"
import  SortableTask  from "./SortableTask"
import { useDroppable } from "@dnd-kit/core"

const Column = ({ column, openTaskModal, deleteTask }) => {
  const { setNodeRef } = useDroppable({
    id: column?.name || "unknown",
  })

  // Ensure column and tasks exist, provide defaults if not
  const columnName = column?.name || "Unnamed Column"
  const columnColor = column?.color || "gray"
  const tasks = column?.tasks || []

  return (
    <div ref={setNodeRef} className="flex-shrink-0 w-full md:w-[280px]">
      <div className="flex items-center gap-2 mb-4">
        <div className={`w-3 h-3 rounded-full bg-${columnColor}-500`} />
        <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
          {columnName} ({tasks.length})
        </h3>
      </div>

      <div className="space-y-3">
        <SortableContext items={tasks.map((task) => task.id)} strategy={verticalListSortingStrategy}>
          {tasks.map((task) => (
            <SortableTask
              key={task.id}
              task={task}
              openTaskModal={() => openTaskModal(task)}
              deleteTask={() => deleteTask(task.id)}
            />
          ))}
        </SortableContext>
      </div>
    </div>
  )
}
export default Column;
