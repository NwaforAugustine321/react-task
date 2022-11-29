import React, { useEffect, memo, useContext, useCallback } from 'react';
import styles from './mainDashboard.scss';
import { BsChevronDown } from 'react-icons/bs';
import Card from './card';
import { ItemTypes } from '../../constants';
import { useDrop } from 'react-dnd';
import { DragContext } from '../../pages/AdminDashboardPage';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

const MainDashboard = ({ list, reset }) => {
  //const { rearrange, movies } = useContext(DragContext);

  const rearrange = (id, list) => {
    // const temp = list[id];
    // const _rightItem = list.slice(id + 1, list.length);
    // const _leftItem = list.slice(0, id);
    // let newItem = _leftItem.concat(_rightItem);
    // newItem.unshift(temp);
    // setMovieList(newItem);
    // const result = Array.from(list);
    // const [removed] = result.splice(startIndex, 1);
    // result.splice(endIndex, 0, removed);
    // console.log(result);
    // reset(result);
  };

  //   const onDragEnd = (result) => {
  //     // dropped outside the list
  //     if (!result.destination) {
  //       return;
  //     }

  //     const items = reorder(list, result.source.index, result.destination.index);
  //     reset(items);
  //   };

  const onDragEnd = useCallback(() => {
    // the only one that is required
  }, []);

  const getItemStyle = (isDragging, draggableStyle) => ({
    // some basic styles to make the items look a bit nicer
    userSelect: 'none',
    // padding: grid * 2,
    //margin: `0 0 ${grid}px 0`,

    // change background colour if dragging
    background: isDragging ? 'lightgreen' : 'grey',

    // styles we need to apply on draggables
    ...draggableStyle,
  });
  return (
    // <DragDropContext onDragEnd={onDragEnd}>
    //   <Droppable droppableId='droppable'>
    //     {(provided, snapshot) => (
    //       <div {...provided.droppableProps} ref={provided.innerRef}>
    //         {list.map((item, index) => (
    //           <Draggable
    //             key={item.id}
    //             draggableId={`${item.id} + draggableId`}
    //             index={index}
    //           >
    //             {(provided, snapshot) => (
    //               <Card
    //                 style={getItemStyle(
    //                   snapshot.isDragging,
    //                   provided.draggableProps.style
    //                 )}
    //                 ref={provided.innerRef}
    //                 data={item}
    //                 {...provided.draggableProps}
    //                 {...provided.dragHandleProps}
    //               />
    //             )}
    //           </Draggable>
    //         ))}
    //         {provided.placeholder}
    //       </div>
    //     )}
    //   </Droppable>
    //   </DragDropContext>

    // <>
    //   <div className=' text-gray-700 '>
    //     <div className='card_header'>
    //       <div className='grid_header_left_column'>
    //         <span className='movie_number'>#</span>

    //         <span></span>
    //         <p className='title'>Title</p>
    //       </div>

    //       <div className='grid_header_right_columns'>
    //         <span className='grid_header_author_name'>Author</span>
    //         <span className='grid_header_drop_list flex gap-x-1'>
    //           Most Liked <BsChevronDown />
    //         </span>
    //       </div>
    //     </div>

    //     {/* {list.length > 0 ? (
    //       list?.map((data, key) => {
    //         return <Card data={data} key={key} movie={list} index={key} />;
    //       })
    //     ) : (
    //       <div className='h-screen flex justify-center items-baseline'>
    //         <span className='empty_page'>No Result....</span>
    //       </div>
    //     )} */}
    //   </div>
    // </>
    <Droppable droppableId='droppable-1'>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.droppableProps}
          style={
            {
              // backgroundColor: 'red',
              // padding: '50px 5px',
            }
          }
        >
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
