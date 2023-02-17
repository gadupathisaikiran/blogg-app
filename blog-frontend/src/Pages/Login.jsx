import React from 'react'
import { useContext } from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { toast } from 'react-hot-toast'
import ToastContext from '../Context/ToastContext'
import { useNavigate } from 'react-router-dom'
import AuthContext from '../Context/AuthContext'
import { Link } from "react-router-dom"
import "../index.css"

export default function Login() {

  const navigate = useNavigate()
  const { toast } = useContext(ToastContext)

  useEffect(() => {
    if (!user) {
      navigate("/")
    }
    else {
      navigate("/home", { replace: true })
    }
  }, [])

  const { user, login } = useContext(AuthContext)

  const [userData, setUserData] = useState({
    email: "",
    password: ""
  })

  const handleInput = (e) => {
    const { name, value } = e.target
    setUserData({ ...userData, [name]: value })
    //console.log(userData);
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const emailReg = new RegExp(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/)

    if (!userData.email.match(emailReg)) {
      return toast.error("Enter a valid email")
    }
    const passwordReg = new RegExp(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/)
    if (!userData.password.match(passwordReg)) {
      return toast.error("Password must be 8 or more characters, atleast one number, one special character and one letter ")
    }

    login(userData)
  }
  return (
    <div className='login'>
      <h1>LOGIN</h1>
      <form>

        <div>
          <label htmlFor="email">Email</label>
          <input type="email" required value={userData.email} name="email"
            onChange={(e) => { handleInput(e) }} />
        </div>

        <div>
          <label htmlFor="email">Password</label>
          <input type="password" required value={userData.password} name="password"
            onChange={(e) => { handleInput(e) }} />
        </div>

        <div>
          <button type='submit' onClick={(e) => { handleSubmit(e) }}>Login</button>
        </div>

        <div style={{ fontSize: "16px", fontWeight: "bold" }}>Don't have a account? <Link to={"/signup"}>SignUp</Link></div>
      </form>
    </div>
  )
}
