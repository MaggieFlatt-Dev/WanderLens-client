# WanderLens — Client

> A travel companion app that lets users organize their trips and pinned stops in one place. Friends and family can follow along with a user's travels through an interactive map.

This is the **frontend** repo. The backend lives in [https://github.com/MaggieFlatt-Dev/WanderLens-api].

---

## Tech Stack

- **React** with **Tailwind CSS**
- **Leaflet** for the map view (stretch goal)
- **Nominatim** (OpenStreetMap) for geocoding
- Talks to a **Django REST Framework** API (see backend repo)

---

## Getting Started

### Prerequisites
- Node.js (v18+)
- The backend API running locally — see backend repo for setup

### Installation

```bash
# Clone the repo
git clone <repo-url>
cd <repo-folder>

# Install dependencies
npm install

# Start the dev server
npm run dev
```

The app should be running at `http://localhost:5173` (Vite).

---

## Project Status

🚧 **In active development** — currently building MVP.

See GitHub issues or GitHub project board for the full task list.

---

## Features

### MVP
- [x] User registration & login
- [ ] Create, view, edit, delete trips
- [ ] Add stops to a trip with location search (geocoding)
- [ ] Tag stops with predefined categories

### Stretch
- [ ] Interactive map view with color-coded pins
- [ ] User-created custom categories
- [ ] Photo uploads (Cloudinary)
- [ ] Public trip sharing via URL

---

## Related

- **Backend repo:** [https://github.com/MaggieFlatt-Dev/WanderLens-api]
- **Wireframes (Miro):** [https://miro.com/app/board/uXjVHcJSEE0=/]
- **ERD (dbdiagram.io):** [https://dbdiagram.io/d/WanderLens-69ee545ac6a36f9c1b86527d]

---

*Capstone project — full README and documentation coming once the project is complete.*
