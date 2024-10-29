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
} from "../../Redux/Slice/UserSlice";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import ColumnCard from "./ColumCard";
import { move } from "formik";

const Dashboard = () => {
  const dispatch = useDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newTask, setNewTask] = useState({ title: "", description: "" });

  const state = useSelector((state) => state.user);
  console.log("state...", state);
  const tasks = state.tasks;
  console.log("tasks:", tasks);

  const [columns, setColumns] = useState({
    TODO: tasks.filter(task => task.status === "TODO"),
    IN_PROGRESS: tasks.filter(task => task.status === "IN_PROGRESS"),
    DONE: tasks.filter(task => task.status === "DONE")
  })

 

  const user = useSelector((state) => state.user.user.user);
  const email = user?.email;
  console.log("user", user);



  useEffect(() => {
    if (email) {
      dispatch(clearTasks());
      dispatch(fetchTasks(email)).unwrap();
    }
  }, [dispatch, email]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewTask((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("New Task:", newTask);
    try {
      // Dispatch the addTask
      await dispatch(addTask({ ...newTask, email })).unwrap();

      toast.success("Task added successfully!");

      setIsModalOpen(false);
      setNewTask({ title: "", description: "" });
    } catch (error) {
      toast.error(error || "Failed to add task.");
    }
  };

  const handleDragEnd = async (result) => {
    console.log("result", result);

    const { source, destination, draggableId } = result;

    if (!destination) return;

    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    ) {
      return;
    }

    // Get current source and destination
    const startCol = columns[source.droppableId];
    const endCol = columns[destination.droppableId];

    // Move within same column
    if (startCol === endCol) {
        const updatedTasks = Array.from(startCol);
        const [movedTask] = updateTaskStatus.splice(source.index, 1);
        updatedTasks.splice(destination.index, 0, movedTask);

        setColumns((prevColumns) => ({
            ...prevColumns,
            [source.droppableId]: updateTaskStatus,
        }));
        return;
    };

    // Move to a different column
    const startTasks = Array.from(startCol);
    const [movedTask] = startTasks.splice(source.index, 1);
    const endTasks = Array.from(endCol);
    endTasks.splice(destination.index, 0, movedTask)

    const updatedTask = { ...movedTask, status: destination.droppableId };

    try {
        await updateTaskStatus({ id: updatedTask._id, newStatus: destination.droppableId });
        setColumns((prevColumns) => ({
            ...prevColumns,
            [source.droppableId]: startTasks,
            [destination.droppableId]: endTasks,
        }));
    } catch (error) {
        console.error("Failed to update task status:", error);
    }
  }

  const handleDelete = () => {};

  const handleEdit = () => {};

  const handleViewDetails = () => {};

  const handleDragStart = () => {
    console.log("Drag started");
  };

  return (
    <div className="flex flex-col p-6">
      <button
        onClick={() => setIsModalOpen(true)}
        className="bg-blue-500 text-white rounded px-4 py-2 hover:bg-blue-600 mb-6 w-24"
      >
        Add Task
      </button>

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
            <form onSubmit={handleSubmit} className="flex flex-col gap-4 mt-4">
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

      {/* Search and Sort Section */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <span className="text-gray-700">Search:</span>
          <input
            type="text"
            placeholder="Search..."
            className="border border-gray-300 rounded px-3 py-1 w-72"
          />
        </div>
        <div className="flex items-center gap-2">
          <span className="text-gray-700">Sort By:</span>
          <select className="border border-gray-300 rounded px-3 py-1 w-32">
            <option value="recent">Recent</option>
          </select>
        </div>
      </div>

     
      <DragDropContext onDragEnd={handleDragEnd}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {["TODO", "IN_PROGRESS", "DONE"].map((status) => (
                  <ColumnCard
                    key={status}
                    status={status}
                    tasks={columns[status]}
                    onDelete={(id) => handleDelete(id)}
                    onEdit={(id) => handleEdit(id)}
                    onViewDetails={(id) => handleViewDetails(id)}
                  />
          ))}
        </div>
      </DragDropContext> 

      <ToastContainer />
    </div>
  );
};

export default Dashboard;
