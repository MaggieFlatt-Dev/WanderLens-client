import { Route, Routes } from "react-router-dom"
import { Authorized } from "./Authorized.jsx"
import { Login } from "./auth/Login.jsx"
import { Register } from './auth/Register.jsx'
import { TripList } from "./trips/TripList.jsx"
import { TripDetails } from "./trips/TripDetails.jsx"


const ApplicationViews = () => {

    return (
        <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route element={<Authorized />}>
                <Route path="/" element={<TripList />} />
                <Route path="/api/trips/:id" element={<TripDetails /> } />
            </Route>
        </Routes>
    )
}

export default ApplicationViews
