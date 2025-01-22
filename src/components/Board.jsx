import { useState } from "react"
import { Plus } from "lucide-react"
import { DndContext, DragOverlay, PointerSensor, useSensor, useSensors, closestCorners } from "@dnd-kit/core"
import { SortableContext, verticalListSortingStrategy, arrayMove } from "@dnd-kit/sortable"
import  Column  from "./Column"
import  Task  from "./Task"
import  SortableTask  from "./SortableTask"

const Board = ({ board, updateBoard, openTaskModal, deleteTask }) => {
  const [activeTask, setActiveTask] = useState(null)

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
  )

  const handleDragStart = (event) => {
    const { active } = event
    setActiveTask(findTask(active.id))
  }

  const handleDragEnd = (event) => {
    const { active, over } = event
    if (!over) return

    const activeTask = findTask(active.id)
    if (!activeTask) return

    const overTask = findTask(over.id)
    const overColumn = findColumn(over.id)

    if (overTask) {
      const activeColumn = findColumn(activeTask.status)
      const overColumn = findColumn(overTask.status)

      if (!activeColumn || !overColumn) return

      if (activeColumn.name !== overColumn.name) {
        moveTaskToColumn(activeTask, overColumn.name, over.id)
      } else {
        reorderTasksInColumn(activeColumn.name, active.id, over.id)
      }
    } else if (overColumn) {
      moveTaskToColumn(activeTask, overColumn.name)
    }

    setActiveTask(null)
  }

  const handleDragOver = (event) => {
    const { active, over } = event
    if (!over) return

    const activeTask = findTask(active.id)
    const overTask = findTask(over.id)

    if (!activeTask || !overTask) return

    if (activeTask.status !== overTask.status) {
      moveTaskToColumn(activeTask, overTask.status, over.id)
    }
  }

  const findTask = (taskId) => {
    for (const column of board.columns) {
      const task = column.tasks.find((t) => t.id === taskId)
      if (task) return { ...task, status: column.name }
    }
  }

  const findColumn = (columnNameOrId) => {
    return board.columns.find((col) => col.name === columnNameOrId || col.id === columnNameOrId)
  }

  const moveTaskToColumn = (task, newStatus, overId = null) => {
    const updatedColumns = board.columns.map((col) => {
      if (col.name === task.status) {
        return {
          ...col,
          tasks: col.tasks.filter((t) => t.id !== task.id),
        }
      }
      if (col.name === newStatus) {
        const newTasks = [...col.tasks]
        const taskToInsert = { ...task, status: newStatus }
        delete taskToInsert.status

        if (overId) {
          const overTaskIndex = newTasks.findIndex((t) => t.id === overId)
          if (overTaskIndex !== -1) {
            newTasks.splice(overTaskIndex, 0, taskToInsert)
          } else {
            newTasks.push(taskToInsert)
          }
        } else {
          newTasks.push(taskToInsert)
        }

        return {
          ...col,
          tasks: newTasks,
        }
      }
      return col
    })

    updateBoard({ ...board, columns: updatedColumns })
  }

  const reorderTasksInColumn = (columnName, activeId, overId) => {
    const updatedColumns = board.columns.map((col) => {
      if (col.name === columnName) {
        const oldIndex = col.tasks.findIndex((t) => t.id === activeId)
        const newIndex = col.tasks.findIndex((t) => t.id === overId)

        return {
          ...col,
          tasks: arrayMove(col.tasks, oldIndex, newIndex),
        }
      }
      return col
    })

    updateBoard({ ...board, columns: updatedColumns })
  }

  return (
    <main className="flex-1 overflow-x-auto p-4 bg-gray-100 dark:bg-gray-900">
      <DndContext
        sensors={sensors}
        collisionDetection={closestCorners}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
      >
        <div className="flex flex-col md:flex-row gap-6 h-full">
          {board?.columns?.map((column) => (
            <Column key={column.name} column={column} openTaskModal={openTaskModal} deleteTask={deleteTask} />
          )) || <p>No columns found</p>}
        </div>

        <DragOverlay>{activeTask ? <Task task={activeTask} isDragging /> : null}</DragOverlay>
      </DndContext>
    </main>
  )
}

export default Board

