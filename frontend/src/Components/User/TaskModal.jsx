import React, { useEffect, useState } from "react";
import { Dialog } from "@headlessui/react";
import { toast } from "react-toastify";

const TaskModal = ({ isOpen, onClose, onSubmit, initialTask }) => {
  const [task, setTask] = useState({ title: "", description: "" });

  useEffect(() => {
    if (initialTask) {
      setTask({
        title: initialTask.title,
        description: initialTask.description,
      });
    } else {
      setTask({ title: "", description: "" });
    }
  }, [initialTask, isOpen]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setTask((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSubmit) {
      onSubmit(task);
      toast.success(
        initialTask ? "Task updated Successfully!" : "Task added Successfully!"
      );
      onClose();
    }
  };

  return (
    <Dialog open={isOpen} onClose={onClose}>
      <div
        className="fixed inset-0 bg-black bg-opacity-30"
        aria-hidden="true"
      />
      <div className="fixed inset-0 flex items-center justify-center">
        <Dialog.Panel className="bg-white rounded shadow-lg p-6 w-full sm:max-w-md">
          <Dialog.Title className="text-lg font-medium">
            {initialTask ? "Edit Task" : "Add New Task"}
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
                value={task.title}
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
                value={task.description}
                onChange={handleInputChange}
                className="border border-gray-300 rounded px-3 py-2 min-h-[100px]"
                required
              />
            </div>
            <div className="flex justify-end gap-3 mt-4">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 border border-gray-300 rounded hover:bg-gray-100"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                {initialTask ? "Update Task" : "Add Task"}
              </button>
            </div>
          </form>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
};

export default TaskModal;
