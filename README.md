## My Movie Explorer

A React + TypeScript application to explore movies using the TMDb API. Built as part of the Lublabs React Frontend Intern Exam.

## Features

- Search movies by title
- View movie details (poster, title, year, rating)
- Add/remove movies from favorites (stored in localStorage)
- Infinite scroll for loading popular movies
- Zustand for state management
- Routing with `react-router-dom`
- Responsive Bootstrap UI
- Error and loading state handling

## Technologies

- React v19
- TypeScript
- Zustand
- React Router v7
- Bootstrap 5
- Axios
- Git & GitHub
- GitHub Pages for deployment


##  Project Structure

```
src/
  components/     // Reusable components like Navbar, Footer.
  pages/          // Route-level pages (Welcome, Movies, Favorites).
  store/          // Zustand store.
  App.tsx         // Router setup.
  index.tsx       // App entry.
```

##  Setup Instructions

Run the app
### `npm start`

## 🌐 Live Demo

(https://itskhashman.github.io/Movie-Explorer/)

## 🚧 Improvements (If I Had More Time)

- Better mobile responsiveness
- Add a loader while fetching data
- Add unit tests for my project.