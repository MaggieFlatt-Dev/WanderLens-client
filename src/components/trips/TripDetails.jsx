import { useEffect, useState } from "react"
import { useParams } from "react-router-dom";
import { getTripById } from "../services/tripServices";

export const TripDetails = () => {
  //set state for trip, useParams for tripId
  const [trip, setTrip] = useState({});
  const { id } = useParams();

  useEffect(() => {
    getTripById(id).then(setTrip)
  }, [id])
  

  return (
    <div> { trip.name } </div>
  )


}