export const getCategories = () => {
    return fetch("http://localhost:8000/api/categories").then(res => res.json())
}