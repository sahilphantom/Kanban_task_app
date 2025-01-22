import React from 'react'
import { useSortable } from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"
import Task from "./Task"

const SortableTask = ({ task, openTaskModal, deleteTask }) => {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: task.id })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0 : 1,
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="w-full sm:w-[calc(100%-1rem)] md:w-[calc(100%-2rem)] lg:w-[calc(100%-2.5rem)] p-2 mb-4 bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-all"
    >
      <Task task={task} isDragging={isDragging} openTaskModal={openTaskModal} deleteTask={deleteTask} />
    </div>
  )
}

export default SortableTask
