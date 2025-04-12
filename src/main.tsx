import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { createBrowserRouter, RouterProvider } from 'react-router'
import Favourites from './components/Favourites/index.tsx'
import RecipeDetails from './components/RecipeDetails/index.tsx'

const router = createBrowserRouter([
  {path: '/', element: <App />},
  {path: '/favourites', element: <Favourites />},
  {path: '/recipe/:id', element: <RecipeDetails />},
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
