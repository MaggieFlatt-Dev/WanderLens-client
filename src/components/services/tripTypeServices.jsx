export const getTripTypes = () => {
  return fetch("http://localhost:8000/api/triptypes", {
    headers: {
      Authorization: "Token " + JSON.parse(localStorage.getItem("WanderLens_token")).token,
    },
  }).then((res) => res.json())
}