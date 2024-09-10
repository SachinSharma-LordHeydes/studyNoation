import React, { useEffect, useState } from 'react'
import Logo from '../../assets/Logo/Logo-Full-Light.png'
import { NavbarLinks } from '../../data/navbar-links';
import { IoIosArrowDown } from "react-icons/io";
import { Link , matchPath, useLocation, useNavigate } from 'react-router-dom';
import { getCatagoty } from '../../services/operations/getCatagory';
import { apiConnector } from '../../services/apiConnector';
import {categories} from '../../services/api'
import { useDispatch, useSelector } from 'react-redux';
import { IoCart } from "react-icons/io5";
import { FaCaretDown } from "react-icons/fa6";
import { MdDashboard } from "react-icons/md";
import { IoLogOut } from "react-icons/io5";
import { logOut } from '../../services/operations/authOperation';

const {CATEGORIES_API}=categories

function Navbar() {
  const [allCatagory,setAllCaragory]=useState([]);
  const[clickOnPP,setClickOnPP]=useState(false);

  const navigate=useNavigate();
  const dispatch=useDispatch();

  const {userData}=useSelector((state)=>state.auth)

  const fetchCatagory=async()=>{
    try {
      const response=await apiConnector('GET',CATEGORIES_API)
      setAllCaragory(response.data.allCatagories)
    } catch (error) {
      console.log('Error Occures While Fetching Catagory => ', error)
    }
  }

  useEffect(()=>{
    fetchCatagory()
  },[])

  const location=useLocation();

  function clickHandler(){
    console.log('Getcatagory => ',getCatagoty())
  }

  function goToHandler(goto){
    navigate(goto)
  }

  function logOutHandler(){
    dispatch(logOut(navigate))
  }

  const matchRoutes = (route) => {
    return route ? matchPath({ path: route }, location.pathname) : false;
  };

  function handleProfileClicks(e){
    console.log("Clicked ON PP => ",e)
    setClickOnPP(!clickOnPP);
  }
  

  return (
    <div className='text-white bg-richblack-900 py-3 px-2 border-b-[1px] border-richblack-600'>
      <div className='w-11/12 mx-auto flex justify-between items-center'>
        <Link to='/'>
          <div><img className='h-8' src={Logo} alt="" /></div>
        </Link>

        
        <nav >

          <ul>
            {
              <li className='flex gap-x-4 tracking-wider'>
              {
                NavbarLinks.map((link, index) => (

                  link.title==='Catalog'?
                  (
                    <Link key={index} to='/catalog'>
                      <div className='group relative'>
                        <p 
                          onClick={clickHandler}
                            
                          className={` flex gap-x-1 items-center ${link?.path && matchRoutes(link.path) ? "text-yellow-25" : "text-richblack-25"}`}>
                            {link.title} <IoIosArrowDown></IoIosArrowDown>
                        </p>

                          <div className='group-hover:bg-richblack-800 w-20 h-20 hidden absolute group-hover:flex  rotate-45 top-9 left-[41%] rounded-sm'></div>

                          <div className='
                          group-hover:bg-richblack-800 absolute hidden
                            text-richblack-25 group-hover:flex flex-col px-4 py-3 w-52 rounded-lg -left-[70%] top-8 text-lg
                          '>
                              {
                                allCatagory.length > 0 ? (
                                  allCatagory.map((catagory, index) => (
                                    <div key={index}>
                                      <button>
                                        <div className='w-44 my-1 hover:scale-90 duration-200 transition-all text-start px-3 py-1 rounded-md text-richblack-25 hover:bg-richblack-600'>
                                          {catagory.name}
                                        </div>
                                      </button>
                                    </div>
                                  ))
                                ) : (
                                  <div>No categories available</div>
                                )
                              }
                        </div>
                      </div>
                    </Link>
                  )
                  :
                  (
                    <Link key={index}  to={link.path}>
                        <p 
                          className={`${link?.path && matchRoutes(link.path) ? "text-yellow-25" : "text-richblack-25"}`}>
                            {link.title}
                        </p>
                    </Link>
                  )
                ))}
              </li>
            }
          </ul>

        </nav>


        {
          userData && userData.token?(
            <div >
              <div className='flex gap-5'>
                <div onClick={()=>goToHandler('/dashboard/cart')} className='items-center flex justify-center'>
                  {
                    userData.accountType==="Student"?
                    (
                      <div>
                        <IoCart />
                      </div>
                    ):
                    (
                      <div/>
                    )
                  }
                </div>
                <div onClick={handleProfileClicks} className={`flex justify-center items-center gap-x-1 relative`}>
                  <div className=''>
                    <img className='rounded-full size-7' src={userData.imageURL} alt="ImageHere" />
                  </div>
                  <div>
                    <FaCaretDown />
                  </div>

                  <div className={`bg-richblack-900 absolute top-9  -right-3 border border-richblack-50 px-5 py-3  ${clickOnPP?("block"):("hidden")}`}>
                      <div onClick={()=>goToHandler('/dashboard/my-profile')} className='flex gap-3 items-center'>
                        <div className=''><MdDashboard /></div>
                        <div >Dashboard</div>
                      </div>
                      <hr className='my-2' />
                      <div>
                        <div onClick={logOutHandler} className='flex gap-3 items-center'>
                          <div><IoLogOut /></div>
                          <div>Logout</div>
                        </div>
                      </div>
                  </div>
                </div>
              </div>
            </div>
          ):
          (
            <div>
              <div className='flex gap-3'>
                <Link to='/Login'>
                  <button className='border-[1px] border-richblack-500 py-1 px-3 rounded-md'>Log in</button>
                </Link>
                <Link to='/Signup'>
                  <button className='border-[1px] border-richblack-500 py-1 px-3 rounded-md'>Sign up</button>
                </Link>
              </div>
            </div>
          )
        }
      </div>
    </div>
  )
}

export default Navbar





