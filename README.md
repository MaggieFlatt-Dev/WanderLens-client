# WanderLens — Client

> A travel companion app for organizing trips, logging stops, and visualizing your travels on an interactive map.

This is the **frontend** repo. The backend lives at [https://github.com/MaggieFlatt-Dev/WanderLens-api].

---

## Tech Stack

- **React** + **Vite**
- **Tailwind CSS**
- **React Leaflet** + **Leaflet.js** for the interactive map
- **Nominatim** (OpenStreetMap) for geocoding stop locations
- Talks to a **Django REST Framework** backend

---

## Features

- User registration and login
- Create, edit, and delete trips — each with a name, type, start date, color, and privacy setting
- Add stops to trips with location search powered by Nominatim geocoding
- Tag stops with categories and track visited dates
- Interactive map on the trip list that shows all of your stops as color-coded pins, grouped by trip color
- Popups on each map pin showing the stop name and which trip it belongs to

---

## Getting Started

### Prerequisites
- Node.js (v18+)
- The backend API running locally — see the backend repo for setup

### Installation

```bash
git clone <repo-url>
cd WanderLensclient
npm install
npm run dev
```

The app runs at `http://localhost:5173`.

---

## Related

- **Backend repo:** [https://github.com/MaggieFlatt-Dev/WanderLens-api]
- **Wireframes (Miro):** [https://miro.com/app/board/uXjVHcJSEE0=/]
- **ERD (dbdiagram.io):** [https://dbdiagram.io/d/WanderLens-69ee545ac6a36f9c1b86527d]

---

## What's Next

- Photo uploads per stop (Cloudinary)
- Public trip sharing via URL
- User-created custom categories
- Individual stop map view on the stop detail page
