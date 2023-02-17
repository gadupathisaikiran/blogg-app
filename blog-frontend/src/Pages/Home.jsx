import axios from 'axios'
import React from 'react'
import { useContext } from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import "../index.css"
import Navbar from '../Components/Navbar'
import AuthContext from '../Context/AuthContext'
import { toast } from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import Confetti from 'react-confetti'

export default function Home() {


    const navigate = useNavigate()

    useEffect(() => {
        if (!user) {
            navigate("/", { replace: true })
        }
        if(user){
            navigate("/home")
        }
    },[])

    const [loader, setloader] = useState(true)

    const [blog, setBlog] = useState(null)
    const { user } = useContext(AuthContext)

    useEffect(() => {
        getBlogs()
    }, [])

    const getBlogs = async () => {
        try {
            const res = await axios.get("https://ints.onrender.com/blog/getBlogs")
            //console.log(res.data);
            setBlog(res.data)
            setloader(false)
        } catch (error) {
            //console.log(error);
        }
    }

    return (
        <div>
            <Navbar></Navbar>
            <div className='postContainer'>
                {loader && <h2 className='loading'>Loading.....</h2>}
                {blog && blog.map((data) => {
                    return (
                        <div className='blog'>
                            <div className='title'>{data.title}</div>
                            <div className='description'>{data.description}</div>
                            <div className='timeDate'>{data.date_time}</div>
                            <div style={{ width: "300px" }} className='image'>
                                <img style={{ width: "100%" }} src={data.image} alt="" /></div>
                        </div>
                    )
                })}
                
                           {
  blog &&  <Confetti numberOfPieces={1000} height="1000px" recycle={false}/>

                }
            </div>
        </div>
    )
}
