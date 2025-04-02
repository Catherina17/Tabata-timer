import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { WomenWorkouts } from './pages/womenWorkouts/womenWorkouts.jsx'
import { MenWorkouts } from './pages/menWorkouts/menWorkouts.jsx'
import { Root } from './components/root/root.jsx'
import { TabataTimer } from './pages/tabataTimer/tabataTimer.jsx'
import { AboutTabata } from './pages/aboutTabata/aboutTabata.jsx'
import './App.css'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    children: [
      {
        index: true,
        element: <AboutTabata />
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

function App() {
  return <RouterProvider router={router} />
}

export default App
