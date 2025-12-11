import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { FaMagnifyingGlass } from "react-icons/fa6";
import { Link } from 'react-router-dom';
import { getHomeBookAPI } from '../../services/allAPI';

function LandingPage() {
  const [homeBook, setHomeBook] = useState([])

  const getHomeBooks = async () => {
    const result = await getHomeBookAPI()
    console.log(result);
    setHomeBook(result.data)
  }

  useEffect(()=>{
    getHomeBooks()
  },[])
  return (
    <>
      <Header />
      {/* landing */}
      <div style={{ height: "500px" }} className='flex flex-col justify-center items-center bg-[url(https://i.pinimg.com/736x/67/18/22/671822c2f63dd5f65d8fd15c9710420b.jpg)] bg-no-repeat bg-cover bg-center text-white'>
        <div className='w-full flex flex-col justify-center items-center' style={{ height: "500px", backgroundColor: "rgba(0,0,0,0.5)" }}>
          <h1 className='text-5xl font-bold'>Wonderful Gifts</h1>
          <p>Give your family and friends a book</p>
          <div className='mt-9 flex'>
            <input className='bg-white p-3 rounded-3xl placeholder-gray-500 w-100' type="text" placeholder='Search Books' />
            <FaMagnifyingGlass className='text-gray-500 text-2xl mt-3' style={{ marginLeft: "-40px" }} />
          </div>
        </div>
      </div>

      {/* new arrivals */}
      <section className='md:px-40 p-5 flex flex-col justify-center items-center'>
        <h1>NEW ARRIVALS</h1>
        <h1>Explore Our Latest Collection</h1>

        {homeBook.length > 0 ?
          <div className='md:grid grid-cols-4 w-full mt-5'>

            {homeBook.map((item) => (
              <div className='p-3'>
                <div className='shadow p-3 rounded'>
                  <img height={"300px"} width={"100%"} src={item.imageUrl} alt="" />
                  <div className='text-center mt-3'>
                    <p className='font-bold text-2xl'>{item.title}</p>
                    <p className='font-bold text-xl'>{item.author}</p>
                    <p className='font-bold'>{item.price}</p>
                  </div>
                </div>
              </div>
            ))}

          </div>
          :
          <p>Loading.....</p>
      }

        <div className='text-center my-5'>
          <Link to={"/all-books"}><button className='px-3 py-2 bg-blue-900 text-white hover:border hover:border-blue-900 hover:text-blue-900 hover:bg-white'>Explore More</button></Link>
        </div>
      </section>

      {/* featured authors */}
      <section className='md:grid grid-cols-2 w-full py-10 items-center gap-10 px-8 md:px-20'>
        <div>
          <h1 className='mb-2 text-center text-2xl'>FEATURED AUTHORS</h1>
          <h1 className='mb-4 text-center text-xl'>Captivates with every word</h1>
          <p className='mb-4 text-justify'>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Labore, ea, reprehenderit ipsa reiciendis veniam error omnis numquam ipsam a est eius suscipit quod similique eaque molestiae hic unde exercitationem velit culpa voluptatem sed fugit adipisci, assumenda aperiam? Porro, facere nisi Lorem ipsum dolor sit amet consectetur, adipisicing elit. Aspernatur quam provident, facere porro sapiente placeat! Placeat a nemo debitis rerum? Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ipsa delectus possimus assumenda dolorem iure perspiciatis ipsum corporis incidunt. Assumenda, quia. Lorem ipsum dolor sit amet consectetur adipisicing elit. Explicabo fuga magnam ut optio aut, ab sit dicta fugiat iusto ullam.</p>
          <p className='text-justify'>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquid iure quod tempore recusandae. Tempora dolor doloribus porro rerum atque quas eum sequi ratione, labore similique repellendus voluptatum itaque, beatae voluptate sint consectetur ea voluptatem ut! Lorem ipsum dolor sit amet consectetur adipisicing elit. Omnis, maxime quis illo tempore corporis ipsa laborum aperiam rerum animi vel.</p>
        </div>
        <div className="flex justify-center">
          <img height={"20px"} width={"100%"} src="https://static.vecteezy.com/system/resources/thumbnails/013/572/463/small/confident-mature-man-in-full-suit-standing-near-office-building-and-keeping-hands-in-pockets-photo.jpg" alt="" />
        </div>
      </section>

      {/* testimonials */}
      <section className='w-full py-16 px-6 md:px-20 text-center'>
        <div className='mb-10'>
          <h1 className='text-xl'>TESTIMONIALS</h1>
          <h3 className='text-2xl'>See What Others Are Saying</h3>
        </div>
        <div className='flex flex-col items-center'>
          <img className='w-50 h-50 rounded-full object-cover shadow-md mb-4' src="https://img.freepik.com/premium-photo/young-man-isolated-blue_1368-124991.jpg?semt=ais_hybrid&w=740&q=80" alt="" />
          <p className='text-justify'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos libero illum enim, error magni quia at placeat in voluptas optio blanditiis, aliquid, corporis tenetur natus earum reiciendis recusandae? Deleniti, iure. Lorem ipsum dolor sit amet consectetur adipisicing elit. Maiores placeat, deserunt repellat voluptatem adipisci quis voluptas consequuntur aliquid ducimus quibusdam? Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia asperiores, voluptatem eos iure reiciendis accusantium perspiciatis. Consequuntur dolor et autem!</p>
        </div>
      </section>

      <Footer />
    </>
  )
}

export default LandingPage
