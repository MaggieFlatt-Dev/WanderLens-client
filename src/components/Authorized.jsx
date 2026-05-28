import { Navigate, Outlet } from "react-router-dom"
import { NavBar } from "./nav/Navbar.jsx"

export const Authorized = () => {
  if (localStorage.getItem("WanderLens_token")) {
    return <>
      <NavBar />
      <main className="pt-4 bg-earthGreen min-h-screen w-full">
        <Outlet />
      </main>
    </>
  }
  return <Navigate to="/login" replace />
}
