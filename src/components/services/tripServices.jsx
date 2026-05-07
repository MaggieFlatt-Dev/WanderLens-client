export const createTrip = (trip) => {
    return fetch("http://localhost:8000/api/trips", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
             Authorization: "Token " + JSON.parse(localStorage.getItem("WanderLens_token")).token,
        },
        body: JSON.stringify(trip)
    }).then(res => res.json())
}