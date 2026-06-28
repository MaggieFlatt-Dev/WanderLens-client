import { NavLink, useNavigate } from "react-router-dom"
import WanderLensLogo from "../../assets/WanderLensLogo.png";
import { useEffect, useState } from "react";
import { getCurrentUser } from "../services/userServices";

export const NavBar = () => {

    const [user, setUser] = useState({})
    const navigate = useNavigate()


    useEffect(() => {
        getCurrentUser().then(setUser)
    }, [])
    
    return (
        <ul className="relative flex items-center gap-4 px-6 py-4 bg-earthGreen font-medium list-none">
            {
                (localStorage.getItem("WanderLens_token") !== null) ?
                    <>
                        <li>
                            <button
                                className="text-offWhite hover:text-lunarGold antialiased"
                                onClick={() => {
                                    navigate('/')
                                 } } 
                            >Home
                            </button>
                        </li>
                    <div className="absolute left-1/2 -translate-x-1/2">
                    <img src={WanderLensLogo} alt="WanderLens Logo" className=" pt-1 h-20" />
                        </div>
                    <li className="ml-auto">
                        <a className="flex text-offWhite antialiased">Welcome, {user.firstName}</a>
                        <button
                            className="text-offWhite hover:text-lunarGold antialiased"
                            onClick={() => {
                                localStorage.removeItem("WanderLens_token")
                                navigate('/login')
                            }}
                            >Logout</button>
                    </li>
                </> :
                <>
                    <li>
                        <NavLink className="text-gray-700 hover:text-blue-600" to={"/login"}>Login</NavLink>
                    </li>
                    <li>
                        <NavLink className="text-gray-700 hover:text-blue-600" to={"/register"}>Register</NavLink>
                    </li>
                </>
            }
        </ul>
    )
}
