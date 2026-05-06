export const createTrip = (trip) => {
    return fetch("http://localhost:8000/api/trips", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(trip)
    }).then(res => res.json())
}