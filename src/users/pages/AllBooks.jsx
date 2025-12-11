import React, { useEffect, useState } from 'react'
import Header from '../../common/components/Header'
import Footer from '../../common/components/Footer'
import { Link } from 'react-router-dom'
import { getAllBooksAPI } from '../../services/allAPI'

function AllBooks() {
  const [token, setToken] = useState("")
  const [allBooks, setAllBooks] = useState([])
  const [allCategory, setAllCategory] = useState([])
  const [tempBooks, setTempBooks] = useState([])
  const [searchKey, setSearchKey] = useState("")
  console.log(searchKey); // get the search word
  
  const getAllBooks = async (userToken) => {
    const reqHeader = {
      Authorization: `Bearer ${userToken}`
      // Do NOT set 'Content-Type' manually for FormData
    };

    try {
      const result = await getAllBooksAPI(searchKey,reqHeader)
      console.log(result);// book data is displayed here
      setAllBooks(result.data)
      setTempBooks(result.data)
      // setAllCategory(result.data.map(item => item.category))
      const tempCategory = result.data.map(item => item.category).filter(Boolean) //remove undefined
      setAllCategory([...new Set(tempCategory)]) //Set is class which avoids duplicates 
    } catch (error) {
      console.log(error);

    }
  }

  console.log(allBooks);
  console.log(allCategory);

  const categoryFilter = (category) => {
    // console.log(category);
    if (category == "No filter") {
      setAllBooks(tempBooks)
    } else {
      setAllBooks(tempBooks.filter(item => item.category.toLowerCase() == category.toLowerCase()))
    }
  }

  useEffect(() => {
    if (sessionStorage.getItem("token")) {
      const userToken = (sessionStorage.getItem("token"))
      setToken(userToken)
      getAllBooks(userToken)
    }
  }, [searchKey]) //searchKey is given as dependency 

  // call API after token is stored

  return (
    <>
      <Header />

      <div className='flex flex-col justify-center items-center my-5'>
        <h1 className='text-3xl font-bold my-5'>Collections</h1>
        <div className='flex my-5'>
          <input value={searchKey}
            onChange={e => setSearchKey(e.target.value)} type="text" className='p-2 border border-gray-200 text-black w-100 placeholder-gray-500' placeholder='Search by title' />
          <button className='bg-blue-900 text-white p-2 hover:bg-white hover:text-blue-900 hover:border hover:border-blue-800'>Search</button>
        </div>
      </div>

      <div className='md:grid grid-cols-4 md:px-20 p-5 mb-10'>

        {/* filter */}
        <div className='col-span-1 p-4 rounded shadow-sm'>
          <h1 className='font-semibold text-lg'>Filters</h1>

          <div className='mt-5 space-y-4 text-sm sm:text-base'>

            {allCategory.map((item, index) => (
              <div onClick={() => categoryFilter(item)} key={index}>
                <input type="radio" id={item} name="filter" />
                <label className='ms-2' htmlFor={item}>{item}</label>
              </div>
            ))}
            <div onClick={() => categoryFilter("No filter")} className='mt-5'>
              <input type="radio" id='nofilter' name='filter' />
              <label className='ms-2' htmlFor="nofilter">No filter</label>
            </div>
          </div>


        </div>
        <div className='col-span-3'>

          {/* Book Collections  */}
          {allBooks?.length > 0 ? (
            <div className='md:grid grid-cols-4 mt-5 md:mt-0'>
              {allBooks.map((item, index) => (
                <div key={index} className='shadow rounded p-3 mx-4 my-3'>
                  <img src={item?.imageUrl} width="100%" height="300px" alt={item.title} />
                  <div className='flex flex-col justify-center items-center mt-4'>
                    <p>{item?.title}</p>
                    <p>{item?.author}</p>
                    <Link
                      to={`/view-books/${item?._id}`}
                      className='bg-blue-900 text-white p-2 hover:bg-white hover:text-blue-900 hover:border hover:border-blue-800 w-full text-center'
                    >
                      View Book
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className='text-center text-gray-500 mt-4'>No books found</p>
          )}
        </div>

      </div>

       {/* LOGIN REMINDER */}
      {!token && (
        <div className='my-10 flex justify-center items-center flex-col'>
          <img
            src="https://i.pinimg.com/originals/4c/33/ef/4c33ef1f0c28efb56b49fb948d86ec49.gif"
            width="400px"
            alt=""
          />
          <p className='font-semibold text-xl mt-5'>
            Please <Link to={"/login"} className='text-blue-700 font-bold'>Login</Link> to explore more...
          </p>
        </div>
      )}

      <Footer />
    </>
  )
}

export default AllBooks
