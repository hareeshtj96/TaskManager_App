import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify"; 
import 'react-toastify/dist/ReactToastify.css';
import { Dialog } from "@headlessui/react";
import { addTask } from "../../Redux/Slice/UserSlice";

const Dashboard = () => {
    const dispatch = useDispatch();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [newTask, setNewTask] = useState({ title: "", description: ""});

    const state = useSelector((state) => state.user)
    const tasks = state.tasks
    

    const user = useSelector((state) => state.user.user.user);
    const email = user?.email
    console.log("user", user);
    

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewTask(previous => ({
            ...previous,
            [name]: value
        }));
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("New Task:", newTask);
        try {
            // Dispatch the addTask 
            await dispatch(addTask({ ...newTask, email})).unwrap();

            toast.success("Task added successfully!");

            setIsModalOpen(false);
            setNewTask({ title: "", description: "" });
        } catch (error) {
            toast.error(error || "Failed to add task.");
        }
    }
    

    return (
        <div className="flex flex-col p-6">
        <button
            onClick={() => setIsModalOpen(true)}
            className="bg-blue-500 text-white rounded px-4 py-2 hover:bg-blue-600 mb-6 w-24"
        >
            Add Task
        </button>

        <Dialog open={isModalOpen} onClose={() => setIsModalOpen(false)}>
            <div className="fixed inset-0 bg-black bg-opacity-30" aria-hidden="true" />
            <div className="fixed inset-0 flex items-center justify-center">
                <Dialog.Panel className="bg-white rounded shadow-lg p-6 w-full sm:max-w-md">
                    <Dialog.Title className="text-lg font-medium">Add New Task</Dialog.Title>
                    <form onSubmit={handleSubmit} className="flex flex-col gap-4 mt-4">
                        <div className="flex flex-col gap-2">
                            <label htmlFor="title" className="text-sm font-medium">Title</label>
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
                            <label htmlFor="description" className="text-sm font-medium">Description</label>
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

        {/* Task Columns */}
        <div className="grid grid-cols-3 gap-6">
            {/* TODO Column */}
            <div className="flex flex-col">
        <div className="bg-blue-400 text-white p-2 rounded-t">TODO</div>
        {/* Task Cards */}
        <div className="flex flex-col gap-4 mt-4">
            {tasks.length > 0 ? (
                tasks.map((task) => (
                    <div key={task._id} className="bg-blue-100 shadow-md p-4 rounded-md">
                        <h4 className="font-bold">{task.title}</h4>
                        <p>Description: {task.description}</p>
                        <p className="text-gray-500 mt-8 mb-2">Created At: {new Date(task.createdAt).toLocaleString()}</p>
                        {/* Action Buttons */}
                        <div className="flex justify-end gap-2 mt-4">
                            <button className="bg-red-500 text-white px-4 py-2 rounded">Delete</button>
                            <button className="bg-blue-300 text-white px-4 py-2 rounded">Edit</button>
                            <button className="bg-blue-500 text-white px-4 py-2 rounded">View Details</button>
                        </div>
                    </div>
                ))
            ) : (
                <p>No tasks available</p>
            )}
        </div>
    </div>

            {/* In Progress Column */}
            <div className="flex flex-col">
                <div className="bg-blue-400 text-white p-2 rounded-t">IN PROGRESS</div>
                <div className="flex flex-col gap-4 mt-4">
                    {/* Task cards go here */}
                </div>
            </div>

            {/* Done Column */}
            <div className="flex flex-col">
                <div className="bg-blue-400 text-white p-2 rounded-t">DONE</div>
                <div className="flex flex-col gap-4 mt-4">
                    {/* Task cards go here */}
                </div>
            </div>
        </div>
        <ToastContainer />
    </div>
);
};

export default Dashboard;
