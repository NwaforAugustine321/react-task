import React from 'react';
import Card from './card';
import { Droppable, Draggable } from 'react-beautiful-dnd';

const MainDashboard = ({ list, reset }) => {
  return (
    <Droppable droppableId='droppable-1'>
      {(provided, snapshot) => (
        <div ref={provided.innerRef} {...provided.droppableProps}>
          {list.map((item, index) => (
            <Draggable
              draggableId={`draggable` + index}
              index={index}
              key={index}
            >
              {(provided, snapshot) => (
                <div
                  key={index}
                  ref={provided.innerRef}
                  {...provided.draggableProps}
                  {...provided.dragHandleProps}
                >
                  <Card data={item} />
                </div>
              )}
            </Draggable>
          ))}
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  );
};

export default MainDashboard;
