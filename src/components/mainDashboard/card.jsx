import React from 'react';
import styles from './mainDashboard.scss';
import { AiOutlineArrowUp } from 'react-icons/ai';

const Card = function (props) {
  const { data } = props;

  return (
    <div className='movie_card'>
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
