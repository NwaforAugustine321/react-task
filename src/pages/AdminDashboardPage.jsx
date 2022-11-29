import React, { useEffect, useState } from 'react';
import { AuthContext } from '../authContext';
import Header from '../components/header/header';
import MainDashboard from '../components/mainDashboard/mainDashboard';
import MkdSDK from '../utils/MkdSDK';
import ReactPaginate from 'react-paginate';

const AdminDashboardPage = ({ x, y, children }) => {
  const { state } = React.useContext(AuthContext);
  const [movieList, setMovieList] = useState([]);
  const [pageOffset, setPageOffset] = useState(1);
  const [pageCount, setPageCount] = useState(0);
  const [perPage, setPerPage] = useState(10);
  const endOffset = pageOffset + perPage;

  const handlePageClick = (event) => {
    setPageOffset(event.selected);
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
  };

  useEffect(() => {
    if (!state.isAuthenticated) {
      window.location.href = '/admin/login';
      return;
    }
  });

  useEffect(() => {
    fetchMovies();
  }, [pageOffset, perPage]);

  // if (movieList.length === 0) {
  //   return (
  //     <div className='alert alert-warning' role='alert'>
  //       No results.
  //     </div>
  //   );
  // }

  return (
    <>
      <div className='page-wrapper w-full py-10 px-5 bg-black '>
        <div className='text-7xl  text-gray-700  container sm:mx-auto'>
          <Header />
          <div className='top_timer'>
            <p className='title'>Today’s leaderboard</p>
            <div className='flex top_timer_inner_container'>
              <p className='date'>30 May 2022</p>
              <span className='flex timer_container'>
                <p className='timer_title '>Submissions OPEN</p>
              </span>
              <p className='time'>11:34</p>
            </div>
          </div>
          <MainDashboard list={movieList} />

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
    </>
  );
};

export default AdminDashboardPage;
