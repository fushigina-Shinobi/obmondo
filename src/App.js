import './index.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Table from './components/table';
import Logo from './assets/image/logo.png';

export default function App() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [pageNum, setPageNum] = useState(1);

  //fetching data from the backened asynchronously
  async function getData() {
    await axios(
      `https://give-me-users-forever.vercel.app/api/users/${currentPage}/next`
    )
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.error('Error fetching data: ', error);
        setError(error);
      })
      .finally(() => {
        setLoading(false);
      });
  }

  //to refetch the api when the current page changes
  useEffect(() => {
    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage]);

  //function to handle the state for next 10 items
  const handleNext = () => {
    setCurrentPage((prev) => (prev += 10));
    setPageNum((prev) => (prev += 1));
  };

  //function to handle the state for previous 10 items
  const handlePrev = () => {
    if (currentPage > 10) {
      setCurrentPage((prev) => (prev -= 10));
      console.log('prev');
      setPageNum((prev) => (prev -= 1));
    } else {
      setCurrentPage((prev) => (prev = 0));
      setPageNum((prev) => (prev = 1));
    }
  };
  //error returning statement
  if (error) return 'Error!';

  return (
    <div className='parent-container'>
      {loading ? (
        <div className='loader-container'>
          <span className='loader'></span>
        </div>
      ) : (
        <>
          <header>
            <img src={Logo} alt='logo' />
          </header>
          <Table
            data={data?.users}
            currentPage={currentPage}
            loading={loading}
          />
          <div className='pagination-container'>
            <button
              className={`btn-primary ${
                currentPage === 0 || currentPage < 10
                  ? 'cursor-notAllowed'
                  : null
              }`}
              onClick={handlePrev}
              disabled={currentPage === 0 || currentPage < 10 ? true : false}
              title='Previous'
            >
              &#60;
            </button>
            <span>Page {pageNum}</span>
            <button
              className='btn-primary'
              disabled={loading ? true : false}
              onClick={handleNext}
              title='Next'
            >
              &#62;
            </button>
          </div>
        </>
      )}
    </div>
  );
}
