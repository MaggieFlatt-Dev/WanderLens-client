export const getTrips = () => {
    return fetch("http://localhost:8000/api/trips", {
          headers: {
            Authorization: "Token " + JSON.parse(localStorage.getItem("WanderLens_token")).token,
        },
    }).then((res) => res.json())
 }

export const createTrip = (newTrip) => {
    return fetch("http://localhost:8000/api/trips", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
             Authorization: "Token " + JSON.parse(localStorage.getItem("WanderLens_token")).token,
        },
        body: JSON.stringify(newTrip)
    }).then(res => res.json())
}