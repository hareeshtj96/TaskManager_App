import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Dialog } from "@headlessui/react";
import {
  addTask,
  fetchTasks,
  clearTasks,
  updateTaskStatus,
  updateTask,
  deleteTask
} from "../../Redux/Slice/UserSlice";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";


// Task component that can be dragged
const Task = ({ task, onDrop, onEditClick, handleDeleteTask }) => {
  const [, dragRef] = useDrag({
    type: "TASK",
    item: { id: task._id, currentStatus: task.status },
  });

  return (
    <div ref={dragRef} className="task-card p-2 mt-4 mb-2 border bg-blue-50 rounded-lg">
      <h3 className="font-bold">{task.title}</h3>
      <p>Description {task.description}</p>
      <div className="text-gray-400 mt-4 text-xs font-medium">
        Created: {new Date(task.createdAt).toLocaleString()}
      </div>

      <div className="flex justify-end gap-2 mt-2">
        <button
          onClick={() => handleDeleteTask(task._id)}
          className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-sm transition-colors duration-200"
        >
          Delete
        </button>
        <button
          onClick={() => onEditClick(task)}
          className="bg-blue-400 hover:bg-blue-600 text-white px-3 py-1 rounded text-sm transition-colors duration-200"
        >
          Edit
        </button>
        <button
          onClick={() => onViewDetails(task._id)}
          className="bg-blue-500 hover:bg-gray-600 text-white px-3 py-1 rounded text-sm transition-colors duration-200"
        >
          View Details
        </button>
      </div>
    </div>
  );
};

// ColumnCard component that can drop tasks
const ColumnCard = ({ status, tasks, onDropTask, onEditClick, handleDeleteTask }) => {
  const [, dropRef] = useDrop({
    accept: "TASK",
    drop: (item) => onDropTask(item.id, status),
  });

  return (
    <div ref={dropRef} className="column-card-container p-4 bg-white shadow-md rounded-lg">
      <h2 className="bg-blue-500 text-white text-center p-3">{status}</h2>
      {tasks.map((task) => (
        <Task key={task._id} task={task} onEditClick={onEditClick} handleDeleteTask={handleDeleteTask} />
      ))}
    </div>
  );
};

