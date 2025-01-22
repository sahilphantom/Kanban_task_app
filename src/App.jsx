import { useState, useEffect } from "react"
import Sidebar from "./components/Sidebar"
import Header from "./components/Header"
import Board from "./components/Board"
import TaskModal from "./components/TaskModal"
import BoardModal from "./components/BoardModal"
import { defaultData } from "./data/defaultData"

const App = () => {
  const [darkMode, setDarkMode] = useState(() => {
    const saved = localStorage.getItem("darkMode")
    return saved ? JSON.parse(saved) : true // Default to dark mode
  })

  const [sidebarVisible, setSidebarVisible] = useState(true)
  const [boards, setBoards] = useState(() => {
    const saved = localStorage.getItem("boards")
    return saved ? JSON.parse(saved) : defaultData.boards
  })
  const [currentBoard, setCurrentBoard] = useState(() => {
    const savedCurrentBoardId = localStorage.getItem("currentBoardId")
    if (savedCurrentBoardId && boards.length > 0) {
      return boards.find((b) => b.id.toString() === savedCurrentBoardId) || boards[0]
    }
    return boards.length > 0 ? boards[0] : null
  })
  const [taskModalOpen, setTaskModalOpen] = useState(false)
  const [boardModalOpen, setBoardModalOpen] = useState(false)
  const [editingTask, setEditingTask] = useState(null)
  const [editingBoard, setEditingBoard] = useState(null)

  useEffect(() => {
    localStorage.setItem("boards", JSON.stringify(boards))
    localStorage.setItem("darkMode", JSON.stringify(darkMode))
    if (currentBoard) {
      localStorage.setItem("currentBoardId", currentBoard.id.toString())
    } else {
      localStorage.removeItem("currentBoardId")
    }
    // Apply dark mode to root html element
    if (darkMode) {
      document.documentElement.classList.add("dark")
    } else {
      document.documentElement.classList.remove("dark")
    }
  }, [boards, darkMode, currentBoard])

  const toggleDarkMode = () => setDarkMode(!darkMode)
  const toggleSidebar = () => setSidebarVisible(!sidebarVisible)

  // Board CRUD operations
  const addNewBoard = (board) => {
    const newBoard = { ...board, id: Date.now() }
    setBoards([...boards, newBoard])
    setCurrentBoard(newBoard)
    setBoardModalOpen(false)
  }

  const updateBoard = (updatedBoard) => {
    setBoards(boards.map((board) => (board.id === updatedBoard.id ? updatedBoard : board)))
    setCurrentBoard(updatedBoard)
    setBoardModalOpen(false)
  }

  const deleteBoard = (boardId) => {
    if (window.confirm("Are you sure you want to delete this board?")) {
      const newBoards = boards.filter((board) => board.id !== boardId)
      setBoards(newBoards)
      setCurrentBoard(newBoards.length > 0 ? newBoards[0] : null)
    }
  }

  // Task CRUD operations
  const addNewTask = (task) => {
    const updatedBoard = {
      ...currentBoard,
      columns: currentBoard.columns.map((col) => {
        if (col.name.toLowerCase() === task.status.toLowerCase()) {
          return { ...col, tasks: [...col.tasks, { ...task, id: Date.now() }] }
        }
        return col
      }),
    }
    updateBoard(updatedBoard)
    setTaskModalOpen(false)
  }

  const updateTask = (updatedTask) => {
    const updatedBoard = {
      ...currentBoard,
      columns: currentBoard.columns.map((col) => ({
        ...col,
        tasks: col.tasks.map((task) => (task.id === updatedTask.id ? updatedTask : task)),
      })),
    }
    updateBoard(updatedBoard)
    setTaskModalOpen(false)
    setEditingTask(null)
  }

  const deleteTask = (taskId) => {
    if (window.confirm("Are you sure you want to delete this task?")) {
      const updatedBoard = {
        ...currentBoard,
        columns: currentBoard.columns.map((col) => ({
          ...col,
          tasks: col.tasks.filter((task) => task.id !== taskId),
        })),
      }
      updateBoard(updatedBoard)
    }
  }

  return (
    <div className="min-h-screen flex">
      {sidebarVisible && (
        <Sidebar
          boards={boards}
          currentBoard={currentBoard}
          setCurrentBoard={setCurrentBoard}
          darkMode={darkMode}
          toggleDarkMode={toggleDarkMode}
          toggleSidebar={toggleSidebar}
          openBoardModal={() => {
            setEditingBoard(null)
            setBoardModalOpen(true)
          }}
        />
      )}

      <div className="flex-1 flex flex-col bg-gray-100 dark:bg-gray-900">
        <Header
          board={currentBoard}
          sidebarVisible={sidebarVisible}
          toggleSidebar={toggleSidebar}
          openTaskModal={() => {
            setEditingTask(null)
            setTaskModalOpen(true)
          }}
          openBoardModal={() => {
            setEditingBoard(currentBoard)
            setBoardModalOpen(true)
          }}
          deleteBoard={() => deleteBoard(currentBoard?.id)}
        />

        {currentBoard ? (
          <Board
            board={currentBoard}
            updateBoard={updateBoard}
            openTaskModal={(task) => {
              setEditingTask(task)
              setTaskModalOpen(true)
            }}
            deleteTask={deleteTask}
          />
        ) : (
          <div className="flex-1 flex items-center justify-center bg-gray-100 dark:bg-gray-900">
            <p className="text-gray-500 dark:text-gray-400">No board selected. Create a new board to get started.</p>
          </div>
        )}

        {taskModalOpen && (
          <TaskModal
            columns={currentBoard.columns}
            onClose={() => {
              setTaskModalOpen(false)
              setEditingTask(null)
            }}
            onSubmit={editingTask ? updateTask : addNewTask}
            initialTask={editingTask}
          />
        )}

        {boardModalOpen && (
          <BoardModal
            onClose={() => {
              setBoardModalOpen(false)
              setEditingBoard(null)
            }}
            onSubmit={editingBoard ? updateBoard : addNewBoard}
            initialBoard={editingBoard}
          />
        )}
      </div>
    </div>
  )
}

export default App

