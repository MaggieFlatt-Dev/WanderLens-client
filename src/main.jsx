import ReactDOM from 'react-dom/client'
import ApplicationViews from './components/ApplicationViews.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <ApplicationViews />
  </BrowserRouter>
)
