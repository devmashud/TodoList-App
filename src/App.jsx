import { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import { v4 as uuidv4 } from "uuid";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

function App() {
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState(() => {
    let saved = localStorage.getItem("todos");
    return saved ? JSON.parse(saved) : [];
  });
  const [showFinished, setShowFinished] = useState(true);
  const [editingId, setEditingId] = useState(null);

  // Save todos to localStorage
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const toggleComplete = () => {
    setShowFinished(!showFinished);
  };

  const handleAdd = () => {
    if (todo.trim() === "") return;

    if (editingId) {
      // Update existing todo
      setTodos(
        todos.map((t) =>
          t.id === editingId ? { ...t, todo } : t
        )
      );
      setEditingId(null);
    } else {
      // Add new todo
      setTodos([...todos, { id: uuidv4(), todo, isCompleted: false }]);
    }

    setTodo("");
  };

  const handleEdit = (id) => {
    const editTodo = todos.find((t) => t.id === id);
    setTodo(editTodo.todo);
    setEditingId(id);
  };

  const handleDelete = (id) => {
    setTodos(todos.filter((t) => t.id !== id));
  };

  const handleChange = (e) => {
    setTodo(e.target.value);
  };

  const handleCheckbox = (id) => {
    setTodos(
      todos.map((t) =>
        t.id === id ? { ...t, isCompleted: !t.isCompleted } : t
      )
    );
  };

  const handleClearAll = () => {
    setTodos([]);
    localStorage.removeItem("todos");
  };

  return (
    <>
      <Navbar />

      <div className="container flex flex-col mx-auto min-h-[80vh] bg-violet-100">
        <div className="md:w-auto p-10">
          <h2 className="text-2xl font-bold px-2 py-2">
            {editingId ? "Edit Todo" : "Add a Todo"}
          </h2>

          <input
            onChange={handleChange}
            value={todo}
            type="text"
            className="bg-white rounded-2xl py-2 px-3 w-80 md:w-96"
            placeholder="Write your task..."
          />

          <button
            onClick={handleAdd}
            className="bg-violet-800 text-white px-4 py-2 mx-2 my-3 rounded-xl hover:bg-violet-600"
          >
            {editingId ? "Update" : "Save"}
          </button>

          <button
            onClick={handleClearAll}
            className="bg-red-600 text-white px-4 py-2 mx-1 rounded-xl hover:bg-red-700"
          >
            Clear All
          </button>

          <div className="my-3 mx-2">
            <input
              onChange={toggleComplete}
              type="checkbox"
              checked={showFinished}
              className="mr-2"
            />
            Show Completed
          </div>
        </div>

        <div className="todos p-10 md:w-1/2 lg:w-1/3">
          <h2 className="font-bold text-2xl my-3">Your Todos</h2>

          {todos.length === 0 ? (
            <p className="text-gray-500">No todos yet. Add one!</p>
          ) : (
            todos.map(
              (item) =>
                (showFinished || !item.isCompleted) && (
                  <div
                    key={item.id}
                    className="todo flex gap-3 items-center justify-between my-3 bg-white p-3 rounded-xl shadow"
                  >
                    <div className="flex gap-5 items-center">
                      <input
                        onChange={() => handleCheckbox(item.id)}
                        type="checkbox"
                        checked={item.isCompleted}
                      />
                      <div
                        className={`${
                          item.isCompleted ? "line-through text-gray-500" : ""
                        }`}
                      >
                        {item.todo}
                      </div>
                    </div>
                    <div className="flex">
                      <button
                        onClick={() => handleEdit(item.id)}
                        className="bg-violet-700 hover:bg-violet-900 text-white px-3 py-1 rounded-xl"
                      >
                        <FaEdit />
                      </button>
                      <button
                        onClick={() => handleDelete(item.id)}
                        className="bg-violet-700 hover:bg-violet-900 text-white px-3 py-1 mx-2 rounded-xl"
                      >
                        <MdDelete />
                      </button>
                    </div>
                  </div>
                )
            )
          )}
        </div>
      </div>
    </>
  );
}

export default App;
