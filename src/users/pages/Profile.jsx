import React, { useContext, useEffect, useState } from 'react'
import Header from '../../common/components/Header'
import Footer from '../../common/components/Footer'
import { MdVerified } from "react-icons/md";
// import { FaRegEdit } from "react-icons/fa";
import { toast } from 'react-toastify';
import { addBookAPI, deleteUserAddedBookAPI, getUserBookAPI, getUserBroughtBookAPI } from '../../services/allAPI';
import EditProfile from '../components/EditProfile';
import { userProfileUpdateContext } from '../../context/ContextShare';

function Profile() {

  const [sellBookStatus, setSellBookStatus] = useState(true)
  const [bookStatus, setBookStatus] = useState(false)
  const [purchaseHistoryStatus, setPurchaseHistoryStatus] = useState(false)
  const [preview, setPreview] = useState("")
  const [allUploadImages, setAllUploadImages] = useState([])
  const [token, setToken] = useState("");
  const [username, setUsername] = useState()
  const [userAddedBooks, setUserAddedBooks] = useState([])
  const [deleteBookStatus, setDeleteBookStatus] = useState(false)
  const [userBroughtBook, setUserBroughtBook] = useState([]);

  const {userProfileUpdateStatus} = useContext(userProfileUpdateContext)

  const [bookDetails, setBookDetails] = useState({
    title: "", author: "", noOfPages: "", imageUrl: "", price: "", dPrice: "", abstract: "", publisher: "", language: "", isbn: "", category: "", uploadImages: []
  })
  console.log(bookDetails);

  const handleFile = (e) => {
    console.log(e.target.files[0]);
    const fileArray = bookDetails.uploadImages
    fileArray.push(e.target.files[0])
    setBookDetails({ ...bookDetails, uploadImages: fileArray })
    // convert files to url
    const url = URL.createObjectURL(e.target.files[0])
    setPreview(url)
    let images = allUploadImages
    images.push(url)
    setAllUploadImages(images)
  }
  console.log(preview);

  //reseting after uploading 3 images
  const reset = () => {
    setBookDetails({
      title: "", author: "", noOfPages: "", imageUrl: "", price: "", dPrice: "", abstract: "", publisher: "", language: "", isbn: "", category: "", uploadImages: []
    })
    setPreview("")
    setAllUploadImages([])
  }

  const handleAddBook = async () => {
    const { title, author, noOfPages, imageUrl, price, dPrice, abstract, publisher, language, isbn, category, uploadImages } = bookDetails
    if (!title || !author || !noOfPages || !imageUrl || !price || !dPrice || !abstract || !publisher || !language || !isbn || !category || uploadImages.length == 0) {
      toast.info("Fill the form completely")
    } else {
      //reqHeader
      const reqHeader = {
        "Authorization": `Bearer ${token}`
      }

      //reqBody - formData() //append - reqBody.append(key,value)
      //reqBody.append("title", title)
      const reqBody = new FormData()

      for (let key in bookDetails) {
        if (key != "uploadImages") {
          reqBody.append(key, bookDetails[key])
        } else {
          bookDetails.uploadImages.forEach(img => {
            reqBody.append("uploadImages", img)
          })
        }
      }
      try {
        const result = await addBookAPI(reqBody, reqHeader)
        console.log(result);
        if (result.status == 200) {
          toast.success("Book Added Successfully")
          reset()
        } else if (result.status == 401) {
          toast.warning(result.response.data)
        } else {
          toast.error("Error in adding Book")
          reset()
        }
      } catch (error) {
        toast.error("Something went wrong")
        console.log(error);

      }
    }
  }

  //get user added book
  const getUserAddedBooks = async () => {
    try {
      //reqHeader
      const reqHeader = {
        "Authorization": `Bearer ${token}`
      }
      const result = await getUserBookAPI(reqHeader)
      console.log(result);
      setUserAddedBooks(result.data)
    } catch (error) {
      console.log(error);

    }
  }
  console.log(userAddedBooks);


  //delete book
  const handleDeleteBook = async (id) => {
    try {
      const result = await deleteUserAddedBookAPI(id)
      console.log(result);
      if (result.status == 200) {
        setDeleteBookStatus(true)
        toast.success(`Book Deleted Successfully`)
      } else {
        toast.error(`Something Went Wrong`)
      }
    } catch (error) {
      console.log(error);

    }
  }


  // get user brought book
  const getUserBroughtBooks = async () => {
    try {
      // reqHeader
      const reqHeader = {
        "Authorization": `Bearer ${token}`
      }
      const result = await getUserBroughtBookAPI(reqHeader)
      console.log(result);
      setUserBroughtBook(result.data)

    } catch (error) {
      console.log(error);

    }
  }
  console.log(userBroughtBook);

 
  useEffect(() => {
    if (sessionStorage.getItem("token")) {
      setToken(sessionStorage.getItem("token"))
    }
    if (sessionStorage.getItem("existingUser")) {
      const name = JSON.parse(sessionStorage.getItem("existingUser"))
      setUsername(name.username)
    }
  }, [userProfileUpdateStatus])

  useEffect(() => { // for useradded books
    if (bookStatus == true) {
      getUserAddedBooks()
    }
    getUserBroughtBooks()
  }, [bookStatus, deleteBookStatus, purchaseHistoryStatus])

  return (
    <>
      <Header />
      {/* Cover image placeholder */}
      <div className='bg-black w-full h-40 sm:h-52'></div>

      {/* profile image */}
      <div className='bg-white p-3' style={{ width: "230px", height: "230px", borderRadius: "50%", marginLeft: "70px", marginTop: "-130px" }}>
        <img style={{ width: "200px", height: "200px", borderRadius: "50%" }} src="https://cdn-icons-png.flaticon.com/512/219/219969.png" alt="" />
      </div>
      <div className='md:flex justify-between px-20 mt-5'>
        <div className='flex items-center'>
          <h1 className='font-bold md:text-3xl text-2xl'>{username}</h1>
          <MdVerified className='text-blue-500 ms-3 text-xl' />
        </div>
        <div>
          <EditProfile/>
           {/* <button className='flex px-4 py-3 font-bold border border-blue-200 text-blue-600'><FaRegEdit className='mt-1 me-2' />Edit</button> */}
        </div>
      </div>
      <p className='md:px-20'>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Recusandae doloremque molestias maxime saepe vitae, distinctio sit ea neque ut error temporibus hic ratione reprehenderit similique, iusto cum. Qui vitae doloribus aperiam repudiandae natus fugit esse porro veritatis eligendi? Omnis, perspiciatis!</p>

      {/* Tabs */}
      <div className='flex justify-center items-center my-8 font-medium text-lg'>
        <p onClick={() => { setSellBookStatus(true), setBookStatus(false), setPurchaseHistoryStatus(false) }} className={sellBookStatus ? "text-blue-500 p-4 border-gray-200 broder-t border-l border-r rounded cursor-pointer" : "p-4 border-b border-gray-200 cursor-pointer"}>Sell Book</p>
        <p onClick={() => { getUserAddedBooks, setBookStatus(true), setSellBookStatus(false), setPurchaseHistoryStatus(false) }} className={bookStatus ? "text-blue-500 p-4 border-gray-200 broder-t border-l border-r rounded cursor-pointer" : "p-4 border-b border-gray-200 cursor-pointer"}>Book Status</p>
        <p onClick={() => { setPurchaseHistoryStatus(true), setSellBookStatus(false), setBookStatus(false) }} className={purchaseHistoryStatus ? "text-blue-500 p-4 border-gray-200 broder-t border-l border-r rounded cursor-pointer" : "p-4 border-b border-gray-200 cursor-pointer"}>Purchase History</p>
      </div>

      {/* sell book */}
      {sellBookStatus &&
        <div className='md:p-20 p-5'>
          <div className='bg-gray-200 md:p-10 p-5 rounded'>
            <h1 className='text-center text-3xl font-medium'>Book Details</h1>
            <div className='md:grid grid-cols-2'>
              <div className='md:my-10 mt-5 px-2'>
                <div className='mb-3'>
                  <input value={bookDetails.title} onChange={(e) => setBookDetails({ ...bookDetails, title: e.target.value })} className='p-2 bg-white rounded w-full ' type="text" placeholder='Title' />
                </div>
                <div className='mb-3'>
                  <input value={bookDetails.author} onChange={(e) => setBookDetails({ ...bookDetails, author: e.target.value })} className='p-2 bg-white rounded w-full ' type="text" placeholder='Author' />
                </div>
                <div className='mb-3'>
                  <input value={bookDetails.noOfPages} onChange={(e) => setBookDetails({ ...bookDetails, noOfPages: e.target.value })} className='p-2 bg-white rounded w-full ' type="text" placeholder='No of Pages' />
                </div>
                <div className='mb-3'>
                  <input value={bookDetails.imageUrl} onChange={(e) => setBookDetails({ ...bookDetails, imageUrl: e.target.value })} className='p-2 bg-white rounded w-full ' type="text" placeholder='Image Url' />
                </div>
                <div className='mb-3'>
                  <input value={bookDetails.price} onChange={(e) => setBookDetails({ ...bookDetails, price: e.target.value })} className='p-2 bg-white rounded w-full ' type="text" placeholder='Price' />
                </div>
                <div className='mb-3'>
                  <input value={bookDetails.dPrice} onChange={(e) => setBookDetails({ ...bookDetails, dPrice: e.target.value })} className='p-2 bg-white rounded w-full ' type="text" placeholder='Discount Price' />
                </div>
                <div className='mb-3'>
                  <textarea value={bookDetails.abstract} onChange={(e) => setBookDetails({ ...bookDetails, abstract: e.target.value })} className='p-2 bg-white rounded w-full ' rows={'8'} type="text" placeholder='abstract' />
                </div>
              </div>
              <div className='md:my-10 px-2'>
                <div className='mb-3'>
                  <input value={bookDetails.publisher} onChange={(e) => setBookDetails({ ...bookDetails, publisher: e.target.value })} className='p-2 bg-white rounded w-full ' type="text" placeholder='Publisher' />
                </div>
                <div className='mb-3'>
                  <input value={bookDetails.language} onChange={(e) => setBookDetails({ ...bookDetails, language: e.target.value })} className='p-2 bg-white rounded w-full ' type="text" placeholder='Language' />
                </div>
                <div className='mb-3'>
                  <input value={bookDetails.isbn} onChange={(e) => setBookDetails({ ...bookDetails, isbn: e.target.value })} className='p-2 bg-white rounded w-full ' type="text" placeholder='ISBN' />
                </div>
                <div className='mb-3'>
                  <input value={bookDetails.category} onChange={(e) => setBookDetails({ ...bookDetails, category: e.target.value })} className='p-2 bg-white rounded w-full ' type="text" placeholder='Category' />
                </div>
                <div className='flex justify-center items-center mt-10 flex-col'>
                  {preview ? <img src={preview} alt="" style={{ width: "200px", height: "200px" }} />
                    :
                    <label htmlFor="uploadBookImg">
                      <input onChange={(e) => handleFile(e)} id='uploadBookImg' type="file" style={{ display: "none" }} alt='noimg' />
                      <img style={{ width: "200px", height: "200px" }} src="https://png.pngtree.com/png-vector/20221016/ourmid/pngtree-upload-file-vector-single-icon-clipart-transparent-background-png-image_6318311.png" alt="" />
                    </label>
                  }
                  {preview &&
                    <div className='mt-10 flex items-center gap-5'>
                      {
                        allUploadImages.map((item) => (
                          <img src={item} alt="" style={{ width: "50px", height: "50px" }} />
                        ))
                      }
                      {allUploadImages.length < 3 &&
                        <label htmlFor="uploadBookImg" className='ms-4'>
                          <input onChange={(e) => handleFile(e)} id='uploadBookImg' type="file" style={{ display: "none" }} alt='noimg' />
                          <img style={{ width: "50px", height: "50px" }} src="https://png.pngtree.com/png-vector/20221016/ourmid/pngtree-upload-file-vector-single-icon-clipart-transparent-background-png-image_6318311.png" alt="" />
                        </label>
                      }
                    </div>
                  }
                </div>
                <div className='flex md:justify-end justify-center mt-5'>
                  <button onClick={reset} className='bg-amber-700 text-white rounded px-5 py-3 hover:border hover:border-amber-700 hover:text-amber-700 hover:bg-white'>Reset</button>
                  <button onClick={handleAddBook} className='bg-green-700 text-white rounded px-5 py-3 hover:border hover:border-green-700 hover:text-green-700 hover:bg-white ms-4'>Submit</button>
                </div>
              </div>
            </div>
          </div>
        </div>}

      {/* Book Status */}
      {bookStatus && (
        <div className="p-4 sm:p-10 my-20 shadow rounded">

          {userAddedBooks?.length > 0 ? (
            userAddedBooks?.map((book) => (
              <div key={book?._id} className="bg-gray-200 p-5 rounded mt-4">
                <div className="md:grid grid-cols-[3fr_1fr]">
                  <div className="px-4">
                    <h1 className="text-2xl">{book?.title}</h1>
                    <h2>{book?.author}</h2>
                    <h3 className="text-blue-600">₹{book?.price}</h3>

                    <p>{book?.abstract}</p>

                    <div className="flex gap-4 flex-wrap mt-5">
                      {book?.status === "pending" ? (
                        <img src="https://media.istockphoto.com/id/848599738/vector/grunge-red-pending-with-star-icon-round-rubber-seal-stamp-on-white-background.jpg?s=612x612&w=0&k=20&c=UxgKrcKD6voYYkRH-frZcRqcHb7U_gF7GX31n4T48Wc=" alt="" style={{ width: "70px", height: "70px" }} />
                      ) : book?.status === "approved" ? (
                        <img src="https://thumbs.dreamstime.com/b/vector-approved-stamp-isolated-white-29840749.jpg" alt="" style={{ width: "70px", height: "70px" }} />
                      ) : (
                        <img src="https://d1csarkz8obe9u.cloudfront.net/posterpreviews/sold-out-stamp-design-template-89756519e732cfb0be2a52799ef0d5d4_screen.jpg?ts=1737111674" alt="" style={{ width: "70px", height: "70px" }} />
                      )}
                    </div>
                  </div>

                  <div className="px-2 flex flex-col justify-center items-center">
                    <img src={book?.imageUrl} alt="book" className="w-full" style={{ height: "250px" }} />

                    <div className="flex justify-end mt-4">
                      <button onClick={() => handleDeleteBook(book?._id)} type="button" className="p-2 rounded bg-red-600 text-white hover:bg-gray-200 hover:text-red-600 hover:border hover:border-red-600">
                        Delete
                      </button>
                    </div>
                  </div>

                </div>
              </div>
            ))
          ) : (
            <div className="flex justify-center items-center flex-col">
              <img src="https://cdn.pixabay.com/animation/2022/07/31/20/41/20-41-56-968_512.gif" alt="no books" style={{ width: "200px", height: "200px" }} />
              <p className="text-red-600 text-2xl">No Book Added Yet</p>
            </div>
          )}

        </div>
      )}


      {/*purchase history  */}
      {
        purchaseHistoryStatus &&
        <div className='p-10 my-20 shadow rounded'>

          {userBroughtBook?.length > 0 ?
            userBroughtBook?.map((item) => (
              <div className='bg-gray-200 rounded mt-4 p-5'>
                <div className='md:grid grid-cols-[3fr_1fr]'>
                  <div className='px-4'>
                    <h1 className='text-2xl'>{item?.title}</h1>
                    <h2>{item?.author}</h2>
                    <h3 className='text-blue-500'>₹ {item?.price}</h3>
                    <p>{item?.abstract}</p>

                  </div>
                  <div className='px-2 '>
                    <img src={item?.imageUrl}
                      className='w-60 h-74 object-cover rounded' />                  
                  </div>
                </div>
              </div>
            ))

            :
            <div className='flex justify-center items-center flex-col'>
              <img src='https://i.pinimg.com/originals/ee/7c/43/ee7c4374f599e383ff0d92d5de2f8d60.gif' style={{ width: "200px", height: "200px" }} />
              <p className='text-2xl text-red-700'>No Book Added Yet</p>
            </div>}
        </div>

      }

      <Footer />
    </>
  )
}

export default Profile
