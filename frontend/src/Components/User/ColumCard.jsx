import React from "react";
import { Droppable, Draggable } from "react-beautiful-dnd";

const ColumnCard = ({ status, tasks, handleDeleteTask, onEditClick, onViewDetails }) => {
    console.log("status..................:", status);
    
  return (
    
    <Droppable droppableId={status} direction="vertical">
      {(provided) => (
        <div
          className="column-card-container p-4 rounded bg-white shadow-md"
          ref={provided.innerRef}
          {...provided.droppableProps}
        >
          <h2 className="bg-blue-500 text-white font-bold text-xl text-center p-2 rounded-t">
            {status}
          </h2>
          <div className="mt-4">
            {tasks && tasks
              .filter((task) => task.status === status)
              .map((task, index) => {
                console.log("task status:", task.status);
                return (

                <Draggable key={task._id} draggableId={task._id} index={index}>
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      className="column-card p-2 mb-2 border border-gray-300 rounded bg-blue-50 hover:bg-blue-100"
                    >
                      <h3 className="text-blue-700 font-medium">{task.title}</h3>
                      <p>Description: {task.description}</p>
                      <div className="text-gray-400 mt-4 text-xs">
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
                          onClick={() => onEditClick(task._id)}
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
                  )}
                </Draggable>

                )
                
                
            })}
            {provided.placeholder}
          </div>
        </div>
      )}
    </Droppable>
  );
};

export default ColumnCard;
