import React from 'react'
import { useContext } from 'react'
import AuthContext from '../Context/AuthContext'
import Navbar from './Navbar'

export default function Layout({ children }) {
    const { user, setUser } = useContext(AuthContext)
    return (
        <div>
            <div>
                {children}
            </div>
        </div>
    )
}
