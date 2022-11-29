import React, { useEffect, memo } from 'react';
import styles from './mainDashboard.scss';
import { AiOutlineArrowUp } from 'react-icons/ai';
import { useDrag, useDrop } from 'react-dnd';
import { ItemTypes } from '../../constants';
import { moveKnight } from '../../main';

const Card = function ({ data }) {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: ItemTypes.CARD,
    item: {
      id: data?.id,
    },

    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  return (
    <div
      className='movie_card'
      ref={drag}
      style={{
        opacity: isDragging ? 0.5 : 1,
        fontSize: 25,
        fontWeight: 'bold',
        cursor: 'move',
      }}
    >
      <div className='grid_left_column'>
        <span className='movie_number'>{data?.id}</span>
        <img className='image' src={data?.photo}></img>
        <p>{data?.title}</p>
      </div>

      <div className='grid_right_column'>
        <div className='grid_author__column'>
          <img className='image' src={data?.photo}></img>
          <span className='author_name'>{data?.username}</span>
        </div>

        <div className='grid_view__column '>
          <span className='grid_view__number'>{data?.like}</span>

          <span className='grid_view__icon'>
            <AiOutlineArrowUp />
          </span>
        </div>
      </div>
    </div>
  );
};

export default Card;