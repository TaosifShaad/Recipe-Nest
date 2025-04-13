import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { createBrowserRouter, RouterProvider } from 'react-router'
import Favourites from './components/Favourites/index.tsx'
import RecipeDetails from './components/RecipeDetails/index.tsx'
import { Provider } from 'react-redux'
import { store } from './redux/store'

const router = createBrowserRouter([
  { path: '/', element: <App /> },
  { path: '/favourites', element: <Favourites /> },
  { path: '/recipe/:id', element: <RecipeDetails /> },
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>,
)
