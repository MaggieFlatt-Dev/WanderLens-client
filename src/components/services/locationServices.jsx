export const getLocations = (search) => {
  return fetch(`https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(search)}&format=json&limit=5&addressdetails=1`, {
    headers: {
      "User-Agent": "Wanderlens",
    },
}).then(res => res.json())
 }