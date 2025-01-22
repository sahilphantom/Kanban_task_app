import React, { useState, useEffect } from "react";
import { X, Plus, Trash } from "lucide-react";

const BoardModal = ({ onClose, onSubmit, initialBoard = null }) => {
  const [name, setName] = useState("");
  const [columns, setColumns] = useState(initialBoard ? initialBoard.columns : []);

  useEffect(() => {
    if (initialBoard) {
      setName(initialBoard.name);
      setColumns(initialBoard.columns);
    }
  }, [initialBoard]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const validColumns = columns.filter((column) => column.name.trim() !== "");
    onSubmit({ id: initialBoard ? initialBoard.id : Date.now(), name, columns: validColumns });
  };

  const addColumn = () => {
    setColumns([...columns, { name: "", color: "gray" }]);
  };

  const updateColumn = (index, field, value) => {
    const updatedColumns = columns.map((col, i) =>
      i === index ? { ...col, [field]: value } : col
    );
    setColumns(updatedColumns);
  };

  const removeColumn = (index) => {
    setColumns(columns.filter((_, i) => i !== index));
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-white dark:bg-gray-800 rounded-lg w-full max-w-md sm:max-w-lg lg:max-w-xl p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-bold text-gray-900 dark:text-white">
            {initialBoard ? "Edit Board" : "Add New Board"}
          </h2>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg">
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Board Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Web Design"
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600 dark:bg-gray-700 dark:text-white"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Board Columns</label>
            <div className="space-y-2">
              {columns.length === 0 ? (
                <div>No columns added</div>
              ) : (
                columns.map((column, index) => (
                  <div key={index} className="flex gap-2 flex-wrap sm:flex-nowrap">
                    <input
                      type="text"
                      value={column.name}
                      onChange={(e) => updateColumn(index, "name", e.target.value)}
                      placeholder="e.g. Todo"
                      className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600 dark:bg-gray-700 dark:text-white"
                      required
                    />
                    <select
                      value={column.color}
                      onChange={(e) => updateColumn(index, "color", e.target.value)}
                      className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600 dark:bg-gray-700 dark:text-white"
                    >
                      <option value="gray">Gray</option>
                      <option value="red">Red</option>
                      <option value="yellow">Yellow</option>
                      <option value="green">Green</option>
                      <option value="blue">Blue</option>
                      <option value="indigo">Indigo</option>
                      <option value="purple">Purple</option>
                      <option value="pink">Pink</option>
                    </select>
                    <button
                      type="button"
                      onClick={() => removeColumn(index)}
                      className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
                    >
                      <Trash className="w-5 h-5 text-gray-500" />
                    </button>
                  </div>
                ))
              )}
            </div>
            <button
              type="button"
              onClick={addColumn}
              className="mt-2 w-full px-4 py-2 bg-gray-100 dark:bg-gray-700 text-purple-600 rounded-full flex items-center justify-center gap-2 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
            >
              <Plus className="w-4 h-4" />
              Add New Column
            </button>
          </div>

          <button
            type="submit"
            className="w-full px-4 py-2 bg-purple-600 text-white rounded-full hover:bg-purple-700 transition-colors"
          >
            {initialBoard ? "Save Changes" : "Create New Board"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default BoardModal;
