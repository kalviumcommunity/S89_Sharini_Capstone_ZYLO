import { BrowserRouter } from 'react-router-dom'
import AllRoutes from './AllRoutes'
import "./Styles/global.css"


function App() {

  return (
   <BrowserRouter>
   <AllRoutes/>
   </BrowserRouter>
  )
}

export default App
