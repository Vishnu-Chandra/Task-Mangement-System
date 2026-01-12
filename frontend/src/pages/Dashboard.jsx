import { useEffect, useState } from "react";
import API from "../api/api";
import { logout } from "../utils/auth";
import Toast from "../components/Toast";
import { getRelativeTime } from "../utils/formatTime";

export default function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [editTitle, setEditTitle] = useState("");
  const [editDescription, setEditDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const fetchTasks = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await API.get("/tasks");
      setTasks(res.data);
    } catch (error) {
      setError("Failed to load tasks. Please try again.");
      console.error("Error fetching tasks:", error);
    } finally {
      setLoading(false);
    }
  };

  const addTask = async () => {
    if (!title.trim()) {
      setError("Task title cannot be empty");
      return;
    }
    
    setError("");
    try {
      await API.post("/tasks", { title, description });
      setTitle("");
      setDescription("");
      setSuccess("Task added successfully!");
      fetchTasks();
    } catch (error) {
      setError(error.response?.data?.message || "Failed to add task");
      console.error("Error adding task:", error);
    }
  };

  const deleteTask = async (id) => {
    if (!window.confirm("Are you sure you want to delete this task?")) return;
    
    setError("");
    try {
      await API.delete(`/tasks/${id}`);
      setSuccess("Task deleted successfully!");
      fetchTasks();
    } catch (error) {
      setError(error.response?.data?.message || "Failed to delete task");
      console.error("Error deleting task:", error);
    }
  };

  const startEdit = (task) => {
    setEditingId(task._id);
    setEditTitle(task.title);
    setEditDescription(task.description || "");
    setError("");
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditTitle("");
    setEditDescription("");
    setError("");
  };

  const updateTask = async (id) => {
    if (!editTitle.trim()) {
      setError("Task title cannot be empty");
      return;
    }
    
    setError("");
    try {
      await API.put(`/tasks/${id}`, {
        title: editTitle,
        description: editDescription
      });
      setEditingId(null);
      setEditTitle("");
      setEditDescription("");
      setSuccess("Task updated successfully!");
      fetchTasks();
    } catch (error) {
      setError(error.response?.data?.message || "Failed to update task");
      console.error("Error updating task:", error);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      {success && <Toast message={success} type="success" onClose={() => setSuccess("")} />}
      
      <div className="max-w-2xl mx-auto bg-white p-6 rounded-xl shadow-lg">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">My Tasks</h2>
          <button
            onClick={() => {
              logout();
              window.location.reload();
            }}
            className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
          >
            Logout
          </button>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-lg text-sm">
            {error}
          </div>
        )}
  
        {/* Add Task Form */}
        <div className="mb-6 p-4 bg-gray-50 rounded-lg">
          <input
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
              setError("");
            }}
            onKeyPress={(e) => e.key === "Enter" && !e.shiftKey && addTask()}
            placeholder="Task title"
            className="w-full p-3 border border-gray-300 rounded-lg mb-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Task description (optional)"
            rows="2"
            className="w-full p-3 border border-gray-300 rounded-lg mb-2 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
          />
          <button
            onClick={addTask}
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition font-medium"
          >
            Add Task
          </button>
        </div>
  
        {/* Task List */}
        {loading ? (
          <div className="flex justify-center items-center py-12">
            <div className="flex flex-col items-center">
              <svg className="animate-spin h-8 w-8 text-blue-600 mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              <p className="text-gray-500">Loading tasks...</p>
            </div>
          </div>
        ) : (
          <div className="space-y-3">
            {tasks.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                No tasks yet. Create your first task above!
              </div>
            ) : (
              tasks.map((task) => (
                <div
                  key={task._id}
                  className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition"
                >
                  {editingId === task._id ? (
                    // Edit Mode
                    <div className="space-y-3">
                      {error && editingId === task._id && (
                        <div className="p-2 bg-red-100 border border-red-400 text-red-700 rounded text-xs">
                          {error}
                        </div>
                      )}
                      <input
                        value={editTitle}
                        onChange={(e) => {
                          setEditTitle(e.target.value);
                          setError("");
                        }}
                        className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Task title"
                      />
                      <textarea
                        value={editDescription}
                        onChange={(e) => setEditDescription(e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                        placeholder="Task description (optional)"
                        rows="2"
                      />
                      <div className="flex gap-2">
                        <button
                          onClick={() => updateTask(task._id)}
                          className="flex-1 bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700 transition"
                        >
                          Save
                        </button>
                        <button
                          onClick={cancelEdit}
                          className="flex-1 bg-gray-400 text-white py-2 px-4 rounded hover:bg-gray-500 transition"
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  ) : (
                    // View Mode
                    <div>
                      <div className="flex justify-between items-start mb-2">
                        <div className="flex-1">
                          <h3 className="font-semibold text-lg text-gray-800 mb-1">
                            {task.title}
                          </h3>
                          {task.description && (
                            <p className="text-gray-600 text-sm whitespace-pre-wrap mb-2">
                              {task.description}
                            </p>
                          )}
                          <p className="text-xs text-gray-400">
                            Created {getRelativeTime(task.createdAt)}
                          </p>
                        </div>
                        <div className="flex gap-2 ml-4">
                          <button
                            onClick={() => startEdit(task)}
                            className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 transition text-sm"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => deleteTask(task._id)}
                            className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition text-sm"
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
}
