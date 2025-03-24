import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { Provider } from 'react-redux'
import { store } from './redux/store.js'
import { WomenWorkouts } from './pages/womenWorkouts/womenWorkouts.jsx'
import { MenWorkouts } from './pages/menWorkouts/menWorkouts.jsx'
import { Root } from './components/root/root.jsx'
import { TabataTimer } from './pages/tabataTimer/tabataTimer.jsx'
import App from './App.jsx'
import './index.css'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    children: [
      {
        index: true,
        element: <App />
      },
      {
        path: 'tabata-timer',
        element: <TabataTimer />
      },
      {
        path: 'women-workouts',
        element: <WomenWorkouts />
      },
      {
        path: 'men-workouts',
        element: <MenWorkouts />
      },
    ]
  },
])

export default router

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>
)

