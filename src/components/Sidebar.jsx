import { EyeOff, Sun, Moon, Plus } from "lucide-react"

const Sidebar = ({ boards, currentBoard, setCurrentBoard, darkMode, toggleDarkMode, toggleSidebar, openBoardModal }) => {
  return (
    <aside className="w-[300px] h-screen bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 flex flex-col">
      <div className="p-6">
        <h1 className="text-2xl font-bold text-purple-600">kanban</h1>
      </div>

      <div className="px-6 py-4 flex-grow">
        <h2 className="text-sm font-semibold text-gray-500 dark:text-gray-400 mb-4">
          ALL BOARDS ({boards?.length || 0})
        </h2>

        <ul className="space-y-2">
          {boards?.map((board) => (
            <li key={board.id}>
              <button
                onClick={() => setCurrentBoard(board)}
                className={`w-full text-left px-4 py-2 rounded-lg transition-colors
                  ${
                    currentBoard?.id === board.id
                      ? "bg-purple-600 text-white"
                      : "text-gray-600 dark:text-gray-300 hover:bg-purple-100 dark:hover:bg-gray-700"
                  }`}
              >
                {board.name}
              </button>
            </li>
          ))}
        </ul>

        <button
          onClick={openBoardModal}
          className="w-full mt-4 flex items-center gap-2 text-purple-600 hover:text-purple-700 transition-colors px-4 py-2"
        >
          <Plus className="w-5 h-5" />
          Create New Board
        </button>
      </div>

      <div className="p-6 space-y-4">
        <div className="flex items-center justify-center p-4 bg-gray-100 dark:bg-gray-900 rounded-lg">
          <Sun className="w-5 h-5 text-gray-500 dark:text-gray-400" />
          <button onClick={toggleDarkMode} className="mx-4 relative w-12 h-6 bg-purple-600 rounded-full">
            <div
              className={`absolute w-4 h-4 bg-white rounded-full top-1 transition-all
                ${darkMode ? "left-7" : "left-1"}`}
            />
          </button>
          <Moon className="w-5 h-5 text-gray-500 dark:text-gray-400" />
        </div>

        <button
          onClick={toggleSidebar}
          className="flex items-center gap-2 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
        >
          <EyeOff className="w-5 h-5" />
          Hide Sidebar
        </button>
      </div>
    </aside>
  )
}

export default Sidebar

