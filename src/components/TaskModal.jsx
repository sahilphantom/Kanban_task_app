import { useState, useEffect } from "react"
import { X, Plus, Trash } from "lucide-react"

const TaskModal = ({ columns, onClose, onSubmit, initialTask = null }) => {
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [subtasks, setSubtasks] = useState([{ title: "", completed: false }])
  const [status, setStatus] = useState(columns[0].name)

  useEffect(() => {
    if (initialTask) {
      setTitle(initialTask.title)
      setDescription(initialTask.description)
      setSubtasks(initialTask.subtasks)
      setStatus(initialTask.status)
    }
  }, [initialTask])

  const handleSubmit = (e) => {
    e.preventDefault()
    onSubmit({
      id: initialTask ? initialTask.id : Date.now(),
      title,
      description,
      subtasks,
      status,
    })
  }

  const addSubtask = () => {
    setSubtasks([...subtasks, { title: "", completed: false }])
  }

  const removeSubtask = (index) => {
    setSubtasks(subtasks.filter((_, i) => i !== index))
  }

  const updateSubtask = (index, value) => {
    setSubtasks(subtasks.map((st, i) => (i === index ? { ...st, title: value } : st)))
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-white dark:bg-gray-800 rounded-lg w-full max-w-md p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-bold text-gray-900 dark:text-white">
            {initialTask ? "Edit Task" : "Add New Task"}
          </h2>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg">
            <X className="w-5 h-5 text-gray-500 dark:text-gray-400" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Take coffee break"
              className="w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600 text-gray-900 dark:text-white"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="e.g. It's always good to take a break..."
              className="w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600 text-gray-900 dark:text-white h-24 resize-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Subtasks</label>
            <div className="space-y-2">
              {subtasks.map((subtask, index) => (
                <div key={index} className="flex gap-2">
                  <input
                    type="text"
                    value={subtask.title}
                    onChange={(e) => updateSubtask(index, e.target.value)}
                    placeholder="e.g. Make coffee"
                    className="flex-1 px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600 text-gray-900 dark:text-white"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => removeSubtask(index)}
                    className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
                  >
                    <Trash className="w-5 h-5 text-gray-500 dark:text-gray-400" />
                  </button>
                </div>
              ))}
            </div>
            <button
              type="button"
              onClick={addSubtask}
              className="mt-2 w-full px-4 py-2 bg-gray-100 dark:bg-gray-700 text-purple-600 rounded-full flex items-center justify-center gap-2 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
            >
              <Plus className="w-4 h-4" />
              Add New Subtask
            </button>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Status</label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600 text-gray-900 dark:text-white"
            >
              {columns.map((column) => (
                <option key={column.name} value={column.name}>
                  {column.name}
                </option>
              ))}
            </select>
          </div>

          <button
            type="submit"
            className="w-full px-4 py-2 bg-purple-600 text-white rounded-full hover:bg-purple-700 transition-colors"
          >
            {initialTask ? "Save Changes" : "Create Task"}
          </button>
        </form>
      </div>
    </div>
  )
}

export default TaskModal

