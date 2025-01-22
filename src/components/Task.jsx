import { Edit2, Trash2 } from "lucide-react"

const Task = ({ task, isDragging, openTaskModal, deleteTask }) => {
  const completedSubtasks = task.subtasks.filter((st) => st.completed).length
  const totalSubtasks = task.subtasks.length

  return (
    <div
      className={`group p-4 bg-white dark:bg-gray-800 rounded-lg shadow-sm 
        ${isDragging ? "shadow-lg opacity-75" : "hover:shadow-md"} 
        transition-shadow cursor-grab active:cursor-grabbing`}
    >
      <div className="flex justify-between items-start">
        <div className="flex-1">
          <h4 className="font-semibold text-gray-900 dark:text-white mb-2">{task.title}</h4>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {completedSubtasks} of {totalSubtasks} subtasks
          </p>
        </div>
        <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <button
            onClick={(e) => {
              e.stopPropagation()
              openTaskModal(task)
            }}
            className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded"
          >
            <Edit2 className="w-4 h-4 text-gray-500 dark:text-gray-400" />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation()
              deleteTask(task.id)
            }}
            className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded"
          >
            <Trash2 className="w-4 h-4 text-red-500" />
          </button>
        </div>
      </div>
    </div>
  )
}

export default Task;
