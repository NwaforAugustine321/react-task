import React, { useEffect, memo } from 'react';
import styles from './mainDashboard.scss';
import { BsChevronDown } from 'react-icons/bs';
import Card from './card';
import { ItemTypes } from '../../constants';
import { useDrop } from 'react-dnd';

const MainDashboard = ({ list }) => {
  const [{ isOver }, drop] = useDrop(() => ({
    accept: ItemTypes.CARD,
    drop: (item, monitor) => console.log('from', item, monitor),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));

  return (
    <>
      <div className=' text-gray-700' ref={drop}>
        <div className='card_header'>
          <div className='grid_header_left_column'>
            <span className='movie_number'>#</span>

            <span></span>
            <p className='title'>Title</p>
          </div>

          <div className='grid_header_right_columns'>
            <span className='grid_header_author_name'>Author</span>
            <span className='grid_header_drop_list flex gap-x-1'>
              Most Liked <BsChevronDown />
            </span>
          </div>
        </div>
        {list?.map((data, key) => {
          return <Card data={data} key={key} />;
        })}
      </div>
    </>
  );
};

export default MainDashboard;
