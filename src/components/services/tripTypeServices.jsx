export const getTripTypes = () => {
  return fetch("http://localhost:8000/api/triptypes").then(res => res.json())
}