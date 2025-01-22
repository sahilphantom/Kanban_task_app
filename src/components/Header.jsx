import { Menu, MoreVertical, Plus, Edit2, Trash2 } from "lucide-react"
import { useState, useRef, useEffect } from "react"

const Header = ({ board, sidebarVisible, toggleSidebar, openTaskModal, openBoardModal, deleteBoard }) => {
  const [menuOpen, setMenuOpen] = useState(false)
  const menuRef = useRef(null)

  useEffect(() => {
    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  return (
    <header className="h-16 px-4 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between bg-white dark:bg-gray-800">
      <div className="flex items-center gap-4">
        {!sidebarVisible && (
          <button onClick={toggleSidebar} className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg">
            <Menu className="w-5 h-5 text-gray-500 dark:text-gray-400" />
          </button>
        )}
        <h1 className="text-xl font-bold text-gray-900 dark:text-white">{board?.name || "No Board Selected"}</h1>
      </div>

      <div className="flex items-center gap-4">
        {board && (
          <button
            onClick={openTaskModal}
            className="px-4 py-2 bg-purple-600 text-white rounded-full flex items-center gap-2 hover:bg-purple-700 transition-colors"
          >
            <Plus className="w-4 h-4" />
            <span className="hidden sm:inline">Add New Task</span>
          </button>
        )}

        {board && (
          <div className="relative" ref={menuRef}>
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
            >
              <MoreVertical className="w-5 h-5 text-gray-500 dark:text-gray-400" />
            </button>

            {menuOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-lg z-10 py-1">
                <button
                  onClick={() => {
                    openBoardModal()
                    setMenuOpen(false)
                  }}
                  className="w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center gap-2"
                >
                  <Edit2 className="w-4 h-4" />
                  Edit Board
                </button>
                <button
                  onClick={() => {
                    deleteBoard()
                    setMenuOpen(false)
                  }}
                  className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center gap-2"
                >
                  <Trash2 className="w-4 h-4" />
                  Delete Board
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </header>
  )
}

export default Header

