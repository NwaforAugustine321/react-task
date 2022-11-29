import React, { useEffect, useState, useCallback } from 'react';
import { AuthContext } from '../authContext';
import Header from '../components/header/header';
import MainDashboard from '../components/mainDashboard/mainDashboard';
import MkdSDK from '../utils/MkdSDK';
import ReactPaginate from 'react-paginate';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

export const DragContext = React.createContext({
  rearrange: null,
  movies: [],
});

const AdminDashboardPage = ({ x, y, children }) => {
  const { state } = React.useContext(AuthContext);
  const [movieList, setMovieList] = useState([]);
  const [pageOffset, setPageOffset] = useState(0);
  const [pageCount, setPageCount] = useState(0);
  const [perPage, setPerPage] = useState(10);
  const endOffset = pageOffset + perPage;

  const handlePageClick = (event) => {
    setPageOffset(event.selected);
  };

  const reset = (list) => {
    setMovieList(list);
  };
  const fetchMovies = async () => {
    let sdk = new MkdSDK();
    const response = await sdk.callRestAPI(
      {
        payload: {},
        page: pageOffset,
        limit: perPage,
      },
      'POST',
      '/v1/api/rest/video/PAGINATE'
    );
    const { limit, num_pages, page, total, error, list } = response;

    setPageCount(num_pages);
    //endOffset;
    setMovieList(list.slice(pageOffset, endOffset));
    localStorage.setItem('list', list.slice(pageOffset, endOffset));
  };

  useEffect(() => {
    if (!state.isAuthenticated) {
      window.location.href = '/admin/login';
      return;
    }
  });

  const onDragEnd = (data) => {
    let startIndex = data.destination.index;
    let endIndex = data.source.index;

    const list = movieList.splice(
      startIndex,
      0,
      movieList.splice(endIndex, 1)[0]
    );

    setMovieList(movieList);
  };

  useEffect(() => {
    fetchMovies();
  }, [pageOffset, perPage]);

  return (
    <div className='page-wrapper w-full py-10 px-5 bg-black'>
      <div className='text-7xl  text-gray-700  container sm:mx-auto'>
        <Header />
        <div className='top_timer'>
          <p className='title'>Today’s leaderboard</p>
          <div className='flex top_timer_inner_container'>
            <p className='date'>30 May 2022</p>
            <div className='timer_container'>
              <span className='dot'></span>
              <p className='timer_title '>Submissions OPEN</p>
              <span className='dot'></span>
            </div>
            <p className='time'>11:34</p>
          </div>
        </div>
        <div className='h-full'>
          <DragDropContext onDragEnd={onDragEnd}>
            <MainDashboard list={movieList} reset={reset} />
          </DragDropContext>
        </div>
        <ReactPaginate
          breakLabel='...'
          nextLabel='>>'
          onPageChange={handlePageClick}
          pageRangeDisplayed={5}
          pageCount={pageCount}
          forcePage={pageOffset}
          pageClassName='page-item'
          previousLabel='<<'
          pageLinkClassName='page-link'
          previousClassName='page-item'
          previousLinkClassName='page-link'
          nextClassName='page-item'
          nextLinkClassName='page-link'
          breakClassName='page-item'
          breakLinkClassName='page-link'
          containerClassName='pagination pagination-sm'
          activeClassName='active'
          renderOnZeroPageCount={null}
        />
      </div>
    </div>
  );
};

export default AdminDashboardPage;