const DashboardDnd = () => {
  const dispatch = useDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [currentTask, setCurrentTask] = useState(null);
  const [newTask, setNewTask] = useState({ title: "", description: "" });
  const state = useSelector((state) => state.user);
  const tasks = state.tasks;
  const user = useSelector((state) => state.user.user.user);
  const email = user?.email;

  useEffect(() => {
    if (email) {
      dispatch(clearTasks());
      dispatch(fetchTasks(email)).unwrap();
    }
  }, [dispatch, email]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewTask((previous) => ({ ...previous, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await dispatch(addTask({ ...newTask, email })).unwrap();
      toast.success("Task added successfully!");
      setIsModalOpen(false);
      setNewTask({ title: "", description: "" });
      dispatch(fetchTasks(email)).unwrap();
    } catch (error) {
      toast.error(error || "Failed to add task.");
    }
  };

  const handleDeleteTask = async (taskId) => {
    try {
        console.log("Deleting task with id:", taskId);
        await dispatch(deleteTask(taskId)).unwrap();
        toast.success("Task deleted successfully!");
      
        dispatch(fetchTasks(email)).unwrap();
    } catch (error) {
        toast.error(error || "Failed to delete task")
    }
  }

  const handleEditTask = async (e) => {
    e.preventDefault()
    try {
        console.log("Updating task:", { id: currentTask, title: newTask.title, description: newTask.description });
        await dispatch(updateTask({ id: currentTask, title: newTask.title, description: newTask.description })).unwrap();
        toast.success("Task updated successfully!");
        setIsEditModalOpen(false);
        setCurrentTask(null);
        setNewTask({ title: '', description: ''});
        dispatch(fetchTasks(email)).unwrap();
    } catch (error) {
        toast.error(error || "Failed to update task")
    }
  }

  const handleEditClick = (task) => {
    setCurrentTask(task._id);
    setNewTask({ title: task.title, description: task.description})
    setIsEditModalOpen(true);
  }

  const handleDropTask = async (taskId, newStatus) => {
    const task = tasks.find((t) => t._id === taskId);
    if (task) {
      try {
        // Update the task status in the backend
        await dispatch(updateTaskStatus({ id: taskId, newStatus })).unwrap();
        toast.success(`Task moved to ${newStatus}`);

        dispatch(fetchTasks(email)).unwrap();
      } catch (error) {
        toast.error("Failed to update the task status");
      }
    }
  };

  // Group tasks by status
  const columns = {
    TODO: tasks.filter((task) => task.status === "TODO"),
    IN_PROGRESS: tasks.filter((task) => task.status === "IN_PROGRESS"),
    DONE: tasks.filter((task) => task.status === "DONE"),
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="flex flex-col p-6">
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-blue-500 text-white rounded px-4 py-2 hover:bg-blue-600 mb-6 w-24"
        >
          Add Task
        </button>

        {/* Search and Sort Section */}
        <div className="flex items-center sm:flex-row items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <span className="text-gray-700">Search:</span>
            <input
              type="text"
              placeholder="Search..."
              className="border border-gray-300 rounded px-3 py-1 w-full sm:w-72"
            />
          </div>
          <div className="flex items-center gap-2 mt-2 sm:mt-0">
            <span className="text-gray-700">Sort By:</span>
            <select className="border border-gray-300 rounded px-3 py-1 w-full sm:w-32">
              <option value="recent">Recent</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {Object.keys(columns).map((status) => (
            <ColumnCard
              key={status}
              status={status}
              tasks={columns[status]}
              onDropTask={handleDropTask}
              onEditClick={handleEditClick}
              handleDeleteTask={handleDeleteTask}
            />
          ))}
        </div>

        <Dialog open={isModalOpen} onClose={() => setIsModalOpen(false)}>
          <div
            className="fixed inset-0 bg-black bg-opacity-30"
            aria-hidden="true"
          />
          <div className="fixed inset-0 flex items-center justify-center">
            <Dialog.Panel className="bg-white rounded shadow-lg p-6 w-full sm:max-w-md">
              <Dialog.Title className="text-lg font-medium">
                Add New Task
              </Dialog.Title>
              <form
                onSubmit={handleSubmit}
                className="flex flex-col gap-4 mt-4"
              >
                <div className="flex flex-col gap-2">
                  <label htmlFor="title" className="text-sm font-medium">
                    Title
                  </label>
                  <input
                    id="title"
                    name="title"
                    type="text"
                    value={newTask.title}
                    onChange={handleInputChange}
                    className="border border-gray-300 rounded px-3 py-2"
                    required
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label htmlFor="description" className="text-sm font-medium">
                    Description
                  </label>
                  <textarea
                    id="description"
                    name="description"
                    value={newTask.description}
                    onChange={handleInputChange}
                    className="border border-gray-300 rounded px-3 py-2 min-h-[100px]"
                    required
                  />
                </div>
                <div className="flex justify-end gap-3 mt-4">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="px-4 py-2 border border-gray-300 rounded hover:bg-gray-100"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                  >
                    Add Task
                  </button>
                </div>
              </form>
            </Dialog.Panel>
          </div>
        </Dialog> 
        


        <Dialog open={isEditModalOpen} onClose={() => setIsEditModalOpen(false)}>
          <div
            className="fixed inset-0 bg-black bg-opacity-30"
            aria-hidden="true"
          />
          <div className="fixed inset-0 flex items-center justify-center">
            <Dialog.Panel className="bg-white rounded shadow-lg p-6 w-full sm:max-w-md">
              <Dialog.Title className="text-lg font-medium">
                Edit Task
              </Dialog.Title>
              <form
                onSubmit={handleEditTask}
                className="flex flex-col gap-4 mt-4"
              >
                <div className="flex flex-col gap-2">
                  <label htmlFor="title" className="text-sm font-medium">
                    Title
                  </label>
                  <input
                    id="title"
                    name="title"
                    type="text"
                    value={newTask.title}
                    onChange={handleInputChange}
                    className="border border-gray-300 rounded px-3 py-2"
                    required
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label htmlFor="description" className="text-sm font-medium">
                    Description
                  </label>
                  <textarea
                    id="description"
                    name="description"
                    value={newTask.description}
                    onChange={handleInputChange}
                    className="border border-gray-300 rounded px-3 py-2 min-h-[100px]"
                    required
                  />
                </div>
                <div className="flex justify-end gap-3 mt-4">
                  <button
                    type="button"
                    onClick={() => setIsEditModalOpen(false)}
                    className="px-4 py-2 border border-gray-300 rounded hover:bg-gray-100"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                  >
                    Save Changes
                  </button>
                </div>
              </form>
            </Dialog.Panel>
          </div>
        </Dialog> 

       

        <ToastContainer />
      </div>
    </DndProvider>
  );
};

export default DashboardDnd;
