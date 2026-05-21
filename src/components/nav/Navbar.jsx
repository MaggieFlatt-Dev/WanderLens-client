import { NavLink, useNavigate } from "react-router-dom"

export const NavBar = () => {
    const navigate = useNavigate()
    return (
        <ul className="flex items-center gap-4 px-6 py-4 bg-white shadow list-none">
            {
                (localStorage.getItem("WanderLens_token") !== null) ?
                    <>
                        <li>
                            <button
                                className="text-gray-700 hover:text-blue-600"
                                onClick={() => {
                                    navigate('/')
                                 } } 
                            >Home
                            </button>
                        </li>
                    <li className="ml-auto">
                        <button
                            className="text-gray-700 hover:text-blue-600"
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
