export const getTrips = () => {
    return fetch("http://localhost:8000/api/trips", {
          headers: {
            Authorization: "Token " + JSON.parse(localStorage.getItem("WanderLens_token")).token,
        },
    }).then((res) => res.json())
 }

export const createTrip = (tripData) => {
    return fetch("http://localhost:8000/api/trips", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
             Authorization: "Token " + JSON.parse(localStorage.getItem("WanderLens_token")).token,
        },
        body: JSON.stringify(tripData)
    }).then(res => res.json())
}

export const getTripById = (id) => {
    return fetch(`http://localhost:8000/api/trips/${id}`, {
        headers: {
            Authorization: "Token " + JSON.parse(localStorage.getItem("WanderLens_token")).token,
        }, 
    }).then((res => res.json()))
}
 
export const updateTrip = (id, tripData) => {
    return fetch(`http://localhost:8000/api/trips/${id}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
            Authorization: "Token " + JSON.parse(localStorage.getItem("WanderLens_token")).token,
        },
        body: JSON.stringify(tripData)
    })
 }