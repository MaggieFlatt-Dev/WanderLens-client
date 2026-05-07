export const getCategories = () => {
    return fetch("http://localhost:8000/api/categories", {
        headers: {
            Authorization: "Token " + JSON.parse(localStorage.getItem("WanderLens_token")).token,
        },
    }).then((res) => res.json())
}