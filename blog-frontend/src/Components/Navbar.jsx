import React from 'react'
import { useContext } from 'react'

import { Link } from "react-router-dom"
import AuthContext from '../Context/AuthContext'
import ToastContext from '../Context/ToastContext';
import '../index.css';
export default function Navbar() {
    const { toast } = useContext(ToastContext)
    const { setUser } = useContext(AuthContext)
    return (
        <nav style={{ position: "sticky", top: "0", display: "flex", alignItems: "center", justifyContent: "space-between",  backgroundColor: "RGB(193 53 132)", padding: "2vh 2vw" }}>
            <ul>
                <li>
                    <h2 style={{ fontSize: "30px" }}>BlogApp</h2>
                </li>
            </ul>

            <ul style={{ display: "flex", gap: "5vw" }}>
                <li><Link style={{
                    backgroundColor: "white", padding: "10px",
                    color: "black", fontWeight: "bold", borderRadius: "5px"
                }} to="/home">Home</Link></li>
                <li><Link style={{
                    backgroundColor: "white", padding: "10px",
                    color: "black", fontWeight: "bold", borderRadius: "5px"
                }} to="/create">Create</Link></li>
                <li onClick={() => {
                    setUser(null)
                    sessionStorage.clear()
                    toast.success("Logged Out!!!")
                }}><Link style={{
                    backgroundColor: "red", padding: "10px",
                    color: "white", fontWeight: "bold", borderRadius: "5px"
                }} to="/">Logout</Link></li>
            </ul>
        </nav>
    )
}
