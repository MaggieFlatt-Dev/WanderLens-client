import { Route, Routes } from "react-router-dom"
import { Authorized } from "./Authorized.jsx"
import { Login } from "./auth/Login.jsx"
import { Register } from './auth/Register.jsx'
import { TripList } from "./trips/TripList.jsx"
import { TripDetails } from "./trips/TripDetails.jsx"
import { StopDetails } from "./stops/StopDetails.jsx"
import { PhotoTripList } from "./photos/PhotoTripList.jsx"
import { TripPhotos } from "./photos/TripPhotos.jsx"


const ApplicationViews = () => {

    return (
        <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route element={<Authorized />}>
                <Route index element={<TripList />} />
                <Route path="trips/:id" element={<TripDetails />} />
                <Route path="trips/:id/stops/:stopId" element={<StopDetails />} />
                <Route path="photos" element={<PhotoTripList />} />
                <Route path="photos/:tripId" element={<TripPhotos />} />
            </Route>
        </Routes>
    )
}

export default ApplicationViews
