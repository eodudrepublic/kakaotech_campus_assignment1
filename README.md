# Movie Explorer (Vanilla JS)

A simple movie search web application that consumes the **TMDB API**.

## Features
- Search movies in real‑time using the TMDB database
- View popular movies on load
- Click a movie card to see full details in a modal
- Responsive layout (CSS Grid)
- Bookmarks persisted to `localStorage`
- Cleanly separated **API** and **UI** layers

## Getting Started

1. Clone the repository  
   ```bash
   git clone https://github.com/your-id/movie-explorer.git
   cd movie-explorer
   ```
2. Copy the example config and add your TMDB API key  
   ```bash
   cp js/config.example.js js/config.js
   # edit js/config.js and paste your API key
   ```
3. Serve the files (any static server)  
   ```bash
   npx serve .
   ```
   or just open **index.html** directly in the browser.

> **Note**  
> Front‑end only projects cannot fully hide an API key.  
> For production you would place API calls behind a server proxy.

## Scripts
| File | Responsibility |
|------|----------------|
| `js/api.js` | All network requests to TMDB |
| `js/ui.js` | DOM creation / rendering |
| `js/main.js` | App bootstrap & event handling |

---
Built with ✨ by Vanilla JS
