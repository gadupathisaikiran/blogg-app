import { useState } from "react";
import { useEffect } from "react";
import { createContext } from "react";
import { useLocation, useNavigate } from "react-router-dom"
import axios from "axios"
import { useContext } from "react";
import ToastContext from "./ToastContext";

const AuthContext = createContext();


export const AuthContextProvider = ({ children }) => {


    const { toast } = useContext(ToastContext)

    useEffect(() => {
        isLoggedIn()
    }, [])


    const isLoggedIn = async () => {

        try {
            const headers = { "Authorization": `Bearer ${sessionStorage.getItem("token")}` }
            const res = await axios.post("http://localhost:5000/user/isLoggedIn", null, { headers })
            setUser("user")
            // console.log(res);
            if (location.pathname === "/" || location.pathname === "/signup") {
                navigate("/home", { replace: true });
            } else {
                navigate(location.pathname)
            }


        } catch (error) {
            navigate("/")
            toast.error("Please Login First")
            // alert("Please Login First")
        }
    }


    const navigate = useNavigate()
    const location = useLocation()

    const [user, setUser] = useState(null)




    const login = async (userData) => {
        try {

            //console.log(userData);
            const res = await axios.post("http://localhost:5000/user/login", userData)
            //console.log(res.data);
            setUser(res.data.user)
            sessionStorage.setItem("token", res.data.token)
            navigate("/home", { replace: true })
        } catch (error) {
            toast.error(error.response.data)
        }
    }

    const signup = async (userData) => {
        //console.log(userData);
        try {
            const res = await axios.post("http://localhost:5000/user/signup", userData)
            // toast.success(res.data)
            //console.log(res.data);
            navigate("/")
            toast.success("User Registered Successfully")
        } catch (error) {
            toast.error(error.response.data)
            // //console.log(error.message);
        }
    }

    return (
        <AuthContext.Provider value={{ user, setUser, login, signup }}>
            {children}
        </AuthContext.Provider>
    )
}


export default AuthContext;
