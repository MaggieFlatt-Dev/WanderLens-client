export const createStop = (stopData) => {
    return fetch("http://localhost:8000/api/stops", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
             Authorization: "Token " + JSON.parse(localStorage.getItem("WanderLens_token")).token,
        },
        body: JSON.stringify(stopData)
    }).then(res => res.json())
}

export const getStopById = (id) => {
    return fetch(`http://localhost:8000/api/stops/${id}`, {
        headers: {
            Authorization: "Token " + JSON.parse(localStorage.getItem("WanderLens_token")).token,
        }, 
    }).then((res => res.json()))
}

export const deleteStop = (id) => {
    return fetch(`http://localhost:8000/api/stops/${id}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            Authorization: "Token " + JSON.parse(localStorage.getItem("WanderLens_token")).token,
        },
        body: JSON.stringify(id)
    })
 }